# UX/Interactions Audit
**Date:** 2026-02-07
**URL:** http://localhost:3000
**Viewport:** 1280px (desktop) + 375px (mobile)
**Auditor:** Automated Playwright + Manual Screenshot Review

## Summary

The Hostmate Costa Rica site is a polished single-page application with generally good UX fundamentals. The language switcher works correctly, the accordion component is well-built with proper ARIA attributes, and navigation scroll behavior functions. However, there are several notable issues: a **critical mobile horizontal overflow** caused by decorative elements and property cards bleeding outside the viewport, **accordion buttons lacking pointer cursor** which undermines their perceived clickability, **no active section indicator in the navigation** during scrolling, **carousel arrow and dot targets that are too small for touch**, and **several sections unreachable from the nav** (Team, Booking, Work With Us). The nav is `position: fixed` but loses its sticky behavior after the hero card overlaps it on scroll.

---

## Issues

### [critical] Mobile Horizontal Overflow at 375px

- **Section:** Global
- **Component:** Page layout / decorative elements + property cards
- **Description:** At 375px mobile viewport, the page has horizontal scroll (scrollWidth: 424px vs clientWidth: 375px, overflowing by 49px). The overflow persists across all sections. The primary culprits are:
  1. Decorative gradient orbs with fixed `w-[500px]` and `w-[600px]` sizes that extend past the viewport boundary (overflowing by up to 125px).
  2. Property cards within the properties section have a fixed width that causes them to extend 49px beyond the viewport when displayed in mobile single-column layout.
  3. A `w-96` (384px) decorative element in the properties background overflows by 49px.
- **Screenshot:** `screenshots/mobile-fullpage-baseline.png`, `screenshots/mobile-properties.png`
- **Suggested Fix:** Add `overflow-x: hidden` to the `<body>` or each section's outer wrapper. Alternatively, constrain decorative gradient orbs using `max-w-full` or scope them within a container that has `overflow: hidden`. For property cards, ensure they respect the container width on mobile (e.g., `max-w-full` or `w-full` within their grid cell).

---

### [high] Accordion Buttons Missing Pointer Cursor

