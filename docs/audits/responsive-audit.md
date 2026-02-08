# Responsive Layout Audit

**Date:** 2026-02-07
**URL:** http://localhost:3000
**Viewports Tested:** 375px, 768px, 1280px, 667x375 (landscape)
**Tool:** Playwright 1.57.0 (Chromium, headless)
**Screenshots:** `/docs/audits/screenshots/`

---

## Summary

The site generally adapts well across viewports -- the navigation correctly switches between hamburger (mobile) and full links (desktop), content stacks appropriately on smaller screens, and typography scales reasonably. However, there is one critical horizontal overflow issue at mobile (375px) caused by the Services section, multiple touch-target sizing failures across all viewports, and several decorative gradient orbs that extend beyond their containers without proper clipping. The footer links are too small for comfortable tapping on mobile, and property carousel controls are difficult to interact with on touch devices.

**Issues found:** 2 critical, 3 high, 4 medium, 3 minor (12 total)

---

## Issues

### [CRITICAL] Horizontal overflow on page at 375px caused by Services section

- **Viewport:** 375px (mobile)
- **Section:** Services (`#servicios`)
- **Component:** `ServiceAccordionItem` `motion.div` wrappers (`.group` elements)
- **Description:** The page has a horizontal scrollbar at 375px mobile viewport. The document `scrollWidth` is 424px while `clientWidth` is 375px, resulting in 49px of horizontal overflow. Root cause: the Services section (`#servicios`) does not have `overflow-hidden`, and the Framer Motion `motion.div` wrappers for each accordion item render at 408px wide despite their parent grid container being 343px wide. All 8 accordion items overflow by 49px to the right. This is the only section without `overflow-hidden` -- every other section (About, Team, Properties, WorkWithUs, Footer) correctly applies it. The gradient orbs in the About (`w-[500px]`), Properties (`w-[400px]`), and WorkWithUs (`w-[500px]`) sections are also wider than the viewport but are properly clipped by their parent sections' `overflow-hidden`.
- **Screenshot:** `mobile-375-services.png`, `mobile-375-fullpage.png`
- **Suggested Fix:** Add `overflow-hidden` to the Services section element. In `components/Services.tsx` line 172, change the section className from `"py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background-elevated"` to `"py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background-elevated overflow-hidden"`. Also investigate why the `motion.div` with className `group` is not constrained by its parent grid -- may need `w-full` or `min-w-0` on the motion wrapper.

---

### [CRITICAL] Property carousel controls too small for touch interaction

- **Viewport:** 375px, 768px, 667x375 (all mobile/tablet)
- **Section:** Properties (`#propiedades`)
- **Component:** Carousel prev/next buttons and dot indicators
- **Description:** The carousel previous/next arrow buttons are only 32x32px, well below the WCAG 2.5.8 minimum of 44x44px for touch targets. The carousel dot indicators are even smaller: the active dot is 16x8px and inactive dots are 8x8px. These are extremely difficult to tap accurately on touch devices, especially for users with motor impairments. This affects every property card carousel (3 properties x 9 images each = up to 27 dot buttons per card).
- **Screenshot:** `mobile-375-properties.png`
- **Suggested Fix:** Increase carousel arrow buttons to at least 44x44px (they can remain visually 32px with larger tap areas via padding). For dot indicators, either increase the tap area to 44x44px using padding/margin, or replace dots with swipe gestures only and remove the dot buttons from mobile. Alternatively, use invisible enlarged hit areas around each dot.

---

### [HIGH] Property filter buttons below minimum touch target height

- **Viewport:** 375px, 768px, 667x375 (all mobile/tablet)
- **Section:** Properties (`#propiedades`)
- **Component:** Filter buttons ("All", "Entire Home", "Condominium")
- **Description:** The property type filter buttons ("All" at 49x38px, "Entire Home" at 118x38px, "Condominium" at 130x38px) all have a height of 38px, which is below the 44px minimum touch target size. On mobile, these are primary interactive elements for browsing properties. The width of "All" at 49px also barely meets the minimum.
- **Screenshot:** `mobile-375-properties.png`
- **Suggested Fix:** Increase the button height to at least 44px by adjusting vertical padding. Change from `py-2` (8px top + 8px bottom = ~38px with text) to `py-3` (12px each) to achieve approximately 46px height.

