# Store Frontend

## Local access

Run `npm run dev`, then open:

- Store: `http://localhost:3001`
- Admin overview: `http://localhost:3001/admin`
- Products: `/admin/store/products`
- Categories: `/admin/store/categories`
- Orders: `/admin/store/orders`

The admin interface is a frontend preview. Server authentication, authorization
and persistence remain responsibilities of the future Django backend. No backend
or new API endpoints were implemented in this iteration.

## Store composition

`StorePage` retains the existing header and visual identity. Its sections are:
hero slider, independent search, compact categories, catalogue with sidebar
filters, product selections, new arrivals, popular products and advice.

Components live in `src/store/components/`. Search includes product name, brand,
description and category. Category, brand and availability options come from
catalogue data. Price filtering excludes unpriced products. Mobile filters use
the shadcn Sheet with keyboard focus management and Escape dismissal.

The current catalogue filters and paginates the loaded list locally (12 products
per page). When connecting a paginated API, move filtering and pagination into
the existing product service using `ProductQuery` and response filter metadata.
The existing API configuration stays centralized in `src/store/api/client.ts`.
Favorites are browser-local, independent of the guest cart.

## Dashboard block

Installed the project-local shadcn skill with `npx skills add shadcn/ui` and
initialized shadcn for Vite, Tailwind v4 and Radix. `components.json` defines
the `@efferd` registry as `https://efferd.com/r/{style}/{name}.json`.

Installed `npx shadcn@latest add @efferd/dashboard-3`. Reusable primitives are
in `components/ui/`, using the existing root `@/` alias. The Efferd shell,
sidebar, header, metric cards, category chart and recent-order table were adapted
to the Store. All four admin routes share this shell. Admin pages are lazy-loaded
so dashboard charts are not loaded with the public homepage.

Inter and Outfit remain the project fonts. Existing footer and main website
navigation were preserved. Absent order and revenue data stays empty/unavailable;
the catalogue fallback is explicitly labelled as a demonstration in the dashboard.

## Hero assets

Built-in image generation produced three editorial category compositions, then
they were resized to 1600px and encoded as JPEG (about 100-122 KB each):

- `public/store/heroes/mobile.jpg`
- `public/store/heroes/audio.jpg`
- `public/store/heroes/informatique.jpg`

Prompt set: wide photorealistic studio scenes; navy/slate background; restrained
cool white/blue lighting; dark clean left 45 percent reserved for HTML copy;
unbranded products fully visible on the right; no lettering or watermarks.
Mobile combines phones, a laptop, headphones, earbuds, a compact speaker and
charging accessories. Audio emphasizes headphones, earbuds and a speaker.
Computing emphasizes a laptop, keyboard, mouse, SSD, USB-C hub and cable.
These illustrative hero assets do not represent actual product listings.
