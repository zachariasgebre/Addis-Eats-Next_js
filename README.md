# Addis Eats — Next.js App Router Demo

This repository is a demo food-ordering app using Next.js App Router, React, and Tailwind CSS.

Quick start

1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`

Project structure highlights

- `app/layout.js` — Root server layout and global styles.
- `app/page.js` — Landing (static).
- `app/menu/page.js` — Menu (ISR via `export const revalidate = 3600`).
- `app/menu/[id]/page.js` — Dish page (static via `generateStaticParams`).
- `app/cart/page.js` — Cart client page (localStorage).
- `app/checkout/page.js` — Dynamic checkout page with server action.
- `app/api/orders/route.js` — Orders API route (POST)

API Endpoint contract — `/api/orders` (POST)

- Request: JSON body
  - `name` (string)
  - `email` (string, valid email)
  - `address` (string)
  - `items` (array of { id: string, quantity: number })
  - `total` (number)

- Responses:
  - 201 Created: { ok: true, order }
  - 400 Bad Request: { error: 'Validation failed', details }
  - 500 Server Error: { error: 'Server error' }

Notes on server actions and validation

- The checkout form uses a server action that validates the payload with a shared Zod schema in `lib/validators.js` and writes orders to `data/orders.json` via `lib/orders.js`.
- The API route reuses the same schema and persistence helper.

Development notes

- Tailwind is configured; run `npx tailwindcss -i ./app/globals.css -o ./public/tailwind.css --watch` if needed, but the Next.js setup will use PostCSS when running `npm run dev`.
- `zod` is included for validation.