---

### [HIGH] Footer links are too small for touch on mobile

- **Viewport:** 375px, 667x375
- **Section:** Footer
- **Component:** Footer navigation links and contact links
- **Description:** All footer links fail the 44px minimum touch target height. The worst offenders are the "Links" section navigation items (About Us, Services, Properties, Book Consultation) at only 20px height with no padding, and the email/Instagram contact links at 24px height. The phone number links are 40px -- close but still under 44px. Footer links in the "Links" column are stacked tightly with minimal spacing between them, making mis-taps likely.
- **Screenshot:** `mobile-375-footer.png`
- **Suggested Fix:** Add vertical padding or minimum height to all footer links. For the "Links" column, add `py-2` (8px each side) to each link to bring them to ~36px, or better yet `py-3` for 44px+ targets. For contact links (email, Instagram), wrap them in larger tap areas with `py-3`. Consider increasing the `leading` (line-height) of footer link containers as well.

---

### [HIGH] "Discover our services" link in About section lacks adequate touch target

- **Viewport:** 375px, 768px, 1280px (all viewports)
- **Section:** About (`#nosotros`)
- **Component:** "Discover our services" text link
- **Description:** This important CTA link is rendered as a plain text link at 202x24px across all viewports. At 24px height, it fails the 44px touch target minimum on mobile and tablet. On desktop, while not a touch concern, the small clickable area makes it harder to interact with than necessary for a primary CTA element.
- **Screenshot:** `mobile-375-about.png`, `tablet-768-about.png`
- **Suggested Fix:** Either convert this to a button-style element with at least 44px height, or increase the link's padding to create a larger interactive area. A styled link with `py-3 px-4 inline-block` would achieve appropriate sizing while maintaining the current visual appearance.

---

### [MEDIUM] Property listing action links ("View on Airbnb", "View Listing") slightly undersized

- **Viewport:** 375px, 667x375
- **Section:** Properties (`#propiedades`)
- **Component:** Property card CTA buttons/links
- **Description:** The "View on Airbnb" and "View Listing" action links on property cards measure 162x40px and 142x40px respectively. While close to the 44px target, they fall 4px short on height. These are the primary conversion elements for each property card.
- **Screenshot:** `mobile-375-properties.png`
- **Suggested Fix:** Increase vertical padding slightly to bring the height to 44px minimum. A small increase from `py-2` to `py-2.5` or `py-3` should suffice.

---

### [MEDIUM] Hero stat label text at 10px is very small on mobile

- **Viewport:** 375px
- **Section:** Hero
- **Component:** Stats card labels ("Occupancy", "Rating", "Income") in the floating dashboard card
- **Description:** The automated scan detected the stat labels ("Occupancy", "Rating", "Income") in the hero floating card at 10px font size. While the card is a decorative/illustrative element rather than primary content, the 10px text is technically below the generally recommended 12px minimum for readability. The labels appear readable in context due to the @2x device pixel ratio on mobile, but users with vision impairments may struggle.
- **Screenshot:** `mobile-375-hero.png`
- **Suggested Fix:** Increase the stat labels to at least 11-12px font size. This is a minor readability improvement given the card is illustrative, not functional.

---

### [MEDIUM] Landscape viewport (667x375) hero section does not show dashboard card

- **Viewport:** 667x375 (iPhone SE landscape)
- **Section:** Hero
- **Component:** Floating dashboard card and video background
- **Description:** In landscape orientation at 667x375, the hero section shows the text overlay ("Your Property, Our Passion") and description text, but the floating dashboard illustration card is pushed below the fold and the video background is barely visible. The hero effectively loses its visual impact in landscape mode. The user sees primarily text on a light background with no visual hook. The "Discover More" button and scroll indicator are also not visible above the fold.
- **Screenshot:** `landscape-667x375-hero.png`
- **Suggested Fix:** For short viewports (height < 500px), consider reducing the hero's `min-h-screen` to `min-h-[50vh]` or similar, repositioning the dashboard card to appear beside the text instead of below it, or reducing vertical padding/margins to fit more content above the fold.

