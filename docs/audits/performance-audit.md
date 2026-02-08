# Performance Audit
**Date:** 2026-02-07
**URL:** http://localhost:3000
**Environment:** Next.js 15.5.7 dev server (localhost) with Turbopack
**Auditor:** Playwright automated testing + source code analysis
**Viewport:** 1280x800 (primary), 390x844 (mobile verification)

## Summary

The site demonstrates solid performance fundamentals in several areas -- dynamic imports for below-fold sections, conditional video loading based on device/connection, IntersectionObserver-based lazy rendering, and proper GSAP cleanup patterns. However, there are **critical image optimization gaps** that undermine these efforts. The biggest issues are: (1) Next.js image optimization is entirely disabled via `unoptimized: true` in next.config.ts, (2) property images are served as uncompressed PNGs totaling 11MB, (3) the hero video at 9.6MB uses `preload="auto"` which eagerly downloads the entire file, and (4) property carousel images use raw `<img>` tags instead of the Next.js `<Image>` component. There are also 15 large blur filter elements that impact paint performance, and an unused `react-hook-form` dependency adding to the bundle.

## Metrics

- **Initial page load (networkidle):** ~15,714ms (dev server with Turbopack -- production will be faster)
- **Time to First Byte (TTFB):** 927ms (dev server overhead)
- **First Contentful Paint (FCP):** 2,120ms
- **DOM Content Loaded:** 1,376ms
- **Load event:** 2,513ms
- **Number of network requests:** 39
- **Total transfer size:** ~23.49 MB
- **HTML document size:** 115 KB (decoded), 23 KB (encoded/gzipped)
- **DOM elements:** 706
- **DOM max depth:** 15
- **CLS (Cumulative Layout Shift):** 0 (good)
- **Total page height:** 7,074px

### Largest Assets (Top 10)

| Asset | Size | Type |
|-------|------|------|
| Bg-video-optimized.mp4 | 9,820 KB | video |
| playa-pelada-1.png | 2,112 KB | image |
| become-nosara-1.png | 1,065 KB | image |
| casa-mafuaye-piscina.png | 796 KB | image |
| Julian.jpg | 192 KB | image |
| hero-poster-new.webp | 107 KB | image |
| Vanessa.jpg | 93 KB | image |
| Inter font (woff2) | 47 KB | font |

### Network Requests by Type

| Type | Count | Size |
|------|-------|------|
| media (video) | 2 | 19,641 KB |
| image | 6 | 4,364 KB |
| script | 27 | 4 KB |
| font | 1 | 47 KB |
| document | 1 | 23 KB |
| stylesheet | 2 | ~0 KB |

---

## Issues

### [CRITICAL] Next.js Image Optimization Completely Disabled

- **Section:** Entire site
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/next.config.ts`
- **Description:** The Next.js configuration sets `images: { unoptimized: true }`, which completely disables the built-in image optimization pipeline. This means no automatic WebP/AVIF conversion, no responsive srcset generation, no on-demand resizing, and no blur placeholders. This is the single largest performance issue on the site.
- **Impact:** All images are served at their original size and format. A user on a mobile device downloading the properties page will receive 1200x900 PNGs instead of appropriately-sized WebP images. This dramatically increases page weight and load times, especially on slower connections.
- **Evidence:** The audit confirmed that property images have `srcset: "no srcset"` and team images (which do use `next/image`) also show `srcset: "no srcset"` because the optimizer is disabled.
- **Suggested Fix:** This was likely set because the site uses `output: 'export'` for static deployment to GitHub Pages, which does not support the default Node.js image optimizer. The fix is to either: (a) use a third-party image optimization loader compatible with static export (e.g., Cloudinary, imgix, or a custom loader), (b) pre-optimize all images at build time using a script (sharp, imagemin) to generate WebP versions and multiple sizes, or (c) switch to Vercel hosting which supports the image optimizer natively.

---

### [CRITICAL] Property Images Served as Uncompressed PNGs (11 MB Total)

- **Section:** Properties (#propiedades)
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/lib/properties.ts` and `/root/website-templates/hostmate-costa-rica-v2/public/images/properties/`
- **Description:** All 11 property images are PNG format, totaling approximately 11 MB on disk. The largest single image is `playa-pelada-1.png` at 2.1 MB (1200x900 PNG). These are photographic images -- PNG is the worst format choice for photographs. The display size for property images at 1280px viewport is only 382x287 pixels, meaning images up to 1200px wide are being served for a ~400px display slot.
- **Impact:** Massive bandwidth waste. Converting to WebP at appropriate dimensions could reduce total property image payload from ~11 MB to under 500 KB (a ~95% reduction). This directly affects Largest Contentful Paint, page load time, and mobile data usage.
- **Image inventory:**

