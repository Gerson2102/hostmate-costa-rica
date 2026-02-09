# Hostmate Costa Rica v2

Bilingual (EN/ES) property management website. Single-page app with cinematic animations and smooth scrolling.

## Tech Stack

Next.js 15.5.7 | React 19 | TypeScript 5 | Tailwind CSS 4
GSAP 3.12.5 + ScrollTrigger | Framer Motion 11 | Lenis 1.1.18 | SplitType 0.3.4

## Critical Rules

### Tailwind CSS 4 - NO Manual Resets
```css
/* NEVER add manual resets - breaks mx-auto, max-w-*, centering */
* { margin: 0; padding: 0; box-sizing: border-box; }  /* DON'T DO THIS */
```

### GSAP - ALWAYS Cleanup
```typescript
useEffect(() => {
  const ctx = gsap.context(() => { /* animations */ }, containerRef);
  return () => ctx.revert();  // CRITICAL
}, []);
```

### Internationalization
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

**Services.tsx** - GSAP pinned horizontal scroll with `invalidateOnRefresh: true`. Include `language` in useEffect deps.

**Properties.tsx** - Filter system + carousel. Bilingual fields: `name[language]`, `description[language]`

**SmoothScroll.tsx** - Lenis wrapper integrated with GSAP ticker.

## Deployment

Static export to GitHub Pages: `npm run build` → `/out`

## Protected Files

Modify with care:
- `lib/translations.ts` - All site text
- `lib/LanguageContext.tsx` - i18n infrastructure
- `app/globals.css` - Theme tokens
- `components/SmoothScroll.tsx` - Scroll behavior

## Agent Notes

Background agents write to `.exploration/` (gitignored). Run npm/git commands in foreground (need approval).
