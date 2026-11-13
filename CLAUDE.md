# Hostmate Costa Rica v2

Bilingual (EN/ES) property management website. Single-page app with cinematic animations and smooth scrolling.

## Tech Stack

Next.js 15.5.7 | React 19 | TypeScript 5 | Tailwind CSS 4
Framer Motion 11 | Lenis 1.3 (smooth scroll, desktop only)

## Critical Rules

### Tailwind CSS 4 - NO Manual Resets
```css
/* NEVER add manual resets - breaks mx-auto, max-w-*, centering */
* { margin: 0; padding: 0; box-sizing: border-box; }  /* DON'T DO THIS */
```

### Entrances - content visible by default
Add `className="reveal"` (CSS scroll-driven animation in `globals.css`) for section entrances.
Do NOT use framer-motion `initial={{ opacity: 0 }}` + `whileInView`: it ships content hidden until JS hydrates.
`.reveal` tracks the nearest scroll container, so its section must not be `overflow-hidden` (use `overflow-clip`).

Hero entrance: an inline script in `app/layout.tsx` puts `intro` (first home visit of the session: "host" + "mate" doors, ~3s) or `enter` (later visits, ~1s) on `<html>` before first paint and removes it at 3.3s (keep that above the longest animation). All timing lives in `globals.css` (`--entrance-start`, `--entrance-dur`, `--stagger`, per-element `--i`). With no class (reduced motion, no JS) nothing animates.

### Internationalization
The route sets the language: `/` = English, `/es/` = Spanish (`<HomePage language="es" />`).
LanguageSwitcher links between them; nothing is stored in localStorage.
```typescript
const { t, language } = useLanguage();
<h1>{t.hero.headline1}</h1>
<p>{property.description[language]}</p>  // For bilingual data
```

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | #E85D4C | Coral brand color |
| `--color-primary-dark` | #C4453A | WCAG AA text |
| `--color-secondary` | #2D5BFF | Blue accent |
| `--color-foreground` | #1A1A2E | Primary text |
| `--color-muted` | #64748B | Secondary text |

## Complex Components

**Services.tsx** - Static two-column list of the 8 services (icon, title, description).

**Properties.tsx** - Filter system + carousel. Bilingual fields: `name[language]`, `description[language]`

**SmoothScroll.tsx** - Lenis (`autoRaf`), only >= 768px and without reduced motion.

## Deployment

Static export to GitHub Pages: `pnpm build` → `/out`

## Protected Files

Modify with care:
- `lib/translations.ts` - All site text
- `lib/LanguageContext.tsx` - i18n infrastructure
- `app/globals.css` - Theme tokens
- `components/SmoothScroll.tsx` - Scroll behavior

## Agent Notes

Background agents write to `.exploration/` (gitignored). Run npm/git commands in foreground (need approval).
