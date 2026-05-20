# Feedback / Testimonials — How It Works & How To Hand It Off

This folder documents how the public testimonials on the live Hostmate Costa
Rica site are collected and moderated, and what to do so the **client** (not
you) is in charge of approving or rejecting them from now on.

---

## 1. What service is this, in one sentence

The testimonials feature is powered by **Google Apps Script**
(a JavaScript runtime by Google) wired to a **Google Sheet**. The script is
published as a public web API and the website talks to it over `fetch`.

> If you ever Google "the name of the service", it's **Google Apps Script** —
> sometimes called a "Google App". The sheet itself is just a regular Google
> Sheet that the script reads from and writes to.

---

## 2. How the pieces fit together

```
 ┌──────────────────────────┐                  ┌──────────────────────────┐
 │  Hostmate website        │  ─── POST ────►  │  Google Apps Script      │
 │  (Testimonials.tsx)      │   new review     │  (deployed as web app)   │
 │                          │  ◄── GET ─────   │                          │
 │                          │ approved reviews │                          │
 └──────────────────────────┘                  └────────────┬─────────────┘
                                                            │ reads / writes
                                                            ▼
                                               ┌──────────────────────────┐
                                               │  Google Sheet            │
                                               │  "Testimonials" tab      │
                                               │  Column G = Approved     │
                                               │  (TRUE / FALSE)          │
                                               └──────────────────────────┘
```

- Visitor fills the form on the website → POST → a new row is appended to the
  Sheet with **Approved = FALSE**.
- Client opens the Sheet, reads each new review, and types `TRUE` in column G
  (or checks the checkbox, depending on how the column is set up) to publish
  it. Anything left at `FALSE` stays hidden.
- Every time the page loads, the website calls GET and only the rows marked
  TRUE come back. No redeploy, no rebuild, nothing else needed — Google
  Sheets is the live database.

---

## 3. Where the existing setup lives (find it again)

You set this up once. To find it:

1. **The website-side config** is in `.env.local` (already on your machine,
   git-ignored):
   ```
   NEXT_PUBLIC_TESTIMONIALS_URL=https://script.google.com/macros/s/AKfycbx75H92ccEXt4Y4it3ZYToaFnfDV9trRglKyXEPmCTXy6YHzsTYf187D6iOp1J6cRj12w/exec
   ```
   That `/exec` URL is the deployed Apps Script. The Apps Script lives in
   the Google account that originally created it (yours).

2. **The Apps Script project** — go to <https://script.google.com> while
   logged into that Google account. You'll see a list of your projects;
   one of them is the Hostmate testimonials script. Open it and you'll see
   the same code that's saved here as `Code.gs`.

3. **The linked Google Sheet** — from inside the Apps Script editor,
   click `Resources` → `Libraries` (older UI) or use the "Overview" panel,
   or simply open Google Drive and search for `Testimonials` / `Hostmate`.
   The Sheet has a tab called **Testimonials** with these columns:

   | A         | B    | C              | D     | E        | F      | G        |
   |-----------|------|----------------|-------|----------|--------|----------|
   | Timestamp | Name | City & Country | Email | Language | Review | Approved |

   Column **G (Approved)** is the moderation switch. `TRUE` = published,
   `FALSE` = hidden.

---

## 4. Hand it off to the client (full transfer — recommended)

This is not your business; you don't want the data, the script, or the
Google account dependency. The cleanest move is for the **client to set up
everything from scratch on their own Google account**, then send you a new
`/exec` URL that you swap into the site.

### What you send the client

The file **`CLIENTE-SETUP.docx`** in this folder. It's a real Word
document, self-contained, 10-minute, Spanish-language step-by-step guide
that walks them through: creating the Sheet, opening Apps Script, pasting
the code (included in the guide as an annex), deploying as a Web App,
authorizing, and copying the final `/exec` URL.

**Recommended way to share as a Google Doc — one click:**

