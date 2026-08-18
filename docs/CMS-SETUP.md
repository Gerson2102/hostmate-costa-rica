# CMS Setup — Hostmate Costa Rica

Internal setup guide for Gerson. Covers the one-time steps needed to turn on
the Decap CMS admin panel at `/admin/`: creating the GitHub OAuth App,
deploying the Cloudflare Worker that handles the OAuth handshake, wiring the
worker's secrets, pointing the CMS config at the deployed worker, inviting
the client as a GitHub collaborator, and rotating secrets later if needed.

This is a one-time setup per repo. None of these steps run automatically —
do them in order.

## How the pieces fit together

- `public/admin/index.html` + `public/admin/config.yml` — the Decap CMS
  admin panel itself. Static files, served at `https://<site>/admin/` by
  GitHub Pages (part of the normal Next.js export, no extra deploy step).
- `cms-auth-worker/` — a small Cloudflare Worker that implements the GitHub
  OAuth flow Decap expects (`GET /auth`, `GET /callback`). This is the piece
  that lets the client log in with their GitHub account from the admin
  panel. It is a **separate deployable** from the Next.js site — it does not
  build or deploy as part of `pnpm build` / the GitHub Pages workflow.
- GitHub repo collaborator access is the actual authorization boundary:
  anyone who can push to `Gerson2102/hostmate-costa-rica` can save through
  the CMS. The worker only proves "this person has a valid GitHub account
  that GitHub says is allowed to write to this repo" — it does not add a
  second permission layer on top of that.

## 1. Create the GitHub OAuth App

1. Go to <https://github.com/settings/developers> → **OAuth Apps** → **New OAuth App**.
2. Fill in:
   - **Application name**: `Hostmate Costa Rica CMS` (or similar — only you see this name)
   - **Homepage URL**: the live site URL, e.g. `https://hostmatecostarica.com`
   - **Authorization callback URL**: `https://<your-worker-subdomain>.workers.dev/callback`
     (you'll get the exact worker URL in step 2 — come back and fill this in once you have it)
3. Click **Register application**.
4. Note the **Client ID** shown on the app's page.
5. Click **Generate a new client secret** and copy it immediately — GitHub
   only shows it once. Store it in a password manager; you'll need it in step 3.

## 2. Deploy the Cloudflare Worker

The worker source lives in `cms-auth-worker/`. It is intentionally excluded
from the Next.js build (see `tsconfig.json` excludes and
`eslint.config.mjs` ignores) — it has its own `package.json` and is deployed
independently with [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

```bash
cd cms-auth-worker
pnpm install
npx wrangler login          # opens a browser to authorize Wrangler against your Cloudflare account
npx wrangler deploy
```

The deploy output prints the worker's URL, something like:

```
https://hostmate-cms-auth.<your-cloudflare-subdomain>.workers.dev
```

Copy that URL — you need it in step 4.

If you don't have a Cloudflare account yet, sign up at
<https://dash.cloudflare.com/sign-up> first (the free plan is sufficient;
this worker does trivial request volume).

## 3. Set the Worker secrets

Two secrets and one environment variable, all from the same terminal in
`cms-auth-worker/`:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
# paste the Client ID from step 1 when prompted

npx wrangler secret put GITHUB_CLIENT_SECRET
# paste the Client Secret from step 1 when prompted
```

`ALLOWED_DOMAINS` is **not** a secret — it's a plain var already set in
`cms-auth-worker/wrangler.toml` under `[vars]`. Edit it before deploying (or
redeploy after editing) to match your real site origin(s), comma-separated,
no trailing slash, e.g.:

```toml
[vars]
ALLOWED_DOMAINS = "https://hostmatecostarica.com,http://localhost:3000"
```

`http://localhost:3000` is useful for testing the CMS locally against
`next dev`; remove it once the client-facing flow is confirmed working, or
leave it — it does not weaken production security since it only ever
matches requests whose `Origin`/`Referer` is literally `localhost:3000`.

After changing `wrangler.toml`, redeploy: `npx wrangler deploy`.

## 4. Point config.yml at the deployed worker

Edit `public/admin/config.yml` at the repo root (not inside
`cms-auth-worker/`) and replace the placeholder:

```yaml
backend:
  base_url: https://REPLACE_WITH_CLOUDFLARE_WORKER_URL.workers.dev
```

with the real worker URL from step 2. Commit and push — the next GitHub
Pages deploy picks it up automatically.

Also go back to the GitHub OAuth App (step 1) and double check the
**Authorization callback URL** is exactly `<worker-url>/callback`.

## 5. Invite the client as a collaborator

The client (Vanessa) needs a GitHub account with **write** access to
`Gerson2102/hostmate-costa-rica` to log into the CMS — this is inherent to
any git-backed CMS (Decap included), not something this setup can avoid. See
`docs/GUIA-PANEL-ADMIN.md` for the client-facing signup instructions to send her.

Once she has a GitHub username, invite her via the web UI:

1. Go to `https://github.com/Gerson2102/hostmate-costa-rica/settings/access`
2. **Add people** → enter her GitHub username → choose **Write** role → **Add**.

Or via `gh` CLI:

```bash
gh api repos/Gerson2102/hostmate-costa-rica/collaborators/<her-github-username> \
  -X PUT -f permission=push
```

She'll get an email/notification to accept the invite before she can push.

## 6. Rotating secrets

If `GITHUB_CLIENT_SECRET` is ever exposed or needs rotating:

1. In the OAuth App settings (<https://github.com/settings/developers> →
   your app), click **Generate a new client secret**. This invalidates the
   old one immediately.
2. Update the worker: `cd cms-auth-worker && npx wrangler secret put GITHUB_CLIENT_SECRET`
   and paste the new value.
3. No redeploy of the Next.js site or `config.yml` is needed — the secret
   only lives in the worker.

If `GITHUB_CLIENT_ID` needs to change (e.g. you recreate the OAuth App
entirely), also update the callback URL on the new app and re-run
`wrangler secret put GITHUB_CLIENT_ID`.

## Known limitation: Plans section

`content/plans.json` is fully CMS-wired (validated by
`scripts/build-content.mjs`, editable via the **Planes** collection in the
admin panel, flows through to `lib/content.generated.ts`), and
`components/Plans.tsx` reads from it correctly. However, **`<Plans />` is
not currently rendered anywhere in `app/page.tsx`** — the pricing section
does not appear on the live homepage. This was a deliberate scope decision
during the CMS build (see `CMS-IMPLEMENTATION-PLAN.md` section 10): wiring
it up cost nothing extra, so it was left CMS-editable in case the section
gets added to the page later, but adding it to the page itself was treated
as a separate, out-of-scope task.

If a future task adds `<Plans />` to the homepage, no CMS or content changes
are needed — the data is already there and already editable.

## Testing the full loop before handing off to the client

1. Deploy everything above.
2. Open `https://<site>/admin/` (trailing slash — see the note in
   `docs/GUIA-PANEL-ADMIN.md`).
3. Log in with **your own** GitHub account (you already have write access).
4. Make a small test edit (e.g. tweak a property's price notes), save.
5. Confirm a new commit lands on `main` in the repo.
6. Wait ~2–5 minutes and confirm the change is live on the site.
7. Only then send the client her GitHub invite and the Spanish guide.
