# Visual/UI Design Audit
**Date:** 2026-02-07
**URL:** http://localhost:3000
**Viewport:** 1280px (desktop primary), 375px (mobile), 320px (mobile-s), 768px (tablet)
**Languages Tested:** English (EN) and Spanish (ES)

## Summary

The site presents a clean, modern design with a consistent brand identity built around the coral (#E85D4C) primary color. The overall desktop experience is polished and professional. However, several significant issues were found: horizontal overflow on mobile viewports (320px and 375px), service accordion text truncation on mobile, a contrast issue with white text on the primary coral color, inconsistent section heading `line-height` values, and a persistent Lenis debug badge visible in the bottom-left corner. The site looks good at desktop resolutions but needs targeted fixes for small mobile screens and a few contrast/typography refinements.

**Issue counts by severity:**
- Critical: 1
- High: 4
- Medium: 7
- Minor: 5

---

## Issues

### [critical] Horizontal Overflow on Mobile Viewports (320px and 375px)

- **Section:** Full page (all sections affected)
- **Component:** Multiple elements including Hero background, About section grid, Services section
- **Description:** At 320px viewport width, `document.documentElement.scrollWidth` is 469px vs `clientWidth` of 320px -- a 149px horizontal overflow. At 375px, the scroll width is also 469px vs 375px client width. This causes a visible horizontal scrollbar and allows the entire page to shift sideways, which is a major usability failure on small phones. The primary culprits are:
  1. The About section (`py-24 lg:py-32 bg-background relative overflow-hidden`) has an inner element reaching 500px wide at 320px viewport.
  2. The Hero `absolute inset-0 overflow-hidden` container reaches 460-488px at small widths.
  3. Various `grid` containers with `gap-12` or `gap-16` that do not reduce sufficiently on small screens.
- **Screenshot:** `09-overflow-mobile-s.png`, `09-overflow-mobile-m.png`
- **Suggested Fix:** Audit every container for content that can exceed viewport width. The About section background blur orbs (`w-[500px]`, `w-[400px]`) likely extend beyond the `overflow-hidden` container. Add `overflow-x: hidden` to the `<html>` or `<body>` element as a safety net, but also fix the root cause by reducing decorative element sizes on small screens or ensuring parent containers properly clip them. Check grid gaps (`gap-16 lg:gap-24`) and reduce them for small screens (e.g., `gap-8 sm:gap-12 lg:gap-24`).

---

### [high] Service Accordion Text Truncated on Mobile

- **Section:** Services (#servicios)
- **Component:** `ServiceAccordionItem` titles
- **Description:** On the 375px mobile viewport, service titles like "Publicacion de la Propieda..." and "Administracion de Calenda..." are cut off by the `truncate` CSS class on the `<h3>` element (line 111 of `Services.tsx`). The combination of the icon (48px flex-shrink-0), the numbered badge, and the chevron leaves insufficient horizontal space for the title text on narrow screens. This affects the Spanish translations most severely since Spanish text tends to be longer.
- **Screenshot:** `07-services-mobile-en.png`
- **Suggested Fix:** Remove the `truncate` class from the service title `<h3>`. Instead, allow the title to wrap to multiple lines on mobile. Alternatively, reduce the icon size on small screens or use `text-base` instead of `text-lg` for the title below the `sm` breakpoint.

---

### [high] White Text on Primary Coral (#E85D4C) Fails WCAG AA for Normal Text

- **Section:** Multiple (Navigation CTA, Booking CTA, Filter buttons, Services CTA)
- **Component:** All buttons/links using `bg-primary text-white`
- **Description:** The contrast ratio of white (#FFFFFF) on the primary coral (#E85D4C) is 3.44:1, which fails WCAG AA for normal-size text (requires 4.5:1). This affects:
  - The "Book Consultation" navigation button (uses `bg-primary-dark` which passes at 4.93:1 -- good)
  - The large booking CTA button (uses `bg-primary` which fails at 3.44:1)
  - The "All" filter button in Properties (uses `bg-primary`)
  - The "Book a free consultation" link in Services (uses `bg-primary`)
  - The skip-link (uses `bg-primary`)
  The navigation CTA correctly uses `bg-primary-dark` (#C4453A, 4.93:1) but other CTAs inconsistently use `bg-primary`.
- **Screenshot:** `02-booking-desktop-en.png`, `02-properties-desktop-en.png`, `03-scroll-005-desktop-en.png`
- **Suggested Fix:** Change all `bg-primary text-white` buttons to use `bg-primary-dark text-white` instead, which achieves 4.93:1 contrast. The `--color-primary-dark: #C4453A` token already exists and is documented specifically for this purpose. Apply this consistently to all CTA buttons sitewide.

---

### [high] Lenis Smooth Scroll Debug Badge Visible in Production

- **Section:** All sections (persistent overlay)
- **Component:** Lenis library debug indicator
- **Description:** A small circular badge with the letter "N" (the Lenis logo/debug indicator) is visible in the bottom-left corner of the viewport on every screenshot at every viewport size. This appears as a dark circle approximately 32-40px in size that floats over content. It is visible in every desktop and mobile screenshot. This is a development artifact that should not be visible to end users.
- **Screenshot:** Visible in nearly every screenshot, e.g., `02-about-desktop-en.png`, `07-hero-mobile-en.png`, `02-hero-desktop-en.png`
- **Suggested Fix:** Lenis has a debug mode or default UI element. Either disable it in the Lenis configuration by setting `wrapper` and other debug options appropriately, or hide it via CSS: `[data-lenis-prevent] { display: none; }` or target the specific Lenis badge element. Alternatively, check the Lenis initialization options in `SmoothScroll.tsx` for a debug or indicator flag to disable.

---

### [high] Mobile Menu Does Not Cover Background Content

- **Section:** Navigation
- **Component:** Mobile hamburger menu dropdown
- **Description:** When the mobile menu is opened (hamburger icon tapped), the dropdown menu panel appears but does not use a full-screen overlay or backdrop. The page content behind the menu remains visible and potentially interactive. The hero section text ("Maximiza tu rentabilidad sin preocupaciones") and the property card are clearly visible below the menu panel. This creates visual clutter and may allow accidental taps on background elements.
- **Screenshot:** `08-mobile-menu-open.png`
- **Suggested Fix:** Add a semi-transparent backdrop overlay (e.g., `bg-black/50`) behind the mobile menu that covers the full viewport. This prevents interaction with background content and provides a clear visual separation. Also consider trapping focus within the menu when open.

---

### [medium] Inconsistent Heading Line-Heights

- **Section:** Multiple
- **Component:** H1 and H2 headings
- **Description:** The heading `line-height` values are inconsistent across sections:
  - H1 ("Your Property, Our Passion"): 96px font-size, 91.2px line-height (ratio 0.95) -- set via `leading-[0.95]`
  - H2 ("Your Trusted Partner"): 60px font-size, 66px line-height (ratio 1.1)
  - H2 ("Conozca a Nuestro Equipo"): 60px font-size, 60px line-height (ratio 1.0)
  - H2 ("Our Services"): 48px font-size, 48px line-height (ratio 1.0)
  - H2 ("Featured Properties"): 48px font-size, 48px line-height (ratio 1.0)
  - H2 ("Book Your Free Consultation"): 72px font-size, 72px line-height (ratio 1.0)

  The Team section heading uses the default `leading-tight` which results in `1.0` for its H2. The About section H2 uses `leading-[1.1]` explicitly. This inconsistency means some headings look tighter than others. The 1.0 line-height in the Team and Booking headings can cause descenders and ascenders to collide on multi-line headings, especially in Spanish where the heading "Conozca a Nuestro Equipo" wraps to two lines.
- **Screenshot:** `02-team-desktop-en.png`, `05-team-desktop-es.png`, `05-booking-desktop-es.png`
- **Suggested Fix:** Standardize heading line-heights. Use `leading-[1.1]` for all large display headings (H1 and H2) to provide consistent vertical rhythm and prevent text collision on multi-line headings.

---

### [medium] Inconsistent Section Vertical Padding

- **Section:** All sections
- **Component:** Section containers
- **Description:** Most sections use `py-24 lg:py-32` (96px / 128px), but the Booking section uses `py-24` without the `lg:py-32` breakpoint (96px at all sizes). Additionally, the Booking section also has `min-h-screen` which makes it significantly taller than other sections, leaving large amounts of empty space above and below the CTA content on desktop. The Hero section has `pt-28 pb-24` which is slightly different from the others. The actual measured values are:
  - About: pt=128px pb=128px
  - Team: pt=128px pb=128px
  - Services: pt=128px pb=128px
  - Properties: pt=128px pb=128px
  - Booking: pt=96px pb=96px (plus min-h-screen)
  - Work With Us: pt=128px pb=128px
- **Screenshot:** `03-scroll-007-desktop-en.png` (property-to-booking transition), `03-scroll-008-desktop-en.png`
- **Suggested Fix:** Consider removing `min-h-screen` from the Booking section and using the same `py-24 lg:py-32` padding as other sections for visual consistency. The `min-h-screen` creates an unnecessarily tall section with too much empty space at desktop viewports.

---

### [medium] Property Card Second Column Missing Review Count

- **Section:** Properties (#propiedades)
- **Component:** `PropertyCard` - middle card (Luxury Condo at Become Nosara)
- **Description:** The middle property card ("Luxury Condo at Become Nosara") shows only the accommodation type badge "Condominium" without a star rating or review count, while the other two cards show both the badge and the review information (e.g., "4.96 (25 reviews)"). This creates visual asymmetry in the card row -- the first and third cards have two badges while the middle card has only one, causing the content to not align horizontally across cards.
- **Screenshot:** `02-properties-desktop-en.png`, `03-scroll-006-desktop-en.png`
- **Suggested Fix:** This is a data issue rather than a design bug -- the Become Nosara property likely does not have rating data in the properties data file. If rating data is available, add it. If not, consider adding a placeholder or adjusting the layout so the missing badge does not create visual imbalance (e.g., reserve the vertical space even when no rating is shown).

---

### [medium] Hero H1 Missing Space Between Lines in Heading Text

- **Section:** Hero
- **Component:** H1 heading
- **Description:** The heading text renders as "Your Property,Our Passion" (visible in the heading hierarchy check) without a space after the comma on line break. Looking at the DOM, the `<br />` tag between `{t.hero.headline1}` and the `<span>` creates a line break, but the computed text content concatenates to "Your Property,Our Passion" (or "Tu Propiedad,Nuestra Pasion" in Spanish). While visually the line break separates them, this is semantically incorrect for screen readers and text extraction tools which may read it as one run-on phrase.
- **Screenshot:** `02-hero-desktop-en.png`
- **Suggested Fix:** Add a trailing space to the `headline1` translation string (e.g., "Your Property, " with a space) or add the comma and space directly in the JSX before the `<br />`.

---

### [medium] Team Section Bio Text Column Width Imbalance

- **Section:** Team (#equipo)
- **Component:** Team member bio paragraphs
- **Description:** Vanessa's bio is noticeably longer than Julian's, resulting in uneven column heights when the two team members are displayed side by side on desktop. Vanessa's column extends approximately 2-3 additional paragraphs below Julian's content, which creates an empty gap on the right side. The `max-w-md` constraint on the bio text is appropriate but the differing content lengths create visual imbalance.
- **Screenshot:** `03-scroll-003-desktop-en.png`
- **Suggested Fix:** Either balance the content length between the two bios (editorial change) or use a CSS grid with `align-items: start` (which is already the case). The visual imbalance is primarily a content issue. Consider adding a visual element (e.g., a social link or a short quote) to Julian's card to balance the vertical space.

---

### [medium] About Section Stats Card Overflow on Tablet

- **Section:** About (#nosotros)
- **Component:** Stats card with decorative borders
- **Description:** At 768px tablet viewport, the About section stats card inner elements show overflow. The grid container (`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center`) uses `gap-16` at tablet widths (below `lg` breakpoint), and the decorative borders (`absolute -inset-4` and `-inset-8`) extend beyond the card container, potentially overflowing. The overflow data shows the grid at 736px wide vs 720px client width, indicating contained child elements are overflowing slightly.
- **Screenshot:** `09-overflow-tablet.png`
- **Suggested Fix:** Reduce the gap from `gap-16` to `gap-8 md:gap-12 lg:gap-24` so the two-column layout has appropriate spacing at tablet widths. Also ensure the decorative `-inset-8` border is hidden below `lg` breakpoint (which it already is: `hidden lg:block`), so only the `-inset-4` border shows on tablet.

---

### [medium] Footer Contact Links Overflow on Tablet

- **Section:** Footer
- **Component:** Contact links list
- **Description:** At 768px tablet viewport, the footer contact links (email address `info@hostmatecostarica.com` and Instagram handle `@hostmatecostarica`) overflow their grid column. The overflow check shows footer link elements at 252px scroll width vs 208px client width, meaning the text is overflowing its allocated column by approximately 44px. This is because the 3-column footer grid at `md:grid-cols-3` gives each column approximately 208px at 768px viewport, which is not enough for the long email address.
- **Screenshot:** `09-overflow-tablet.png`
- **Suggested Fix:** Add `break-all` or `overflow-wrap: break-word` to the contact link text, or switch the footer to a 2-column layout at `md` and 3-column at `lg`. Alternatively, use `text-sm` for contact info at tablet width or truncate the email with an ellipsis.

---

### [minor] Overline Label Tracking Inconsistency

- **Section:** Multiple
- **Component:** Section overline/subtitle labels
- **Description:** The overline labels above section headings use different `letter-spacing` values:
  - Hero: `tracking-[0.2em]`
  - About: `tracking-[0.2em]`
  - Team: `tracking-[0.2em]`
  - Services: `tracking-wider` (Tailwind default 0.05em)
  - Properties: `tracking-wider` (0.05em)
  - Booking: `tracking-[0.2em]`
  - Work With Us: `tracking-[0.2em]`

  The Services and Properties sections use `tracking-wider` while all others use `tracking-[0.2em]`, creating a subtle visual inconsistency in the overline labels.
- **Screenshot:** `02-services-desktop-en.png` vs `02-team-desktop-en.png`
- **Suggested Fix:** Standardize all section overline labels to use `tracking-[0.2em]` for consistency.

---

### [minor] "Book Consultation" Button Uses Different Background Than Other CTAs

- **Section:** Navigation
- **Component:** "Book Consultation" button
- **Description:** The navigation CTA button uses `bg-primary-dark hover:bg-primary` (dark-to-light on hover), which is the correct WCAG-compliant approach. However, all other CTA buttons on the page use `bg-primary hover:bg-primary-glow` (light-to-lighter on hover). This creates a subtle but noticeable color difference between the navigation CTA and other CTAs. The nav button appears darker/more saturated than the booking and services CTAs.
- **Screenshot:** `02-hero-desktop-en.png` (compare nav button to other CTAs)
- **Suggested Fix:** This is intentional for accessibility (the nav button correctly uses the darker shade for WCAG compliance). However, for consistency, consider updating all other CTA buttons to also use `bg-primary-dark` as the base color, which would both improve contrast compliance and create visual consistency.

---

### [minor] Property Card Image First Load Shows Gray Placeholder

- **Section:** Properties (#propiedades)
- **Component:** `ImageCarousel` loading state
- **Description:** When the property cards first appear in the viewport (scroll into view), the image shows a gray pulsing placeholder (`bg-gray-200 animate-pulse`) before the lazy-loaded image appears. Since all three cards animate in simultaneously with a staggered delay, the user sees 1-3 gray rectangles flickering briefly before images load. This is most noticeable on slower connections but can also be observed on fast connections due to the lazy loading + animation combination.
- **Screenshot:** Not directly capturable in a static screenshot (transient state)
- **Suggested Fix:** Consider using `loading="eager"` for above-fold property images or implementing a blur-up placeholder using Next.js `Image` component with `placeholder="blur"` and `blurDataURL`. Alternatively, set the first visible property images to `priority` loading.

---

### [minor] Heading Text Missing Word Spacing After Line Break

- **Section:** About, Booking
- **Component:** H2 headings with `<br />` elements
- **Description:** The About heading reads "Your Trusted\nPartner" and the Booking heading reads "Book Your\nFree Consultation". The computed text content from the audit shows "Your TrustedPartner" and "Book YourFree Consultation" -- the `<br />` does not contribute a space character in the accessibility tree / computed text. While these headings look correct visually (the line break provides visual separation), screen readers may read them as run-together words.
- **Screenshot:** `02-about-desktop-en.png`, `02-booking-desktop-en.png`
- **Suggested Fix:** Add a space character before the `<br />` in the JSX, or restructure the heading to use `\n` within the translation string with CSS `white-space: pre-line` instead of explicit `<br />` tags.

---

### [minor] Julian Team Photo Has Mismatched Aspect Ratio Source

- **Section:** Team (#equipo)
- **Component:** Julian's photo
- **Description:** Julian's source image is 1280x794px (landscape aspect ratio 1.61:1) but is displayed in a 248x248px circle. The image is scaled down 5.16x and cropped to a circle, which means significant portions of the landscape image are cropped out. Vanessa's image is 1150x1280px (portrait, 0.9:1 ratio) which is much more suitable for circular framing. Julian's image loses context from the sides due to the aggressive crop from landscape to square/circle.
- **Screenshot:** `02-team-desktop-en.png`
- **Suggested Fix:** Provide a square or portrait-oriented crop of Julian's photo for use in the circular frame. This would show more of the subject and reduce wasted resolution. Use `object-position: center top` if the subject's face is in the upper portion of the landscape image.

---

## Screenshots Reference

All screenshots are saved in `/root/website-templates/hostmate-costa-rica-v2/docs/audits/screenshots/`. Key files:

| Screenshot | Description |
|---|---|
| `01-fullpage-desktop-en.png` | Full page at 1280px, English |
| `02-hero-desktop-en.png` | Hero section, desktop, English |
| `02-about-desktop-en.png` | About section, desktop, English |
| `02-team-desktop-en.png` | Team section, desktop, English |
| `02-services-desktop-en.png` | Services section, desktop, English |
| `02-properties-desktop-en.png` | Properties section, desktop, English |
| `02-booking-desktop-en.png` | Booking section, desktop, English |
| `02-work-with-us-desktop-en.png` | Work With Us section, desktop, English |
| `02-footer-desktop-en.png` | Footer, desktop, English |
| `03-scroll-000 to 010-desktop-en.png` | Incremental scroll views, desktop, English |
| `04-fullpage-desktop-es.png` | Full page at 1280px, Spanish |
| `05-*-desktop-es.png` | All sections, desktop, Spanish |
| `06-fullpage-mobile-en.png` | Full page at 375px, English |
| `07-*-mobile-en.png` | All sections, mobile, English |
| `08-mobile-menu-open.png` | Mobile hamburger menu open state |
| `09-overflow-mobile-s.png` | 320px overflow test |
| `09-overflow-mobile-m.png` | 375px overflow test |
| `09-overflow-tablet.png` | 768px overflow test |
| `09-overflow-laptop.png` | 1280px overflow test |
| `09-overflow-desktop.png` | 1920px overflow test |

## Hydration Warnings

The console logs show React hydration mismatch warnings related to the `PropertyCard` component's `ImageCarousel`. The `alt` attribute differs between server (English) and client (Spanish) because the language context resolves differently during SSR vs client hydration. While this is not a visual issue per se, it causes console errors and could lead to unexpected image alt text flashing.

## Top 3 Highest-Impact Recommendations

1. **Fix mobile horizontal overflow** (Critical) -- This breaks the entire mobile experience for users on small phones. Focus on the About section's background orbs and grid gaps first.

2. **Standardize CTA button colors to `bg-primary-dark`** (High) -- This simultaneously fixes the WCAG contrast failure on all CTA buttons and creates visual consistency with the nav button. A single find-and-replace of `bg-primary` to `bg-primary-dark` on button/link elements would resolve this.

3. **Fix service accordion title truncation on mobile** (High) -- Removing the `truncate` class from the service title `<h3>` is a one-line change that prevents important content from being hidden on mobile devices.
