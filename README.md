# Bilal Ecommerce (MERN)

Modern MERN e‑commerce app with Stripe payments, role‑based admin panel, and a Vite + Tailwind React frontend. This document provides an executive‑level overview, architecture, modules, and flows — intentionally excluding setup/run instructions.

## Highlights

- Product catalog with category browsing, search, and details
- Cart with quantity management and live totals
- Stripe Checkout with secure server‑side webhooks and order persistence
- Orders timeline with payment status and shipping details
- Role‑based Admin Panel; users can view in read‑only mode for demos
- Clean React architecture with Redux Toolkit for user state and lightweight Context for cart count

## Monorepo Structure (Overview)

```
2-Bilal-Ecommerce/
├─ client/        # React app (Vite)
├─ server/        # Express API
├─ vercel.json    # Client deploy config
└─ README.md
```

## Feature Matrix

- Home: category‑wise carousels, horizontal/vertical product cards
- Search: instant route‑based filtering with result counts
- Product Details: images gallery, zoom behavior, pricing (MRP vs selling)
- Cart: add/remove/update, total qty and amount, guarded checkout
- Checkout: redirects to Stripe session
- Orders: list, created timestamp, line items, totals, payment status
- Admin: all products list, edit modal; all users list, role edit (admin only)

## High‑Level Architecture

```mermaid
flowchart LR
  A[Browser] --> B[Vercel: React Client]
  B --> C[Express API /api/*]
  C --> D[(MongoDB)]
  B -- Checkout --> E[Stripe Checkout]
  E -- Redirect success/cancel --> B
  E -- Webhook --> C
  C --> D
  C -- order-list --> B
```

## Checkout to Order Flow

```mermaid
sequenceDiagram
  participant U as User
  participant FE as Client (React)
  participant API as Express API
  participant ST as Stripe
  participant DB as MongoDB

  U->>FE: Click "Payment"
  FE->>API: Initiate Checkout (cart items, credentials)
  API->>ST: Create Checkout Session
  ST-->>FE: session URL
  FE->>U: Redirect to Stripe
  U->>ST: Pay
  ST-->>FE: Redirect to /success or /cancel
  ST-->>API: Webhook event (session completed)
  API->>ST: Fetch line items
  API->>DB: Save Order + Clear Cart
  U->>FE: Click "See Order"
  FE->>API: Fetch Orders
  API->>DB: Query orders by userId
  API-->>FE: Order data
```

## Role & Permissions (Read‑Only Demo for Users)

```mermaid
flowchart TD
  FE[Client] -->|Admin Panel UI| FEUI[Buttons, Modals]
  FEUI -->|If user.role != ADMIN| RO[Disable/Hide Actions]
  FEUI -->|If user.role == ADMIN| ACT[Enable Actions]
  subgraph Server
    UP[Upload/Update Product] --> CHK1{role is ADMIN?}
    CHK1 -- no --> 403
    CHK1 -- yes --> OK1[Proceed]
    UR[Update User Roles] --> CHK2{role is ADMIN?}
    CHK2 -- no --> 403
    CHK2 -- yes --> OK2[Proceed]
  end
```

## Frontend Modules

- State
  - Redux Toolkit: user details
  - React Context: cart count utility
- Routing
  - React Router nested routes with a shared layout (Header/Footer)
  - Guard‑like UX in Admin Panel via UI capability toggles
- UI/UX
  - TailwindCSS utility classes
  - Skeletons for async content
  - Moment.js for human‑readable timestamps

## Backend Modules

- Auth: cookie‑based JWT; middleware injects `req.userId`
- Products: upload, update, category browsing, search/filter
- Cart: add/view/update/delete
- Checkout: Stripe session creation with item metadata
- Webhooks: verified raw‑body route for event handling; creates orders and clears cart
- Orders: per‑user listing, newest first
- Permissions: centralized helper to allow admin‑only mutations

## Data Models (Conceptual)

- User
  - name, email, role, profilePic, timestamps
- Product
  - productName, brandName, category, productImage[], description, price, sellingPrice
- CartItem
  - userId, productId, quantity
- Order
  - userId, email, productDetails[], paymentDetails, shipping_options[], totalAmount, timestamps

## Security & Privacy

- Secrets remain only in server environment variables (never committed)
- CORS restricted to the deployed frontend origin with credentials
- Stripe webhook endpoint consumes verified signatures with raw payload
- All admin mutations are re‑checked on server regardless of UI state

## Demo & Presentation Notes

- Admin Panel is browseable by non‑admin users for showcasing UI, while all destructive/admin actions remain disabled and server‑protected.
- SPA routing is configured for deep links (e.g., orders, product details).
- Currency helpers standardize displayed prices across the app.

## Usage & Rights

- This repository and its contents are proprietary and for demonstration purposes only.
- Redistribution, copying, or using this codebase without explicit permission is not allowed.
- No setup, run, or deployment instructions are provided here by design.

---

Developed by Bilal — Happy Shipping!
