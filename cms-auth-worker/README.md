# hostmate-cms-auth-worker

A small Cloudflare Worker implementing the GitHub OAuth handshake that
[Decap CMS](https://decapcms.org/)'s `github` backend expects, so the client
can log into the admin panel at `/admin/` with their GitHub account.

This is a **separate deployable** from the Next.js site. It has its own
`package.json` and is deployed independently with
[Wrangler](https://developers.cloudflare.com/workers/wrangler/) — it is not
part of `pnpm build` at the repo root, and is explicitly excluded from that
build's TypeScript and ESLint checks (see the root `tsconfig.json` and
`eslint.config.mjs`).

For the full one-time setup walkthrough (OAuth App, secrets, wiring the
deployed URL into `public/admin/config.yml`), see
[`../docs/CMS-SETUP.md`](../docs/CMS-SETUP.md). This README covers just the
worker itself.

## Endpoints

- `GET /auth` — Decap opens this in a popup. Generates a random CSRF `state`
  token, stores it (and the resolved request origin) in httpOnly cookies,
  and redirects to GitHub's OAuth authorize screen with
  `scope=public_repo`.
- `GET /callback` — GitHub redirects here after the user approves. Validates
  `state` in constant time, exchanges the `code` for an access token, and
  returns an HTML page that hands the token back to the admin panel via
  `postMessage`, following the handshake Decap's `github` backend expects
  (`authorizing:github` then `authorization:github:success:{...}`).

## Security model

GitHub repo collaborator access is the real authorization boundary — anyone
who can push to the repo can save through the CMS. This worker's job is
narrower: prove the OAuth round trip is legitimate and hand the resulting
token back to the *correct* browser tab without leaking it to anyone else.

Two things matter here, and this is exactly where
[the CTS reference implementation](../CMS-IMPLEMENTATION-PLAN.md) had a real
bug that this worker fixes:

1. **The `postMessage` target origin is always a value read from
   `ALLOWED_DOMAINS`, resolved once and pinned server-side at `/auth` time
   (captured in a cookie, re-validated at `/callback` time).** It is never
   `"*"`, and it is never the raw `e.origin` of some inbound message. CTS did
   both of those: `postMessage(msg, e.origin)` (echoes the token to
   whichever origin the *inbound* message happened to claim, unchecked) and
   a wildcard `postMessage("authorizing:github", "*")` broadcast. Either one
   lets a malicious page that opened the OAuth popup — or that gets a
   reference to it — harvest the token.
2. **Inbound messages during the handshake are only acted on if their
   `e.origin` matches that same pinned, allowlisted origin** — see the
   `receive` handler in `renderPostMessageHtml` in `src/index.ts`.

`state` comparison uses a constant-time equality check
(`safeEqual` in `src/index.ts`) so a timing side-channel can't help an
attacker guess it.

### `ALLOWED_DOMAINS`

Set in `wrangler.toml` under `[vars]` (not a secret — it's just a list of
your own site's origin(s)):

```toml
[vars]
ALLOWED_DOMAINS = "https://hostmatecostarica.com,http://localhost:3000"
```

Comma-separated, no trailing slashes, scheme required. The worker resolves
each request's origin from the `Origin` header (falling back to `Referer`)
and only proceeds if it's in this list.

## Secrets

`GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are **Worker secrets**, never
committed to this repo:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

## Local development

```bash
pnpm install --ignore-workspace
```

The `--ignore-workspace` flag matters: this directory has its own
`package.json` and is not part of the root project's pnpm scope (there is
deliberately no `pnpm-workspace.yaml` anywhere in this repo — see the root
`CLAUDE.md`), and pnpm otherwise tries to resolve installs here against the
root project's lockfile.

pnpm will likely report `[ERR_PNPM_IGNORED_BUILDS]` for `esbuild`, `sharp`,
and `workerd` (transitive dependencies of `wrangler` that use native
postinstall build scripts) — this is pnpm's supply-chain safety gate, not an
error. Run `pnpm approve-builds` once and allow those three to let
`wrangler dev` work locally. This has no effect on the deployed Worker
itself (Cloudflare builds and runs your `src/index.ts` directly).

```bash
npx wrangler dev
```

`wrangler dev` runs the worker locally (default `http://localhost:8787`).
You'll need local values for the two secrets — `wrangler dev` reads a
`.dev.vars` file (gitignored) in this directory if present:

```
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

Point a local `public/admin/config.yml` copy's `base_url` at
`http://localhost:8787` to test end-to-end against `next dev`, and make sure
`http://localhost:3000` (or whatever port the site runs on) is in
`ALLOWED_DOMAINS`.

## Deploying

```bash
npx wrangler login   # first time only, per machine
npx wrangler deploy
```

Prints the deployed URL (`https://hostmate-cms-auth.<subdomain>.workers.dev`).
Put that into `public/admin/config.yml`'s `backend.base_url` at the repo
root, and into the GitHub OAuth App's callback URL as `<that-url>/callback`.
Full steps in [`../docs/CMS-SETUP.md`](../docs/CMS-SETUP.md).

## Type checking

```bash
pnpm typecheck
```

This is separate from — and not run by — the root project's `pnpm build` or
`pnpm lint`.
