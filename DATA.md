# Live data and SWR keys

## Order status

- **Key:** `/api/orders/{id}` (for example, `/api/orders/1720000000000`). The order ID is the stable key for one order's status.
- **Why this key:** each screen follows one order, so a different order ID must have a separate cache entry.
- **Initial data:** `app/orders/[id]/page.js` reads the order on the server and passes it to the client screen as `fallbackData`. The status is visible in the first HTML render without a loading spinner.
- **Refresh rule:** SWR revalidates every 5 seconds while the status page is open, and when the browser tab regains focus.
- **Why polling:** order status can change while the customer is waiting, so the open screen checks for updates without requiring a manual refresh.
- **Data source:** `data/orders.json`. New orders start with `received`; the API returns that value for older saved orders that do not yet have a status.

## Menu search and pagination

- **Key:** `/api/menu?q={term}&category={category}&page={page}`. Each search term, category, and page number produces a distinct key.
- **Why these parameters:** the result set depends on all three values; including them prevents one search or page from reusing another one's cached results.
- **Empty search:** the SWR key is `null`. The page uses the menu results rendered by the server and makes no search request.
- **Debounce:** the search waits 300 ms after the last keystroke before changing the key. Previous results stay visible while the next key is loading.
- **Refresh rule:** menu results do not poll. They revalidate when the search, category, or page key changes. Pagination links store `q`, `category`, and `page` in the URL so the page can be rendered directly on refresh or when shared.
- **Why no polling:** this menu catalog is static in the current app, so periodic requests would add traffic without finding new data.
- **Page size:** 4 dishes.

## Shared request behavior

Both queries use `lib/fetcher.js`. It returns JSON for successful requests and throws an error with the HTTP status for failed requests, allowing SWR to preserve the last visible data and report a refresh error.