---

### [MEDIUM] Booking section paragraph text is too wide on tablet and desktop

- **Viewport:** 768px, 1280px
- **Section:** Booking (`#agendar`)
- **Component:** Body text paragraph ("Prefer to contact us directly?") and surrounding description
- **Description:** On tablet (768px) and desktop (1280px), the body paragraph text in the booking section reaches approximately 92-94 characters per line, exceeding the recommended maximum of ~75-80 characters for optimal readability. The `max-w-2xl` constraint on the description paragraph works well, but the contact section below it spans the full container width.
- **Screenshot:** `tablet-768-booking.png`, `desktop-1280-booking.png` (reference `desktop-1280-booking.png`)
- **Suggested Fix:** Add `max-w-2xl mx-auto` to the "Prefer to contact us directly?" text container to constrain the line length, consistent with the paragraph above it.

---

### [MINOR] Language switcher buttons (EN/ES) are slightly below touch target at 43x32px

- **Viewport:** 375px, 768px, 1280px (all viewports)
- **Section:** Navigation (header)
- **Component:** EN/ES language toggle buttons
- **Description:** The language switcher buttons measure 43x32px. While the width is borderline acceptable, the 32px height is below the 44px touch target minimum. On mobile this is a moderate usability concern; on desktop it is negligible.
- **Screenshot:** `mobile-375-hero.png` (header visible), `desktop-1280-header-detail.png`
- **Suggested Fix:** Increase the button height to 44px by adding vertical padding, or increase the overall toggle pill height. This can be done without significantly changing the visual design.

---

### [MINOR] Lenis scroll-to-top button overlaps content at bottom-left corner

- **Viewport:** 375px, 768px, 667x375 (all viewports)
- **Section:** Global (all sections when scrolled)
- **Component:** Lenis "N" scroll indicator button (fixed, bottom-left)
- **Description:** A circular button with the letter "N" (Lenis branding/scroll indicator) appears fixed at the bottom-left corner of the viewport. At mobile widths, this button occasionally overlaps section content, particularly at the bottom of the About section stats cards and at the footer. It is 38px in diameter and sits at approximately 16px from the left edge and bottom. While not blocking critical interactions, it is visually distracting and can interfere with content reading.
- **Screenshot:** Visible in `mobile-375-about.png`, `mobile-375-services.png`, `mobile-375-team.png` (bottom-left corner in all)
- **Suggested Fix:** Consider hiding this Lenis indicator in production, or repositioning it to the bottom-right where it is less likely to overlap left-aligned content, or making it auto-hide after initial load.

---

### [MINOR] Footer layout is single-column stacked on mobile without visual separators

- **Viewport:** 375px
- **Section:** Footer
- **Component:** Footer columns (Brand, Contact, Links)
- **Description:** On mobile (375px), the footer stacks into a single column, which is correct behavior. However, the three content groups (brand description, contact info, links) lack visual separation. They flow into each other with only whitespace between them. The contact section heading "Contact" and links section heading "Links" help, but additional visual hierarchy or dividers would improve scannability.
- **Screenshot:** `mobile-375-footer.png`
- **Suggested Fix:** Add horizontal dividers (`<hr>`) or increased vertical spacing between the three footer groups on mobile to create clearer visual separation. Alternatively, add subtle background color variation to alternate sections.

---

## Viewport-by-Viewport Summary

### 375px (Mobile - iPhone SE)

| Section | Status | Notes |
|---------|--------|-------|
| Header/Nav | Pass | Hamburger menu correctly shown, language switcher visible |
| Hero | Pass (minor) | Stat labels at 10px are small; overall layout is good |
| About | Pass | Content stacks properly, stats cards in 2-col grid |
| Team | Pass | Team members stack vertically, images and text scale well |
| Services | FAIL | Accordion items overflow viewport by 49px, causing page horizontal scroll |
| Properties | Pass (issues) | Cards stack vertically; filter buttons and carousel controls undersized |
| Booking | Pass | CTA button and contact options layout correctly |
| Work With Us | Pass | Centered layout, CTA button properly sized |
| Footer | Pass (issues) | Stacked layout OK; link touch targets too small |

