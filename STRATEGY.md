Project rendering strategy and route decisions

- `app/layout.js` — Server component at root. Provides global styles and navigation. Kept server-side to avoid shipping client runtime unless required.
- `app/page.js` — Static landing page. No user-specific data; fast CDN caching.
- `app/menu/page.js` — ISR with `export const revalidate = 3600`. Menu data changes occasionally; ISR provides cache while enabling hourly refresh. Data fetched directly from `lib/data/dishes` (server component) — no internal API calls.
- `app/menu/[id]/page.js` — Static via `generateStaticParams()`. Pre-renders known dishes; calls `notFound()` when params missing.
- `app/menu/loading.js` & `app/menu/error.js` — Loading and error boundaries scoped to the menu section to avoid blocking the whole app.
- `app/cart/page.js` — Client component: cart is browser-local (localStorage). Interactivity (quantities, persistent local state) requires client runtime.
- `app/checkout/page.js` — Dynamic: uses a server action to accept an order payload, validates with a schema, and calls server helper `createOrder`. Protected by server-side validation (and can be extended with auth checks).
- `app/api/orders/route.js` — Public API route for external order submissions. Shares validation and persistence logic using the same server helpers and schemas.

Architectural rules followed:
- Server components by default. Client boundaries only where state/browser APIs are required (CategoryBar, CartClient, CartItem, QuantityInput).
- No internal fetch from server components to our own API routes; server components call server helpers or import data directly.
- Validation performed with a shared schema (`lib/validators.js`) used by both the server action and the API route.
