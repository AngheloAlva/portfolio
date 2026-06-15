# Design system & template reference

This portfolio was bootstrapped from a wireframe-stage Next.js template (neutral
palette, hairline rails, and a WebGL ASCII dither shader). This document keeps the
template's technical reference so the underlying system stays documented even as the
content becomes personal.

## Design tokens

Tokens live in `app/globals.css` and are exposed to Tailwind v4 through the
`@theme inline` mapping.

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --border: #e5e5e5;
  --ring: #0066ff;
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --muted: #171717;
  --muted-foreground: #a3a3a3;
  --border: #262626;
}
```

The neutral scale (`neutral-50` → `neutral-950`) is also re-declared inside
`@theme inline` and is used by the always-inverted footer card.

### Color roles

- `--background` / `--foreground` — Page background and text
- `--muted` / `--muted-foreground` — Subtle surfaces and secondary text
- `--border` — Hairline rails and dividers
- `--ring` — Focus rings (blue accent)
- `neutral-*` — Always-on greyscale, used by the inverted footer

### Typography

- **Sans:** Geist Sans
- **Mono:** Geist Mono (used for eyebrow labels and pill CTAs)

### Layout conventions

- Outer shell: `border-x border-border` rails inside a `max-w-[1440px]` container
- Section padding: `p-6 sm:p-10 lg:p-14`
- Card-style anchor padding (footer, final CTA): `p-3 sm:p-4 lg:p-6` outer
- Decorative `<SectionCorners />` ticks at major dividers

## Dither shader

`components/dither-shader.tsx` is an interactive, theme-aware WebGL shader (OGL). It
accepts two optional props:

- `variant: "hero" | "cta"` — `cta` uses a denser grid and slower time scale, suited
  for smaller card-sized canvases.
- `tone: { r: number; g: number; b: number }` — switches the shader to transparent
  mode and renders glyphs in the supplied RGB color (each channel `0..1`). Use this
  when the shader sits on a non-default surface.

The hero uses the default theme palette; the pricing featured card and final CTA use
the `cta` variant; the community section uses a transparent overlay over
`bg-background`.

## Feature flags

`lib/config.ts` toggles template-level capabilities:

```typescript
export const features = {
  smoothScroll: true, // Lenis smooth scroll (auto-disabled on reduced motion)
} as const
```

Flipping a flag to `false` should fully remove the corresponding behavior (no
listeners, no instantiation, no library code paths) so the template degrades cleanly.

## Accessibility

- Skip-to-content link
- Visible focus rings on all interactive elements
- ARIA labels and roles on carousels, accordions, and toggles
- Reduced motion support (Lenis + CSS animations + Motion)
- Proper heading hierarchy
- WCAG 2.1 AA contrast compliance in both themes

## Performance

- Optimized images via the Next.js Image component
- WebGL context cleanup on unmount (no leaked GL resources)
- Single mount-once shader effect; uniforms updated via refs
- Smooth scroll respects reduced-motion preferences
