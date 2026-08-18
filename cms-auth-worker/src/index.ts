// Cloudflare Worker implementing the GitHub OAuth handshake Decap CMS's
// "github" backend expects: GET /auth kicks off the flow, GET /callback
// completes it and hands the token back to the opener window.
//
// Security notes (this is the part CTS's equivalent implementation got
// wrong — see the audit referenced in CMS-IMPLEMENTATION-PLAN.md section 10
// and cms-auth-worker/README.md):
//   1. The postMessage target origin is always a value from ALLOWED_DOMAINS,
//      pinned server-side — never "*" and never the raw `e.origin` of an
//      inbound message.
//   2. Inbound messages are only trusted if their `e.origin` matches that
//      same pinned allowlisted origin.
//   3. State (CSRF token) is compared in constant time.

export interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  // Comma-separated list of origins allowed to complete the OAuth handshake,
  // e.g. "https://hostmatecostarica.com,http://localhost:3000". No trailing
  // slashes, scheme required.
  ALLOWED_DOMAINS: string;
}

const STATE_COOKIE = 'decap_oauth_state';
const ORIGIN_COOKIE = 'decap_oauth_origin';
const COOKIE_MAX_AGE_SECONDS = 600; // 10 minutes — the OAuth round trip is seconds, not minutes

function randomState(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

// Constant-time comparison so a timing side-channel can't leak how much of
// the state token an attacker has guessed correctly.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  }
  return out;
}

function allowedOrigins(env: Env): string[] {
  return (env.ALLOWED_DOMAINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

// Figures out which allowlisted origin this request is coming from, so the
// callback later knows which single origin to trust for postMessage — never
// falling back to a wildcard or to whatever origin happens to show up.
function resolveRequestOrigin(request: Request, env: Env): string | null {
  const originHeader = request.headers.get('Origin');
  const referer = request.headers.get('Referer');
  let candidate: string | null = originHeader;
  if (!candidate && referer) {
    try {
      candidate = new URL(referer).origin;
    } catch {
      candidate = null;
    }
  }
  const allowed = allowedOrigins(env);
  if (candidate && allowed.includes(candidate)) return candidate;
  // /auth is typically opened as a top-level popup navigation from a click
  // handler, so Origin/Referer can legitimately be absent. Fall back to the
  // single configured origin when there's exactly one — an ambiguous
  // multi-origin setup with no Origin/Referer is refused instead of guessed.
  return allowed.length === 1 ? allowed[0] : null;
}

function cookieHeader(name: string, value: string, maxAge: number): string {
  return `${name}=${encodeURIComponent(value)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}

async function handleAuth(request: Request, env: Env): Promise<Response> {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('Missing GITHUB_CLIENT_ID', { status: 500 });
  }

  const origin = resolveRequestOrigin(request, env);
  if (!origin) {
    return new Response(
      'Request origin is not in ALLOWED_DOMAINS (or ALLOWED_DOMAINS has multiple origins and none could be determined).',
      { status: 403 },
    );
  }

  const url = new URL(request.url);
  const state = randomState();

  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
  authUrl.searchParams.set('scope', 'public_repo'); // write access to public repos only
  authUrl.searchParams.set('state', state);

  const headers = new Headers({ Location: authUrl.toString() });
  headers.append('Set-Cookie', cookieHeader(STATE_COOKIE, state, COOKIE_MAX_AGE_SECONDS));
  headers.append('Set-Cookie', cookieHeader(ORIGIN_COOKIE, origin, COOKIE_MAX_AGE_SECONDS));

  return new Response(null, { status: 302, headers });
}

// Renders the popup's response page. Both the postMessage target and the
// check on inbound messages are pinned to `allowedOrigin` — never "*" and
// never the `e.origin` of whatever message shows up. This is the fix for
// the vulnerability in the CTS reference implementation, which did
// `postMessage(msg, e.origin)` (echoes the token to whoever's origin sent
// the triggering message, unchecked) plus a wildcard
// `postMessage("authorizing:github", "*")` broadcast.
function renderPostMessageHtml(allowedOrigin: string, message: string): string {
  return `<!doctype html>
<html><body><script>
(function () {
  var ALLOWED_ORIGIN = ${JSON.stringify(allowedOrigin)};
  var MESSAGE = ${JSON.stringify(message)};
  function receive(e) {
    if (e.origin !== ALLOWED_ORIGIN) return;
    window.opener.postMessage(MESSAGE, ALLOWED_ORIGIN);
    window.removeEventListener("message", receive, false);
  }
  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:github", ALLOWED_ORIGIN);
})();
</script></body></html>`;
}

function postMessageResponse(allowedOrigin: string, message: string, status = 200): Response {
  return new Response(renderPostMessageHtml(allowedOrigin, message), {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

// Appends both auth cookies to a response's headers with Max-Age=0, clearing
// them client-side. Done via direct append (rather than copying from another
// Headers instance) so the two distinct Set-Cookie entries are unambiguous.
function clearAuthCookies(headers: Headers): void {
  headers.append('Set-Cookie', cookieHeader(STATE_COOKIE, '', 0));
  headers.append('Set-Cookie', cookieHeader(ORIGIN_COOKIE, '', 0));
}

async function handleCallback(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const cookies = parseCookies(request.headers.get('Cookie'));
  const savedState = cookies[STATE_COOKIE];
  const savedOrigin = cookies[ORIGIN_COOKIE];

  const allowed = allowedOrigins(env);
  // Re-validate the cookie-carried origin against the allowlist at callback
  // time too, in case ALLOWED_DOMAINS was tightened between /auth and /callback.
  const safeOrigin = savedOrigin && allowed.includes(savedOrigin) ? savedOrigin : null;

  if (!safeOrigin) {
    // No trusted origin to postMessage to at all — fail plainly instead of
    // guessing. This can only happen if cookies were dropped/tampered with.
    const res = new Response(
      'Could not determine a trusted origin for this OAuth session. Please try logging in again.',
      { status: 400 },
    );
    clearAuthCookies(res.headers);
    return res;
  }

  if (!code) {
    const res = postMessageResponse(
      safeOrigin,
      `authorization:github:error:${JSON.stringify({ message: "Falta el parámetro 'code'" })}`,
      400,
    );
    clearAuthCookies(res.headers);
    return res;
  }

  if (!state || !savedState || !safeEqual(state, savedState)) {
    const res = postMessageResponse(
      safeOrigin,
      `authorization:github:error:${JSON.stringify({ message: 'Estado inválido (posible CSRF)' })}`,
      400,
    );
    clearAuthCookies(res.headers);
    return res;
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    const res = postMessageResponse(
      safeOrigin,
      `authorization:github:error:${JSON.stringify({ message: 'Faltan variables de entorno de GitHub OAuth' })}`,
      500,
    );
    clearAuthCookies(res.headers);
    return res;
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = (await tokenRes.json()) as { access_token?: string; error_description?: string };
  const token = data.access_token;

  const message = token
    ? `authorization:github:success:${JSON.stringify({ token, provider: 'github' })}`
    : `authorization:github:error:${JSON.stringify({ message: data.error_description ?? 'No se pudo obtener el token' })}`;

  const res = postMessageResponse(safeOrigin, message);
  clearAuthCookies(res.headers);
  return res;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    if (url.pathname === '/auth') return handleAuth(request, env);
    if (url.pathname === '/callback') return handleCallback(request, env);

    return new Response('Not found', { status: 404 });
  },
};

export default worker;
