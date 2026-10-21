# CSU MERCH Nuxt 3 Migration Map

The React prototype intentionally uses a single `screen` state rather than a
React router. Each file in `src/pages` is already a page boundary and can be
ported to the matching Nuxt file route below.

## Page routes

| React page | Proposed Nuxt 3 route | Nuxt file |
| --- | --- | --- |
| `HomePage.tsx` | `/` | `pages/index.vue` |
| `ProductDetailsPage.tsx` | `/products/:id` | `pages/products/[id].vue` |
| `LoginPage.tsx` | `/login` | `pages/login.vue` |
| `PreorderPage.tsx` | `/products/:id/preorder` | `pages/products/[id]/preorder.vue` |
| `MyOrdersPage.tsx` | `/my-orders` | `pages/my-orders.vue` |
| `OfficerDashboardPage.tsx` | `/officer` | `pages/officer/index.vue` |
| `RestrictedPage.tsx` | `/officers-only` | `pages/officers-only.vue` |

The officer dashboard's Orders, Inventory, and Products controls remain tabs on
`/officer`. They can later become query parameters (`/officer?tab=inventory`)
without changing the page component boundaries.

## State handoff

`src/App.tsx` owns all mutable prototype state and passes values/actions through
props. During a Nuxt migration, move that state to one Pinia store or a single
`useState` composable:

- `products`: shared catalog and variant inventory.
- `orders`: student and officer order records.
- `role` and `officerEntity`: the current client-only session.
- `selectedProduct` and `selection`: the active pre-order item and variant.
- `search` and `entityFilter`: catalog controls.

No React context, reducer, external state library, or React router is used.

## Styling note

Tailwind CSS is the styling dependency. The existing `src/index.css` is retained
as the visual contract so this structural refactor does not alter the approved
design. It contains the current responsive component selectors in addition to
the Tailwind import. When converting each JSX file to Vue, those selectors can
be replaced one component at a time with equivalent utility strings without a
simultaneous visual regression.