- **Section:** Services (#servicios)
- **Component:** ServiceAccordionItem buttons
- **Description:** All 8 service accordion buttons display `cursor: default` instead of `cursor: pointer`. While the buttons are functional (clicking toggles content), the lack of a pointer cursor fails to communicate interactivity. Users may not realize these items are expandable, especially since the chevron icon is subtle. This was confirmed via computed style inspection: all accordion buttons report `cursor: default`.
- **Screenshot:** `screenshots/desktop-services-section.png`, `screenshots/desktop-accordion-closed.png`
- **Suggested Fix:** Add `cursor-pointer` to the button element's className in `components/Services.tsx` line 90, or add a global CSS rule: `button { cursor: pointer; }`.

---

### [high] No Active Section Indicator in Navigation

- **Section:** Navigation (header)
- **Component:** Nav links
- **Description:** When scrolling through different sections of the page, the navigation links do not update to indicate which section is currently in view. All three nav links (About, Services, Properties) remain the same muted gray color (`rgb(100, 116, 139)`) regardless of scroll position. This was confirmed by comparing computed styles at the top of the page vs. when scrolled to the Services section -- the color, font-weight, and class names are identical. Users lose their sense of position within the long single-page layout.
- **Screenshot:** `screenshots/desktop-nav-scrolled.png`
- **Suggested Fix:** Implement an Intersection Observer that watches each section and applies an active class (e.g., `text-foreground` or `text-primary`) to the corresponding nav link when its section enters the viewport. This is a common pattern for single-page navigation and significantly improves wayfinding.

---

### [high] Missing Navigation Links for Team, Booking, and Work With Us Sections

- **Section:** Navigation (header)
- **Component:** Nav links array
- **Description:** The navigation only includes links to 3 of the 6 scrollable sections: About (#nosotros), Services (#servicios), and Properties (#propiedades). The Team (#equipo), Booking (#agendar), and Work With Us (#trabaja-con-nosotros) sections have no corresponding nav links, making them undiscoverable except by scrolling. The "Book Consultation" CTA in the nav opens an external Calendly link (in a new tab) rather than scrolling to the on-page booking section, which may confuse users who expect it to navigate within the page.
- **Screenshot:** `screenshots/desktop-hero-baseline.png` (nav visible)
- **Suggested Fix:** Consider adding at least a "Team" or "Contact" link to the navigation. If the on-page booking section is intended to be a landing zone, the nav CTA could scroll to #agendar first, with the Calendly link available within that section. Alternatively, keep the external link behavior but add a visual indicator (external link icon) to signal it opens a new tab.

---

### [high] Mobile Menu Does Not Prevent Background Scrolling

- **Section:** Navigation
- **Component:** Mobile menu overlay
- **Description:** When the mobile hamburger menu is open, the page body remains scrollable (`overflow: visible` on body). This means users can accidentally scroll the page content behind the open menu. The menu overlay has `z-index: 50` but no background overlay to indicate modal context. Content is visible beneath the menu drawer.
- **Screenshot:** `screenshots/mobile-menu-open-detail.png`
- **Suggested Fix:** When the mobile menu opens, apply `overflow: hidden` to the `<body>` element to prevent background scrolling. Add a semi-transparent backdrop overlay behind the menu to communicate the modal context. Restore scrolling when the menu closes.

---

### [medium] Carousel Navigation Arrows and Dots Are Too Small for Touch

- **Section:** Properties (#propiedades)
- **Component:** ImageCarousel arrows and dots
- **Description:** The image carousel left/right navigation arrows are 32x32px (below the 44x44px WCAG minimum touch target). The carousel indicator dots are only 8x8px (active dot is 16x8px). These targets are extremely difficult to tap on mobile devices. Additionally, the carousel arrows are hidden by default and only appear on `group-hover:opacity-100`, which means they are **completely invisible on touch devices** where there is no hover state.
- **Screenshot:** `screenshots/mobile-property-card-detail.png`
- **Suggested Fix:**
  1. Increase arrow button size to at least 44x44px (the visual icon can remain smaller, but the tap target should be larger -- use padding).
  2. Make arrows always visible on mobile (or add swipe gesture support).
  3. Increase dot size to at least 12x12px with adequate spacing for touch.
  4. Consider adding `@media (hover: none)` to always show arrows on touch devices.

---

### [medium] Language Switcher Buttons Below Minimum Touch Target

- **Section:** Navigation (header)
- **Component:** LanguageSwitcher (EN/ES buttons)
- **Description:** The EN and ES language toggle buttons measure approximately 43x32px (EN) and 41x32px (ES), both below the 44x44px minimum recommended touch target size. On mobile, these compact buttons may be difficult to tap accurately. The buttons do function correctly -- switching from EN to ES properly translates all page content including navigation, headings, body text, and CTAs.
- **Screenshot:** `screenshots/mobile-hero-baseline.png`
- **Suggested Fix:** Increase the padding on the language switcher buttons so the touch target is at least 44x44px. The visual presentation can remain compact using inner styling, but the clickable area should be larger.

---

### [medium] Filter Buttons Below Minimum Touch Target Height

- **Section:** Properties (#propiedades)
- **Component:** FilterButton
- **Description:** The property filter buttons (All, Entire Home, Condominium) measure 38px in height, below the 44px minimum. The "All" filter is only 49x38px. These buttons function correctly (clicking filters the property cards with smooth animation) but are slightly too small for comfortable mobile tapping.
- **Screenshot:** `screenshots/desktop-properties-section.png`, `screenshots/mobile-properties.png`
- **Suggested Fix:** Increase `py-2` to `py-2.5` or `py-3` on the FilterButton component to bring height above 44px.

---

### [medium] Nav Links and Logo Below Minimum Touch Target Height

- **Section:** Navigation (header)
- **Component:** Desktop nav links, logo
- **Description:** The desktop navigation links (About, Services, Properties) measure approximately 46-79px wide but only 24px tall. The "hostmate" logo link is 89x28px. While these are primarily desktop elements, the small height makes them difficult targets even with a mouse, and on tablets in desktop-like viewports they would be challenging to tap.
- **Screenshot:** `screenshots/desktop-hero-baseline.png`
- **Suggested Fix:** Increase the padding around nav links (e.g., add `py-2` for at least 40px height). The logo link could use `py-1` to increase its hit area.

---

### [medium] "Discover our services" Link Has No Hover Feedback

- **Section:** About (#nosotros)
- **Component:** "Discover our services" text link
- **Description:** The "Discover our services" link at the bottom of the About section has no visible hover state change. Both before and after hover, the color remains `rgb(26, 26, 46)` and the text-decoration remains `none`. The link does have a small arrow icon, but no color change, underline, or other hover feedback to reinforce that it is interactive. The link itself works (scrolls to #servicios) and measures 202x24px but the 24px height is also below minimum target size.
- **Screenshot:** `screenshots/desktop-about-section.png`
- **Suggested Fix:** Add a hover state such as `hover:text-primary` or `hover:underline` to provide visual feedback. Consider increasing the link's click area with padding.

---

### [medium] Property Cards Lack Hover Cursor Feedback

- **Section:** Properties (#propiedades)
- **Component:** PropertyCard wrapper div
- **Description:** The property card containers have `cursor: auto` (default) rather than `cursor: pointer`. While the cards themselves are not fully clickable links (only the "View on Airbnb" / "View Listing" buttons are), the hover shadow effect (`hover:shadow-xl`) implies the entire card is interactive. This mismatch between visual hover feedback and cursor state can confuse users.
- **Screenshot:** `screenshots/desktop-property-card-hover.png`
- **Suggested Fix:** Either make the entire card clickable (wrapping in an anchor tag) or remove the card-level hover shadow to avoid implying the whole card is interactive. If keeping the shadow, add a subtle `cursor: pointer` or make it clear the CTA button is the action point.

---

### [medium] Keyboard Tab Order Skips Service Accordion Buttons

- **Section:** Services (#servicios)
- **Component:** Accordion buttons
- **Description:** During keyboard navigation testing (Tab key), the tab order jumped directly from the hero section links to the footer links, skipping all 8 service accordion buttons and the properties section entirely. While the accordion buttons do have `tabIndex=0` and proper `aria-expanded`/`aria-controls` attributes, and they respond correctly to Space/Enter when focused directly, the tab order appears to skip them during sequential keyboard navigation. This may be related to Framer Motion's `whileInView` animation not triggering in headless/offscreen contexts, causing the elements to remain in their `initial` state (opacity: 0).
- **Screenshot:** `screenshots/desktop-accordion-focused.png` (manually focused)
- **Suggested Fix:** Ensure animated elements have `visibility: visible` even before their entrance animation fires. Alternatively, use CSS animations for the entrance effect rather than Framer Motion's `initial={{ opacity: 0 }}` which can make elements unfocusable/untabbable when they have not yet animated into view. Consider using `initial={{ opacity: 0 }}` with `style={{ visibility: 'visible' }}` to allow keyboard access.

---

### [medium] "Ready to get started?" Card Arrow Button Has No Visible Text

- **Section:** About (#nosotros)
- **Component:** CTA arrow button in stats card
- **Description:** The About section contains a "Ready to get started? / Book a free consultation" card with an arrow button that links to Calendly. This button (48x48px) has an `aria-label="Book a free consultation on Calendly"` which is good for screen readers, but the visual presentation is just a small coral-colored circle with an arrow icon. It could be missed by sighted users as it does not look like a typical CTA button. The label "Book a free consultation" appears as text but is not visually connected to the arrow button.
- **Screenshot:** `screenshots/desktop-about-section.png`
- **Suggested Fix:** Consider making the entire "Ready to get started?" row clickable, or making the arrow button more prominent with a text label visible alongside it.

---

### [minor] Header Overlaps Hero Content on Scroll

- **Section:** Hero
- **Component:** Fixed navigation + hero floating card
- **Description:** The nav bar uses `position: fixed` at the top of the viewport. When the user scrolls down slightly, the hero's floating "Your Property" stats card overlaps with the navigation bar area. While the nav has a higher z-index and remains functional, the overlapping content creates a brief visual conflict during scrolling.
- **Screenshot:** `screenshots/desktop-nav-scrolled.png`
- **Suggested Fix:** Add top padding or margin to the hero section to account for the fixed nav height, or ensure the floating card has proper z-index layering relative to the nav.

---

### [minor] Mobile Accordion Expanded Text Gets Clipped

- **Section:** Services (#servicios)
- **Component:** ServiceAccordionItem expanded content (mobile)
- **Description:** When expanding a service accordion item on mobile (375px), the description text gets clipped at the right edge. The text "Your property will be listed on the ri..." is visibly truncated. This appears related to the accordion items overflowing their container (each button measures 406px wide on a 375px viewport, consistent with the mobile overflow issue).
- **Screenshot:** `screenshots/mobile-accordion-open.png`
- **Suggested Fix:** This will likely be resolved by fixing the critical mobile horizontal overflow issue. Ensure the accordion container and its children respect `max-w-full` constraints on mobile.

---

### [minor] Lenis Smooth Scroll Badge Visible in Bottom-Left Corner

- **Section:** Global
- **Component:** Lenis library debug badge
- **Description:** A small dark circular badge with an "N" letter is visible in the bottom-left corner of the page at all viewports (both desktop and mobile). This appears to be a Lenis smooth scroll library debug/branding indicator. While small, it is a non-functional visual element that may confuse users or appear unprofessional.
- **Screenshot:** Visible in `screenshots/desktop-hero-baseline.png`, `screenshots/mobile-hero-baseline.png` (bottom-left corner)
- **Suggested Fix:** Disable the Lenis debug badge in production. Check SmoothScroll.tsx for Lenis configuration options and set the debug/badge option to `false`. Alternatively, hide it via CSS: `[data-lenis-indicator] { display: none; }`.

---

### [minor] Skip Link Focus Style but Limited Utility

- **Section:** Global
- **Component:** Skip to main content link
- **Description:** The site has a "Skip to main content" link that becomes visible on Tab focus. However, since this is a single-page app where the hero IS the main content, the skip link has limited utility. It measures 193x40px (height below 44px target). The skip link does function -- it has proper focus styling and is properly positioned.
- **Screenshot:** N/A (only visible on keyboard focus)
- **Suggested Fix:** Consider making the skip link target the first section below the hero (e.g., #nosotros) rather than #main, so keyboard users can skip the hero video and decorative elements. Increase the link height to at least 44px.

---

### [minor] Mobile Menu Links Have Small Touch Targets

- **Section:** Navigation
- **Component:** Mobile nav menu links
- **Description:** The mobile menu navigation links (About, Services, Properties) measure 293x40px -- just below the 44px minimum height. The links do close the menu correctly on click and navigate to their respective sections. The "Book Consultation" CTA button within the mobile menu has proper sizing.
- **Screenshot:** `screenshots/mobile-menu-open-detail.png`
- **Suggested Fix:** Increase `py-2` to `py-3` on the mobile nav link elements in `components/Navigation.tsx` line 123.

---

### [minor] No Swipe Gesture Support on Property Image Carousel

- **Section:** Properties (#propiedades)
- **Component:** ImageCarousel
- **Description:** The property image carousel relies on arrow buttons and dot indicators for navigation. There is no swipe/drag gesture support for mobile users, which is the expected interaction pattern for image carousels on touch devices. Combined with the fact that arrows are hidden (hover-only), mobile users must rely on the small 8px dots to navigate between images.
- **Screenshot:** `screenshots/mobile-property-card-detail.png`
- **Suggested Fix:** Add touch swipe gesture support using Framer Motion's `drag` prop on the carousel container, or integrate a lightweight swipe detection library. This is especially important since the arrow buttons are invisible on touch devices.

---

## Summary Statistics

| Severity | Count |
|----------|-------|
| Critical | 1 |
| High     | 5 |
| Medium   | 7 |
| Minor    | 5 |
| **Total** | **18** |

## What Works Well

- **Language switching** is smooth, instant (no page reload), and translates all content comprehensively including nav links, headings, body text, CTAs, and property details.
- **Accordion component** has proper ARIA attributes (`aria-expanded`, `aria-controls`), responds to keyboard Space/Enter, and has smooth open/close animation via Framer Motion.
- **Property filter system** works correctly with animated transitions between filter states.
- **Smooth scroll behavior** via Lenis is properly integrated and nav links correctly scroll to their target sections.
- **Focus indicators** are present on most interactive elements (links show browser default outline, accordion has coral ring).
- **Heading hierarchy** is clean: h1 > h2 > h3 with no level skips.
- **External links** properly use `target="_blank"` with `rel="noopener noreferrer"`.
- **No JavaScript console errors** were detected during testing.
- **Hero background video** loads and plays correctly with `autoplay`, `muted`, and `loop` attributes, plus a poster image fallback.
- **CTA "Book Consultation" button** has a visible hover state change (background color shifts from dark coral to lighter coral).