| File | Dimensions | Size | Display Size |
|------|-----------|------|-------------|
| playa-pelada-1.png | 1200x900 | 2.1 MB | 382x287 |
| casa-mafuaye-8.png | 1200x800 | 1.6 MB | 382x287 |
| casa-mafuaye-4.png | 1200x800 | 1.1 MB | 382x287 |
| casa-mafuaye-3.png | 1200x800 | 1.1 MB | 382x287 |
| become-nosara-1.png | 1141x760 (RGBA) | 1.1 MB | 382x287 |
| casa-mafuaye-5.png | 720x1008 | 862 KB | 382x287 |
| casa-mafuaye-piscina.png | 720x960 | 796 KB | 382x287 |
| casa-mafuaye-7.png | 720x1079 | 629 KB | 382x287 |
| casa-mafuaye-1.png | 720x480 | 433 KB | 382x287 |
| casa-mafuaye-6.png | 720x480 | 423 KB | 382x287 |
| casa-mafuaye-2.png | 720x480 | 413 KB | 382x287 |

- **Suggested Fix:** (1) Convert all property images from PNG to WebP format. (2) Resize to maximum 800px wide (sufficient for 2x retina at 400px display). (3) Generate multiple sizes (400w, 800w) for responsive loading. (4) Use the `<picture>` element or Next.js Image with a custom loader to serve appropriate sizes. Target: each image should be 30-80 KB in WebP format.

---

### [CRITICAL] Property Carousel Uses Raw `<img>` Tags Instead of Next.js Image