### 768px (Tablet - iPad)

| Section | Status | Notes |
|---------|--------|-------|
| Header/Nav | Pass | Full desktop nav with links + CTA button shown correctly |
| Hero | Pass | Good layout, dashboard card positioned below text |
| About | Pass | Two-column layout works well with stats |
| Team | Pass | Side-by-side team members with adequate spacing |
| Services | Pass | Accordion items fit within viewport, no overflow |
| Properties | Pass (issues) | Two-column grid; filter buttons and carousel controls still undersized |
| Booking | Pass (minor) | Line length slightly long at ~92 chars/line |
| Work With Us | Pass | Centered CTA layout, good proportions |
| Footer | Pass | Three-column layout, all content visible |

### 1280px (Desktop - Standard Laptop)

| Section | Status | Notes |
|---------|--------|-------|
| Header/Nav | Pass | Full navigation, CTA button, language switcher -- all correct |
| Hero | Pass | Two-column layout with video background, dashboard card positioned well |
| About | Pass | Clean two-column layout with stats card on right |
| Team | Pass | Side-by-side team member cards with ample spacing |
| Services | Pass | Accordion fits well within max-w-4xl container |
| Properties | Pass | Three-column property grid, images load properly |
| Booking | Pass (minor) | Line length borderline at ~94 chars/line |
| Work With Us | Pass | Centered layout with good visual hierarchy |
| Footer | Pass | Three-column footer, all links and content visible |

### 667x375 (iPhone SE Landscape)

| Section | Status | Notes |
|---------|--------|-------|
| Header/Nav | Pass | Hamburger menu shown (correct for this width) |
| Hero | Medium | Dashboard card pushed below fold; hero loses visual impact |
| About | Pass | Content readable, stats visible |
| Team | Pass | Team cards stack, images scale correctly |
| Services | Pass | No horizontal overflow at this width |
| Properties | Pass (issues) | Cards stack; touch targets still undersized |
| Booking | Pass | Content fits viewport |
| Work With Us | Pass | CTA visible and accessible |
| Footer | Pass | Single-column stack, links accessible |

---

## Test Evidence

All screenshots are saved in `/docs/audits/screenshots/`. Key files:

**Full page captures:**
- `mobile-375-fullpage.png` -- Full page at 375px (shows overflow)
- `tablet-768-fullpage.png` -- Full page at 768px
- `desktop-1280-fullpage.png` -- Full page at 1280px
- `landscape-667x375-fullpage.png` -- Full page at 667x375

**Section-by-section at each viewport:**
- `{viewport}-{section}.png` (e.g., `mobile-375-hero.png`, `tablet-768-services.png`)

**Specialized captures:**
- `mobile-375-services-expanded.png` -- Services accordion expanded state
- `desktop-1280-header-detail.png` -- Desktop navigation close-up

**Raw data:**
- `audit-data.json` -- Complete automated test data with measurements

---

## Prioritized Recommendations (Top 3)

1. **Add `overflow-hidden` to the Services section** -- This single-line CSS change eliminates the critical horizontal scroll issue at 375px that affects every mobile visitor. Highest impact, lowest effort.

2. **Increase all touch targets to 44px minimum** -- The property carousel controls (32x32 arrows, 8x8 dots), filter buttons (38px height), footer links (20-24px height), and "Discover our services" link (24px height) all need increased tap areas. This is a WCAG 2.5.8 compliance requirement and directly impacts mobile usability for the majority of visitors.

3. **Add `overflow-x: hidden` to the `<html>` or `<body>` element** -- As a safety net, adding `overflow-x: hidden` at the page level prevents any future component overflow from creating a horizontal scrollbar. This is a common best practice for single-page applications. Place in `globals.css`: `html, body { overflow-x: hidden; }`.
