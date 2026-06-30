# Project Assets

Use this folder for source-controlled assets that Astro should process and fingerprint.

- `brand/`: logo source files, seal artwork, monograms, and future generated brand marks.
- `images/`: local photos and editorial imagery used by Astro components.
- `icons/`: reusable raster or source icon assets.

Keep files that must be served verbatim, such as favicons, in `public/`.

Current placeholder stock assets:

- `images/flower-shop-bouquet-handoff.jpg`: temporary arrival-section image from Unsplash by Ritupon Baishya, used under the Unsplash License. Replace with a real Blumen Jelena owner/shop photo when available.

## Site Experience TODO

### Priority 1 - Hook and clarity

- Add a mobile-visible scroll cue for the envelope opening.
- Make the invitation-to-story transition less abrupt with a bloom or petal bridge.
- Add clearer active scene feedback in the story section on desktop and mobile.
- Add one stronger trust/contact moment before the final contact cards.

### Priority 2 - Floral motion details

- Add subtle petal or leaf drift during the envelope reveal, disabled for reduced motion.
- Add scroll-tied flower growth or unfolding detail in the story section.
- Add small hover and focus animations to contact tiles and header links.
- Improve wax seal realism with matching crack fragments or a pressed highlight.

### Priority 3 - Content and conversion polish

- Add seasonal bouquet or occasion highlights using local imagery.
- Add a testimonial or "customers come for..." strip.
- Add a small Instagram or gallery teaser for fresh arrangements.
- Make phone and address actions feel more prominent on mobile.

### Guardrails

- Keep motion elegant, slow, and tactile rather than flashy.
- Preserve reduced-motion behavior.
- Avoid heavy WebGL or large image sequences until local assets are optimized.
- Keep contact actions always easy to find.

## Tools We Can Use

- `GSAP + ScrollTrigger`: recommended primary animation tool; already installed and used.
- `Astro components + CSS`: recommended default for layout, brand styling, and performance.
- `Shadcn UI`: optional if we add Tailwind and need accessible UI primitives such as dialog, carousel, accordion, or form elements.
- `Material UI`: possible only if we add React, but not recommended for this floral brand site because its Material Design defaults may fight the custom visual identity.
- `Tailwind`: optional only if future work adopts Shadcn or utility-first styling; current modular CSS is enough for now.
- `Lucide icons`: good optional addition for phone, map, mail, arrows, and gallery controls.

## Assets The User Can Provide

- Real storefront photos, inside-shop photos, bouquet closeups, and seasonal arrangements.
- Transparent PNG/WebP flower cutouts for petal drift or bloom animations.
- Final logo/monogram SVGs and wax seal variants.
- Instagram/gallery images with permission to use.
- Testimonials, opening hours, delivery/pickup rules, and preferred calls to action.
- Brand references: colors, fonts, packaging, ribbons, paper textures, and shop signage.

## References

- Astro framework components and hydration: https://docs.astro.build/en/guides/framework-components/
- Astro styling and Tailwind support: https://docs.astro.build/en/guides/styling/
- GSAP ScrollTrigger documentation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Shadcn UI Astro installation: https://ui.shadcn.com/docs/installation/astro
- Material UI React installation: https://mui.com/material-ui/getting-started/installation/