1. Go to [drive.google.com](https://drive.google.com).
2. Drag `CLIENTE-SETUP.docx` into the Drive window (or click **Nuevo → Subir archivo**).
3. Double-click the uploaded file → **Abrir con → Documentos de Google**.
4. Drive converts the `.docx` to a native Google Doc with headings,
   tables, lists, and the code annex all formatted correctly.
5. **Archivo → Compartir** → add the client's email.

That's it — no copy/paste, no Markdown-detection settings, no formatting
loss.

> Other versions in this folder if you ever need them: `CLIENTE-SETUP.html`
> (the source the docx was built from) and `CLIENTE-SETUP.md` (Markdown
> source-of-truth for edits). Google Docs does not auto-detect raw
> Markdown on paste, so prefer the `.docx`.

### What you do when they send back the URL

1. Open `.env.local` and replace the value of
   `NEXT_PUBLIC_TESTIMONIALS_URL` with the new `/exec` URL they sent you.
2. Rebuild and re-publish the site:
   ```bash
   pnpm build       # produces /out
   # then deploy /out to GitHub Pages (your usual deploy step)
   ```
3. Submit a test review from the live site. Confirm the new row appears in
   the **client's** Sheet (not yours).
4. Once verified, you can delete your old Apps Script project and old
   Sheet — the site no longer depends on them.

### Alternative: keep ownership, just share the Sheet

Only if the client doesn't want to manage anything Google-side. Open your
existing Sheet → **Share** → add client's email as **Editor** → forward
them `MODERACION.md`. No code changes, no rebuild, but the data stays on
your account.

---

## 5. Common questions

**Q: Can the client break the website by editing the wrong cell?**
Not really. As long as they only flip column G between TRUE and FALSE, the
script will keep returning the correct data. Tell them not to delete header
rows or rename the `Testimonials` tab — those two are the only things the
script cares about.

**Q: Where does the live Apps Script URL come from at build time?**
The website is a Next.js static export (`output: 'export'`). The env var
`NEXT_PUBLIC_TESTIMONIALS_URL` is baked into the JS bundle when you run
`pnpm build`. If you ever change the URL, you have to rebuild and
redeploy the static `out/` folder.

**Q: What if the Apps Script ever gets deleted or revoked?**
You have a copy of the source in `Code.gs` in this folder. To restore:
1. Create a new Google Sheet, add a tab called `Testimonials` with the
   header row described above.
2. `Extensions → Apps Script`, paste in `Code.gs`.
3. `Deploy → New deployment → Web app`, execute as **Me**, access
   **Anyone**.
4. Copy the new `/exec` URL into `.env.local` and rebuild the site.

**Q: Spam protection?**
The form already includes a honeypot field and a 3-second minimum
submission delay (see `components/Testimonials.tsx`). The Apps Script
also trims fields to safe lengths. If spam becomes a real problem, add
reCAPTCHA on the form, not on the script.

---

## 6. Files in this folder

- `README.md` — this document (for you, the developer/owner).
- `CLIENTE-SETUP.docx` — **send this to the client.** Real Word document.
  Upload to Drive → open with Google Docs → share. 10-minute Spanish guide
  covering Sheet creation, Apps Script setup, Web App deploy, and
  authorization. Includes the full script as an annex.
- `CLIENTE-SETUP.html` — HTML source used to generate the `.docx`. Useful
  if you ever need to regenerate the docx (`node /tmp/docx-build/convert.js`
  if the build folder still exists, otherwise see "Regenerating the docx"
  below).
- `CLIENTE-SETUP.md` — Markdown source-of-truth for edits. Less useful
  for sharing because Docs doesn't auto-render Markdown on paste.
- `MODERACION.md` — short, plain-Spanish moderation guide. Send after
  setup, when they're approving the first reviews.
- `Code.gs` — backup of the Apps Script source. Identical to the annex
  inside the client guides. Keep it here for version control.

### Regenerating the docx

If you edit `CLIENTE-SETUP.html` and want to rebuild the docx:

```bash
mkdir -p /tmp/docx-build && cd /tmp/docx-build
echo '{"name":"tmp","version":"1.0.0"}' > package.json
pnpm add html-to-docx
node -e "
  const fs = require('fs');
  const HTMLtoDOCX = require('html-to-docx');
  const html = fs.readFileSync('$OLDPWD/feedback/CLIENTE-SETUP.html', 'utf8');
  HTMLtoDOCX(html, null, { font: 'Helvetica', fontSize: 22 })
    .then(buf => fs.writeFileSync('$OLDPWD/feedback/CLIENTE-SETUP.docx', buf));
"
```