- **Section:** Properties (#propiedades)
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/components/Properties.tsx` (line 48-60, `ImageCarousel` component)
- **Description:** The property image carousel renders images using Framer Motion's `<motion.img>` element, which is a raw HTML `<img>` tag. This bypasses Next.js `<Image>` component entirely, losing all benefits: no lazy loading optimization, no srcset, no size optimization, no blur placeholder, no priority hints. While `loading="lazy"` and `decoding="async"` are manually added, there are no `width`/`height` attributes, which can cause CLS (though the `aspect-[4/3]` container mitigates this somewhat).
- **Impact:** Property images are the largest above-the-fold content after the hero video. Without proper optimization, they download at full size. The carousel also loads ALL 9 images for Casa Mafuaye upfront (even though only 1 is visible), because `loading="lazy"` on images inside a carousel with `position: absolute` may not prevent loading.
- **Suggested Fix:** Replace `<motion.img>` with either (a) a custom component that wraps Next.js `<Image>` with Framer Motion animation, or (b) at minimum, add explicit `width` and `height` attributes to prevent layout shifts. Ideally, implement true lazy loading for carousel images beyond the first visible one.

---

### [HIGH] Hero Video is 9.6 MB with `preload="auto"`

- **Section:** Hero
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/components/Hero.tsx` (line 275)
- **Description:** The hero background video (`Bg-video-optimized.mp4`) is 9.6 MB and uses `preload="auto"`, which instructs the browser to eagerly download the entire video file. The audit confirmed the video had buffered 16.7 seconds of its 24.9-second duration within seconds of page load. While the video is conditionally rendered only on desktop (good), and paused when out of viewport (good), the aggressive preloading competes with critical resources like CSS, fonts, and above-fold images for bandwidth.
- **Impact:** The 9.6 MB video download competes with initial page resources, potentially delaying FCP and LCP on slower connections. The WebM version is 26 MB (even worse), though MP4 is prioritized as the first `<source>`.
- **Suggested Fix:** (1) Change `preload="auto"` to `preload="metadata"` -- this loads only the video metadata (dimensions, duration) without downloading the full file. The video will then load progressively when playback begins. (2) Consider further compressing the video -- 9.6 MB for a 25-second background loop is high. Target 3-5 MB at 720p using H.264 with CRF 28-32. (3) Remove the `<link rel="preload" as="video">` from layout.tsx (line 48-54) since preloading a 9.6 MB asset is counterproductive.

---

### [HIGH] WebM Video File is 26 MB (Nearly 3x the MP4)

- **Section:** Hero
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/public/videos/Bg-video-optimized.webm`
- **Description:** The WebM fallback video is 26 MB, which is 2.7x larger than the MP4 version (9.6 MB). The naming suggests it was "optimized" but it is significantly larger. If any browser prefers WebM (which modern browsers do for VP9), it would download this massive file instead.
- **Impact:** While the MP4 source is listed first in the HTML (and most browsers will use it), this is a wasted 26 MB of storage and a risk for any browser that prefers WebM.
- **Suggested Fix:** Re-encode the WebM version using VP9 with appropriate quality settings to bring it below or near the MP4 size. Use: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -an output.webm`. If the WebM cannot be made smaller than the MP4, consider removing it entirely since MP4/H.264 has universal browser support.

---

### [HIGH] Team Member Photos are Oversized JPEGs Without Format Optimization

- **Section:** Team (#equipo)
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/components/TeamSection.tsx` (line 80-88)
- **Description:** Team member photos use Next.js `<Image>` component (good) but the optimization is disabled. `Vanessa.jpg` is 94 KB at 1150x1280 pixels, and `Julian.jpg` is 192 KB at 1280x794 pixels. Both are displayed in a circular frame at a maximum of 256x256 pixels (lg breakpoint). Even at 2x retina, only 512x512 pixels are needed. Julian's image (1280x794) is landscape orientation but displayed in a circle, meaning most of the image data is cropped and wasted.
- **Impact:** Approximately 3-4x more pixels than needed are being downloaded. With proper resizing and WebP conversion, these could be ~15-25 KB each instead of 94-192 KB.
- **Suggested Fix:** (1) Pre-crop and resize team photos to 512x512 pixels (sufficient for 2x retina). (2) Convert to WebP format. (3) The `sizes` attribute is correctly set (`(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px`), which would work well if the image optimizer were enabled.

---

### [HIGH] 15 Large CSS Blur Filter Elements Causing Paint Overhead

- **Section:** Multiple (Hero, About, Team, Properties, Booking, Work With Us)
- **Component:** Multiple components
- **Description:** The audit found 15 elements using CSS `blur()` filter with values ranging from 100px to 150px. These are decorative gradient orb elements used for ambient background effects across almost every section. Large blur values are expensive for the browser's compositor -- each blur operation requires multiple render passes proportional to the blur radius. On mobile devices with weaker GPUs, this can cause frame drops during scrolling.
- **Impact:** Paint performance during scrolling. Each section change triggers re-compositing of these large blurred elements. The combined effect of 15 such elements creates a cumulative paint cost.
- **Breakdown:**
  - Hero: 3 blur elements (120px, 120px, 150px)
  - About: 2 blur elements (150px, 150px)
  - Team: 2 blur elements (150px, 150px)
  - Properties: 2 blur elements (150px, 150px)
  - Booking: 2 blur elements (100px, 100px) + 1 backdrop-blur on nav
  - Work With Us: 1 blur element (120px)
  - Navigation: 1 backdrop-filter blur(16px)
- **Suggested Fix:** (1) Add `will-change: filter` or `transform: translateZ(0)` to force GPU compositing on blur elements. (2) Consider replacing CSS blur with pre-rendered blurred SVG or WebP images for the static orbs -- a 50 KB pre-blurred image is cheaper than real-time GPU blur computation. (3) Reduce blur values where possible (100px looks similar to 150px for ambient effects). (4) On mobile, these are conditionally hidden in some sections (Team) but not all -- apply the same pattern consistently.

---

### [MEDIUM] `react-hook-form` Dependency is Unused

- **Section:** Entire site (bundle size)
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/package.json` (line 19)
- **Description:** `react-hook-form` (version ^7.54.0) is listed as a production dependency, but the audit found zero `<form>` elements and zero `<input>` elements in the rendered page. The Booking section links to external Calendly rather than containing a form. No component imports from `react-hook-form`.
- **Impact:** Adds approximately 9-12 KB gzipped to the potential bundle. While tree-shaking may eliminate it if not imported, having it in dependencies means it gets installed and could be accidentally bundled.
- **Suggested Fix:** Remove `react-hook-form` from dependencies: `npm uninstall react-hook-form`.

---

### [MEDIUM] `split-type` Dependency Appears Unused

- **Section:** Entire site (bundle size)
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/package.json` (line 20)
- **Description:** `split-type` (version ^0.3.4) is listed as a production dependency. This library is typically used for text splitting animations (character-by-character, word-by-word reveals). No component in the codebase appears to use it -- the text animations use GSAP and Framer Motion directly on whole elements.
- **Impact:** Adds unnecessary weight to `node_modules` and potentially to the bundle if accidentally imported.
- **Suggested Fix:** Verify no usage with a codebase search, then remove: `npm uninstall split-type`.

---

### [MEDIUM] Video Preload Link in Layout Head Preloads 9.6 MB

- **Section:** Hero
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/app/layout.tsx` (lines 48-54)
- **Description:** The layout includes `<link rel="preload" href="/videos/Bg-video-optimized.mp4" as="video" type="video/mp4" media="(min-width: 1024px)" />`. While the media query correctly limits this to desktop viewports, preloading a 9.6 MB video is counterproductive. Preload hints are designed for critical resources that should be fetched with highest priority -- applying this to a background video means it competes with fonts, CSS, and JavaScript for bandwidth in the critical loading phase.
- **Impact:** On desktop, the browser will begin downloading the 9.6 MB video with high priority immediately, potentially delaying font loading and JavaScript hydration.
- **Suggested Fix:** Remove the video preload link entirely. The video element with `preload="metadata"` (after fixing the previous issue) will handle loading appropriately. Keep the poster image preload since that is a small, critical resource (107 KB).

---

### [MEDIUM] Mobile Horizontal Overflow from Decorative Elements

- **Section:** Hero and Services
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/components/Hero.tsx`, `/root/website-templates/hostmate-costa-rica-v2/components/Services.tsx`
- **Description:** At 390px mobile viewport, horizontal overflow was detected (scrollWidth: 424px vs clientWidth: 390px, a 34px overflow). The primary culprits are: (1) Hero gradient orbs extending beyond viewport -- the `w-96` (384px) orb positioned at `left-10` (40px) extends to 424px, exceeding 390px. (2) Services section accordion items are 408px wide, overflowing by 34px. (3) The hero's 600px centered orb extends from -105px to 495px.
- **Impact:** While the parent `overflow-hidden` may visually clip these elements, the document-level horizontal overflow creates a subtle horizontal scroll possibility and forces the browser to calculate a wider layout. This wastes compositor resources and can cause unexpected scroll behavior on some mobile browsers.
- **Suggested Fix:** (1) Ensure all parent containers have `overflow-hidden` applied reliably. (2) For the gradient orbs, use `max-w-full` or percentage-based widths on mobile viewports. (3) For the Services accordion, investigate why items are 408px at 390px viewport -- likely a padding/margin calculation issue with `px-4` (16px each side = 32px) and the accordion card internal padding.

---

### [MEDIUM] Booking Section Animated Orbs Run Continuously on Desktop

- **Section:** Booking (#agendar)
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/components/Booking.tsx` (lines 32-58)
- **Description:** The Booking section has two `motion.div` elements with infinite repeat animations (`repeat: Infinity`) that animate `x`, `y`, and `scale` properties continuously. While these are hidden on mobile (good), on desktop they run indefinitely even when the section is not visible. The 8-second and 10-second animation loops mean the browser's compositor is constantly repainting these elements.
- **Impact:** Continuous GPU usage even when the Booking section is scrolled out of view. While individually lightweight, combined with the 15 blur elements and other animations, this adds to cumulative compositor load.
- **Suggested Fix:** Use `whileInView` instead of `animate` for these orbs, so they only animate when the section is visible. Or use IntersectionObserver to toggle animation state.

---

### [MEDIUM] Framer Motion `whileInView` Used Without `amount` Threshold

- **Section:** Multiple (About, Services, Properties, Booking, Work With Us)
- **Component:** Multiple components
- **Description:** Many Framer Motion `whileInView` animations use `viewport={{ once: true }}` without specifying an `amount` threshold. This means animations trigger as soon as even 1 pixel of the element enters the viewport. Combined with aggressive intersection margins, many animations may fire before the user can see them, wasting animation computation.
- **Impact:** Minor -- animations fire slightly early but since `once: true` is set, they only run once. The bigger concern is perceptual: users may miss the entrance animation if it completes before they scroll the element into clear view.
- **Suggested Fix:** Add `viewport={{ once: true, amount: 0.3 }}` to ensure at least 30% of the element is visible before the animation fires.

---

### [MEDIUM] No `will-change` Hints on Animated Elements

- **Section:** Entire site
- **Component:** Multiple components
- **Description:** The GPU acceleration check found zero elements with `will-change` CSS property set. While modern browsers are generally good at promoting elements to their own compositor layer, explicitly declaring `will-change: transform` on elements that will be animated helps the browser optimize ahead of time. The site has 45 elements with inline transform styles (from Framer Motion) and GSAP animations.
- **Impact:** Minor on modern browsers but can cause frame drops during animation start on older devices as the browser must promote the element to a GPU layer just-in-time.
- **Suggested Fix:** For Framer Motion elements, this is generally handled automatically. For GSAP-animated elements, add `will-change: transform, opacity` to elements that will be animated, or let GSAP handle it via `gsap.config({ force3D: true })`.

---

### [MINOR] Hero Poster Fallback Uses `background-image` Instead of `<img>`

- **Section:** Hero
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/components/Hero.tsx` (lines 298-304)
- **Description:** The poster fallback (shown before video loads or on non-video devices) uses CSS `background-image` via inline style. This means the browser cannot apply any lazy loading, priority hints, or image optimization. It also means the image is not discoverable by preload scanners until CSS is parsed.
- **Impact:** Minor since the poster is only 107 KB and is preloaded via a `<link>` tag in the head. However, using `background-image` bypasses the browser's native image loading pipeline.
- **Suggested Fix:** Consider replacing with an actual `<img>` or Next.js `<Image>` element with `priority` prop for the poster fallback, positioned absolutely to achieve the same visual effect as `background-image`.

---

### [MINOR] Font Loading: 33 Font Entries Registered (Mostly Unused Variants)

- **Section:** Entire site
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/app/layout.tsx`
- **Description:** The `document.fonts` API reports 33 registered font entries, though only 4 are actually loaded (Inter 400, 500, 600, 700). The remaining 29 are registered but unloaded -- these include duplicate entries per weight (likely different unicode ranges from Next.js font optimization) and unused fallback fonts (`Inter Fallback`, `__nextjs-Geist`, `__nextjs-Geist Mono`). The Inter font is properly configured with `display: "swap"` and `preload: true`.
- **Impact:** Minimal runtime impact since unused fonts are not downloaded. The Geist font entries are Next.js defaults that could add slight overhead.
- **Suggested Fix:** This is largely a non-issue for runtime performance. The font configuration is well done with swap display and preloading. No action required.

---

### [MINOR] `suppressHydrationWarning` Used Extensively (Potential Indicator of SSR Mismatches)

- **Section:** Entire site
- **Component:** Multiple components
- **Description:** While `suppressHydrationWarning` does not directly impact performance, its extensive use (on virtually every text element) suggests there are systematic SSR/client hydration mismatches, likely from the language switching system. If hydration mismatches are frequent, React must re-render those subtrees on the client, adding to Time to Interactive.
- **Impact:** Minor -- React's hydration reconciliation for text content is fast, but widespread mismatches force unnecessary DOM operations during the critical hydration phase.
- **Suggested Fix:** Investigate whether the language system can be refactored to avoid hydration mismatches (e.g., using cookies or URL-based language detection that works on both server and client). Alternatively, this may be an intentional trade-off for the bilingual UX.

---

### [MINOR] `become-nosara-1.png` Uses RGBA (Alpha Channel) Unnecessarily

- **Section:** Properties
- **Component:** `/root/website-templates/hostmate-costa-rica-v2/public/images/properties/become-nosara-1.png`
- **Description:** This property image is a 1141x760 PNG with RGBA color mode (4 channels), meaning it includes an alpha transparency channel. For a photograph, transparency is almost certainly unnecessary. The alpha channel adds approximately 25% more data to the file.
- **Impact:** The image is 1.1 MB; removing the alpha channel could reduce it to ~850 KB (still too large as a PNG, but relevant).
- **Suggested Fix:** Flatten the alpha channel and convert to WebP as part of the overall image optimization effort.

---

## Positive Findings (What is Done Well)

These aspects of performance are implemented correctly and should be preserved:

1. **Dynamic imports for below-fold sections** (`page.tsx`): All sections below the hero use `next/dynamic` with loading skeletons, reducing initial JS bundle size.

2. **Conditional video rendering on mobile** (`Hero.tsx`): Video is not rendered on mobile devices (saves bandwidth), respects `prefers-reduced-motion`, and checks connection quality via Network Information API.

3. **IntersectionObserver-based video pause** (`Hero.tsx`): Video pauses when scrolled out of viewport, saving CPU/GPU/battery.

4. **Lenis smooth scroll is mobile-conditional** (`SmoothScroll.tsx`): Lenis and GSAP ScrollTrigger are only loaded on desktop (768px+), saving mobile users from processing these heavy libraries.

5. **GSAP animations use GPU-friendly properties**: Animations primarily use `opacity`, `scale`, `x`, and `y` transforms -- all GPU-accelerated. No animations trigger layout (no `width`, `height`, `top`, `left` animations detected).

6. **Proper GSAP cleanup** (`Hero.tsx`): `gsap.context()` with `ctx.revert()` in cleanup is used correctly, preventing memory leaks.

7. **Lenis cleanup is thorough** (`SmoothScroll.tsx`): Both the GSAP ticker callback and Lenis instance are properly destroyed on unmount.

8. **Font optimization**: Inter font uses `display: "swap"` and `preload: true`, with only necessary weights (400, 500, 600, 700). Single woff2 file (47 KB) is preloaded.

9. **LazySection component** (`LazySection.tsx`): A well-implemented IntersectionObserver wrapper with 200px rootMargin for pre-loading.

10. **No console errors**: Zero JavaScript errors detected during full page lifecycle.

11. **No failed network requests**: All resources returned 200 status.

12. **Mobile-specific animation reduction**: Multiple components (Services, Team, Booking) reduce or eliminate animations on mobile viewports.

13. **Preconnect to Calendly**: `<link rel="preconnect">` and `<link rel="dns-prefetch">` for Calendly are in place, reducing connection latency when users click booking links.

14. **No Calendly embed loaded on page**: The booking section uses external links to Calendly rather than embedding the Calendly widget, avoiding the significant performance cost of loading a third-party iframe.

15. **Throttled scroll handler** (`Navigation.tsx`): Uses `requestAnimationFrame` for scroll-based state changes, preventing layout thrash.

---

## Priority Summary

| Severity | Count | Key Issues |
|----------|-------|------------|
| Critical | 3 | Image optimization disabled, PNGs instead of WebP, raw img tags |
| High | 3 | Video preload strategy, WebM oversized, blur filter overhead |
| Medium | 5 | Unused deps, mobile overflow, continuous animations, no will-change |
| Minor | 4 | Poster implementation, font entries, hydration warnings, RGBA image |

## Top 3 Highest-Impact Recommendations

1. **Enable image optimization or implement a build-time image pipeline.** Converting property images from PNG to WebP at appropriate dimensions would reduce image payload from ~11 MB to under 500 KB. This is the single highest-impact change possible.

2. **Change video preload strategy from "auto" to "metadata" and remove the preload link.** This prevents the browser from eagerly downloading 9.6 MB of video data, freeing bandwidth for critical resources (fonts, CSS, JS hydration).

3. **Replace raw `<img>` tags in the property carousel with Next.js `<Image>` or a properly optimized custom solution.** This ensures responsive images with appropriate srcset and proper lazy loading for carousel images beyond the first visible one.

---

## Screenshots Reference

All screenshots captured during this audit are stored in:
`/root/website-templates/hostmate-costa-rica-v2/docs/audits/screenshots/`

Key screenshots for this audit:
- `01-initial-load-1280.png` -- Desktop initial load at 1280px
- `02-full-page-1280.png` -- Full page desktop screenshot
- `03-mobile-390.png` -- Mobile viewport (390px)
- `04-properties-section.png` -- Properties section showing image carousel
- `05-team-section.png` -- Team section showing oversized photos
- `06-booking-section.png` -- Booking section
- `07-hero-section.png` -- Hero section with video
- `08-mobile-overflow-390.png` -- Mobile overflow evidence
- `10-mobile-fullpage-390.png` -- Full mobile page
