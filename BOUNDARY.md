Component boundary map (Server vs Client)

- Server Components (default):
  - `app/layout.js`
  - `app/page.js`
  - `app/menu/page.js`
  - `app/menu/[id]/page.js`
  - `components/DishCard.jsx`
  - `components/DishDetails.jsx`

- Client Components (marked with `use client`):
  - `components/CategoryBar.jsx` — needs `next/navigation` client router to update search params.
  - `components/CartClient.jsx` — uses `localStorage`, state and effects.
  - `components/CartItem.jsx` — interactive quantity/remove buttons.
  - `components/QuantityInput.jsx` — interactive control.
  - `app/cart/page.js` — a client page that composes `CartClient`.
  - `app/menu/error.js` — small client component to allow `reset()` control in the error boundary.

Notes:
- Server components fetch and compose data without shipping client JS.
- Client components are kept at the leaves to minimize client bundle size.
