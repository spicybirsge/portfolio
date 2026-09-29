<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio project guide

## Product and design source

- This repository contains a personal portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS.
- Treat the Figma Make file as the visual reference: `https://www.figma.com/make/Mk2KmUK81zzzMUEIi0ZnBm/Portfolio-website?t=ycnIB0ns4c2S40Kc-1`.
- Match the reference's composition, spacing, typography, color, borders, imagery, and responsive behavior as closely as the available design context allows.
- Do not invent details that can be checked in Figma. If a frame or asset is inaccessible, preserve the existing implementation and call out the missing design input.
- Build a polished portfolio rather than copying generated prototype code verbatim. Keep semantic HTML, accessibility, performance, and maintainability intact.

## Repository conventions

- Application routes and metadata live under `src/app`; reusable application components belong in `src/components`.
- Put shadcn/ui primitives in `src/components/ui` and portfolio-specific sections in `src/components/sections`.
- Put small shared helpers in `src/lib`; keep portfolio content in typed data modules when it is repeated or rendered as a collection.
- Store public static assets in `public`, grouped by purpose where useful, for example `public/images/projects` and `public/icons`.
- Use the `@/*` TypeScript alias for imports from `src`.
- Keep pages and layouts as Server Components by default. Add `"use client"` only to the smallest component that needs state, effects, browser APIs, or event handlers.
- Use named exports for reusable components and default exports only where Next.js file conventions require them.

## UI implementation

- Use Tailwind CSS 4 utilities and define durable design tokens as CSS custom properties in `src/app/globals.css`.
- Prefer shadcn/ui primitives for interactive controls such as dialogs, sheets, tooltips, tabs, and buttons. Adapt their styling to the portfolio; do not let default shadcn styling determine the visual direction.
- Prefer CSS transitions and transforms for simple interaction. Use Motion only when an animation needs sequencing, gestures, layout animation, or scroll-linked behavior.
- Use Lucide icons for generic interface symbols. Use official brand SVGs for company and social marks. Do not substitute a generic icon for a brand logo.
- Preserve SVG for inline interface and brand artwork because it scales cleanly. Produce raster copies only for browser and social metadata formats that require them.
- Avoid large UI or utility dependencies for behavior that can be expressed clearly with React, CSS, or an existing package.

## Responsive and accessible behavior

- Implement mobile-first layouts and verify at approximately 375, 768, 1024, and 1440 CSS pixels.
- Preserve a clear heading hierarchy, landmarks, keyboard navigation, visible focus styles, and readable color contrast.
- Give meaningful images useful alt text and decorative images empty alt text. Icon-only controls require an accessible name.
- Respect `prefers-reduced-motion`; motion must never be required to understand content or operate the site.
- Avoid layout shift by providing intrinsic image dimensions or using a correctly constrained `fill` layout.

## Images, icons, and metadata

- Use `next/image` for content imagery unless a CSS background or metadata file convention is the better fit.
- Keep one clean, square master logo source, preferably SVG with a transparent background and simple geometry that remains legible at 16 px.
- Generate `src/app/favicon.ico`, `src/app/icon.png`, and `src/app/apple-icon.png` from that master. Use 512x512 for `icon.png` and 180x180 for `apple-icon.png`; include common 16, 32, and 48 px sizes in the ICO.
- Provide `src/app/opengraph-image.png` and `src/app/twitter-image.png` at 1200x630. These are social cards, so compose the name, role, and visual identity rather than stretching the square logo.
- Use Next.js file-based metadata conventions and a typed `Metadata` export in `src/app/layout.tsx`. Set `metadataBase`, title template, description, Open Graph fields, Twitter card fields, and canonical URL when the production domain is known.
- Never upscale a tiny raster export or convert unrelated UI glyphs into the site identity. If the logo source is missing, request the original SVG or export it from Figma before generating derivatives.

## Content and code quality

- Keep visible portfolio copy specific and concise. Do not ship placeholder names, fake testimonials, invented metrics, or dead links.
- Render project and experience collections from typed data instead of duplicating card markup.
- Use semantic links for navigation and calls to action; use buttons only for actions.
- Keep components focused. Extract a component when it has a reusable interaction, repeated structure, or a clear section boundary.
- Do not add speculative abstractions, state libraries, or data-fetching libraries to this mostly static site.

## Verification

- Before finishing a code change, run `npm run lint` and `npm run build`.
- Check the changed pages at mobile and desktop widths and test keyboard focus for interactive elements.
- For visual work, compare the rendered page with the relevant Figma frame and report any mismatch caused by missing assets, fonts, or inaccessible design context.
- For metadata work, verify the generated head tags and inspect favicon, Apple touch icon, and 1200x630 social card outputs at their intended sizes.
