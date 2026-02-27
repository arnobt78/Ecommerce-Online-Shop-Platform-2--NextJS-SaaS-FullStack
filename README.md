# Snuzz Pro | E-Commerce Platform 2 - Next.js, Typescript, PostgreSQL, Stripe FullStack Project (including i18n, Iframe, OTP Auth, Educational Video Dashboard, SaaS Subscription System)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.13-2D3748)](https://www.prisma.io/)
[![i18next](https://img.shields.io/badge/i18next-25.5-purple)](https://www.i18next.com/)

Production-ready Next.js 15 e-commerce platform with multi-language support (EN, PL, DE, CS), OTP authentication, cart & checkout, and an educational video dashboard (HeyGen iframe). Built for learning, teaching, and reuse.

- **Live demo:** [https://snuzz-pro.vercel.app/](https://snuzz-pro.vercel.app/)

---

## Table of Contents

- [Project Summary](#project-summary)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features & Functionality](#features--functionality)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Routes & Pages](#routes--pages)
- [Components & Reuse](#components--reuse)
- [State Management](#state-management)
- [Internationalization (i18n)](#internationalization-i18n)
- [Backend & Data](#backend--data)
- [Keywords](#keywords)
- [Conclusion](#conclusion)
- [License](#license)

---

## Project Summary

Snuzz Pro is a full-stack e-commerce web app for nicotine pouches/snus. It demonstrates:

- **Next.js 15** App Router, server and client components
- **Multi-language** (English, Polish, German, Czech) via i18next
- **OTP login** (email → one-time code) with Prisma + PostgreSQL
- **Cart & checkout** with persisted cart, promo support, and form validation (Zod)
- **Product catalog** with filters (brand, flavour, strength), sorting, and static data
- **Educational dashboard** (post-login) with iframe video courses (HeyGen)
- **Contact form** and **order counter** API (timestamp-based)
- **Responsive UI** with Tailwind, Radix UI, and a conditional navbar/footer

The codebase is structured for clarity and reuse: shared contexts, hooks, and UI components so you can copy patterns or whole features into other projects.

---

## Tech Stack

| Layer              | Technology                                                   |
| ------------------ | ------------------------------------------------------------ |
| Framework          | Next.js 15.2.8 (App Router)                                  |
| Language           | TypeScript 5                                                 |
| UI                 | React 18, Tailwind CSS, Radix UI, Lucide icons               |
| Data & API         | Prisma, PostgreSQL, Next.js Route Handlers                   |
| State              | React Context (Cart, Language), TanStack Query (static data) |
| i18n               | i18next, react-i18next                                       |
| Forms & validation | React Hook Form, Zod, @hookform/resolvers                    |
| Email              | Nodemailer (SMTP) for OTP and contact form                   |
| Deployment         | Vercel, optional Coolify/Supabase for DB                     |

---

## Project Structure

```bash
snuzz-pro/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (providers, metadata, i18n script)
│   ├── page.tsx            # Home (Hero, Products, Reviews)
│   ├── globals.css
│   ├── cart/page.tsx       # Cart page
│   ├── checkout/page.tsx   # Checkout (form + payment methods)
│   ├── contact/page.tsx    # Contact form + FAQ
│   ├── dashboard/page.tsx  # Protected video dashboard (post-login)
│   ├── login/page.tsx      # OTP login (email → code)
│   ├── pro/page.tsx        # snuzz PRO landing (CTA, products)
│   ├── terms/page.tsx      # Terms and conditions
│   ├── products/
│   │   ├── page.tsx        # Product listing (SSG + client filters)
│   │   └── loading.tsx
│   ├── product-detail/[slug]/page.tsx  # Dynamic product page
│   └── api/
│       ├── auth/send-otp/route.ts   # POST – send OTP email
│       ├── auth/verify-otp/route.ts # POST – verify OTP & login
│       ├── contact/route.ts         # POST – contact form email
│       └── orders/route.ts          # GET – order counter (timestamp-based)
├── components/             # React components
│   ├── Navbar/
│   ├── Footer/
│   ├── CartSidebar/
│   ├── CartPage/
│   ├── Checkout/
│   ├── ProductCard/
│   ├── ProductPage/
│   ├── ProductDetailPage/
│   ├── HomePage/
│   ├── Review/
│   ├── ContactPage/
│   ├── DashboardPage/
│   ├── LoginPage/
│   ├── LanguageSelector/
│   ├── CategoryFilter/
│   ├── ui/                 # Shared UI (Button, Card, Input, etc.)
│   └── ...
├── context/                # React Context
│   ├── CartContext.tsx     # Cart state + localStorage
│   ├── LanguageContextNew.tsx
│   ├── ProductContext.tsx
│   └── QueryProvider.tsx   # TanStack Query
├── lib/                    # Utilities & config
│   ├── i18n.ts             # i18next setup
│   ├── translations.ts     # EN/PL/DE/CS translation keys
│   ├── utils.ts            # cn() (clsx + tailwind-merge)
│   ├── language-detection.ts
│   └── language-cookie.ts
├── hooks/                  # Custom hooks
│   ├── useStaticData.ts    # Products + translations (React Query)
│   ├── use-dynamic-stats.ts # Hero “orders today” counter
│   ├── use-mobile.tsx / use-media-query.ts
│   └── use-toast.ts
├── data/                   # Static app data
│   ├── products.ts         # Small product set (fallback)
│   └── reviews.ts          # Testimonials for Review section
├── scripts/
│   └── data/products.ts    # Full product list (used by app)
├── prisma/
│   └── schema.prisma      # User, Subscription, OrderCounter
├── public/                 # Static assets, logos, payment icons
├── middleware.ts           # Language cookie + x-initial-language header
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Features & Functionality

- **Home:** Hero with stats (orders today from API), product section, review carousel.
- **Products:** List/grid with filters (brand, flavour, strength), sort (price A–Z, etc.), pagination. Data from `scripts/data/products.ts` (static).
- **Product detail:** By `slug`; quantity, add to cart, related products reel, reviews.
- **Cart:** Sidebar + full cart page; persisted in `localStorage`; promo code support.
- **Checkout:** Delivery form + payment methods; Zod validation; mobile collapsible order summary.
- **Login:** Email → send OTP (API + SMTP) → enter code → verify (API + Prisma); then redirect to dashboard.
- **Dashboard:** Protected; sidebar with video list + settings; main area shows HeyGen iframe per video.
- **Contact:** Form (name, email, order number, message) sent via SMTP; FAQ section.
- **i18n:** EN, PL, DE, CS; cookie + middleware for SSR; language selector in navbar.
- **Order counter:** `/api/orders` returns a value derived from time (e.g. 13 + intervals every 45 min) for “orders today” on the hero.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)
- PostgreSQL (local, Coolify, or Supabase)

### 1. Clone and install

```bash
git clone https://github.com/arnobt78/Reusable-ECommerce-Online-Shop--NextJS-FullStack.git
cd Reusable-ECommerce-Online-Shop--NextJS-FullStack
npm install
```

### 2. Environment variables

Copy the example env and fill in values (see [Environment Variables](#environment-variables)):

```bash
cp .env.example .env
```

### 3. Database

Ensure PostgreSQL is running and `DATABASE_URL` in `.env` is correct. Then:

```bash
npx prisma generate
npx prisma db push   # or: npx prisma migrate dev
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Build for production:

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env` file in the project root (use `.env.example` as a template). Required and optional variables:

| Variable       | Required | Description                                                                 |
| -------------- | -------- | --------------------------------------------------------------------------- |
| `DATABASE_URL` | Yes      | PostgreSQL connection string. Used by Prisma for User/OTP and Subscription. |
| `SMTP_HOST`    | Yes\*    | SMTP host for OTP and contact emails (e.g. `smtp.gmail.com`).               |
| `SMTP_PORT`    | Yes\*    | SMTP port (e.g. `587`).                                                     |
| `SMTP_USER`    | Yes\*    | SMTP username / sender email.                                               |
| `SMTP_PASS`    | Yes\*    | SMTP password or app password.                                              |

\*Required for “Send OTP” and “Contact form” to work. Without them, those API routes will fail at runtime.

### Example `.env`

```env
# PostgreSQL (choose one option)

# Local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/snuzz_dev"

# Supabase
# DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Coolify / production
# DATABASE_URL="postgresql://user:password@host:5433/database"

# SMTP (Gmail example: use App Password, not main password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### How to get these values

- **DATABASE_URL:** From your PostgreSQL provider (local `createdb`, Supabase Dashboard → Settings → Database, or Coolify resource).
- **SMTP:** From your email provider (Gmail: enable 2FA and create an App Password; other providers: use their SMTP host/port and credentials).

---

## API Endpoints

All under `app/api/`. No auth middleware on these routes; add your own if you need protection.

| Method | Path                   | Description                                                                                                                                                                          |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/api/auth/send-otp`   | Body: `{ "email": "user@example.com" }`. Creates/finds user in DB, generates 6-digit OTP, stores in DB, sends email via SMTP. Returns `{ "success": true }` or `{ "error": "..." }`. |
| POST   | `/api/auth/verify-otp` | Body: `{ "email", "otp" }`. Verifies OTP, clears it in DB, returns `{ "success": true, "user": { "id", "email" } }` or error.                                                        |
| POST   | `/api/contact`         | Body: `{ "name", "email", "orderNumber", "message" }`. Sends email to support and auto-reply to sender. Returns `{ "success": true }` or error.                                      |
| GET    | `/api/orders`          | No body. Returns JSON with `orders` (number), `intervalsPassed`, `timeDiff`, `startOfDay`, `currentTime`, `source`. Used for “orders today” on the hero.                             |

### Example: Send OTP

```bash
curl -X POST http://localhost:3000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

### Example: Verify OTP

```bash
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","otp":"123456"}'
```

---

## Routes & Pages

| Route                    | Type            | Description                                                                      |
| ------------------------ | --------------- | -------------------------------------------------------------------------------- |
| `/`                      | Client          | Home: Hero, products section, reviews.                                           |
| `/products`              | Server + Client | Product list with filters/sort; data from static products.                       |
| `/product-detail/[slug]` | Server          | Product by slug; ProductDetailLayout + ProductProvider.                          |
| `/cart`                  | Client          | Full cart page (CartPageComponents).                                             |
| `/checkout`              | Client          | Checkout form + payment methods; no navbar/footer (LayoutWithConditionalNavbar). |
| `/login`                 | Client          | OTP login; redirects to dashboard on success.                                    |
| `/dashboard`             | Client          | Protected; video list + iframe; checks `localStorage.demo_authenticated`.        |
| `/pro`                   | Client          | snuzz PRO landing (CTA, product section).                                        |
| `/contact`               | Client          | Contact form + FAQ.                                                              |
| `/terms`                 | Client          | Terms and conditions.                                                            |

Middleware runs for all routes: reads `selectedLanguage` cookie (or Accept-Language), sets `x-initial-language` header for SSR.

---

## Components & Reuse

### Layout and global UI

- **LayoutWithConditionalNavbar:** Wraps children; shows Navbar + Footer except on `/dashboard` and `/checkout`; includes CartSidebarLayout. Use the same pattern in your app to conditionally show header/footer.
- **Navbar:** Search, language selector, cart icon, mobile menu. Pass `allProducts` for search. Reusable in any Next.js app with Cart + Language contexts.
- **Footer:** Links, layout from FooterSectionLayout. Copy `FooterSectionLayout` and replace links/text.

### Cart and checkout

- **CartContext:** `useCart()` gives `cartItems`, `setCartItems`, `cartOpen`, `setCartOpen`, `appliedPromo`, `setAppliedPromo`. Cart is persisted in `localStorage`. To reuse: wrap app with `CartProvider` and use `useCart()` in your components.
- **CartSidebarLayout / CartSidebarPage:** Slide-out cart. Depends on `useCart()` and product shape (slug, prices, quantity).
- **CheckoutForm, CheckoutSummery, PaymentMethods:** Zod + React Hook Form. Use as reference for validated checkout forms in another project.

### Product UI

- **SingleProductCard / ListProductCard:** Card for one product (image, price, stock, add to cart). Reuse by importing and passing your product type (e.g. `ProductData`).
- **ProductDetailLayout:** Full product page (image, quantity, add to cart, related reel). Needs `ProductProvider` and product + slug.
- **ProductPageClient:** List + filters + sort + pagination. Pass `products` array and adapt filter keys if your schema differs.

### Reusing the cart in another project

```tsx
// 1. Copy context/CartContext.tsx and adapt CartItem to your product type.
// 2. Wrap your app:
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

// 3. In any component:
import { useCart } from "@/context/CartContext";

function MyComponent() {
  const { cartItems, setCartOpen, setCartItems } = useCart();
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.slug === product.slug);
      if (existing) {
        return prev.map((p) =>
          p.slug === product.slug ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  return <button onClick={() => addToCart(someProduct)}>Add to cart</button>;
}
```

### Reusing i18n

- Copy `lib/i18n.ts`, `lib/translations.ts` (or your keys), and `lib/language-detection.ts`.
- Wrap app with `I18nProvider` and `LanguageProvider` (see `app/layout.tsx`).
- In components: `const { t } = useLanguage();` then `t("nav.shop")` etc. Add your keys to `translations.ts` for each locale.

---

## State Management

- **Cart:** `CartContext` – cart items, open state, promo; synced to `localStorage` after hydration.
- **Language:** `LanguageContextNew` – current language; syncs with cookie and i18next; used for `t()`.
- **Product (detail):** `ProductContext` – selected product on detail page.
- **Server/static data:** TanStack Query in `QueryProvider` – products and translations via `useStaticData()` / `useProducts()` / `useFilteredProducts()`. `StaticDataPreloader` preloads at app load.

No global Redux; all React Context + Query.

---

## Internationalization (i18n)

- **Libraries:** i18next, react-i18next. Config in `lib/i18n.ts`; keys in `lib/translations.ts` (en, pl, de, cs).
- **Flow:** Middleware sets `x-initial-language` from cookie or Accept-Language. Root layout reads it and passes `initialLanguage` to `I18nProvider` and `LanguageProvider`. Client can override via language selector (cookie + localStorage).
- **Usage:** `const { t } = useLanguage();` then e.g. `t("hero.title.line1")`. Add new keys in `translations.ts` for each locale.

---

## Backend & Data

- **Database:** PostgreSQL via Prisma. Models: `User` (id, email, otp), `Subscription`, `OrderCounter`. OTP is stored on User and cleared after successful verify.
- **Product data:** Not from DB; static array in `scripts/data/products.ts` (and smaller set in `data/products.ts`). Replace with API or DB if you need dynamic products.
- **Reviews:** Static array in `data/reviews.ts` for the home page review section.
- **Order counter:** No DB; `/api/orders` computes a value from current time (e.g. 13 + 2 per 45‑minute interval) for display only.

---

## Keywords

Next.js 15, React 18, TypeScript, e-commerce, nicotine pouches, snus, Prisma, PostgreSQL, OTP authentication, i18n, internationalization, multi-language, cart, checkout, Tailwind CSS, Radix UI, Vercel, form validation, Zod, React Hook Form, TanStack Query, Nodemailer, SMTP, HeyGen, educational dashboard, iframe, reusable components, full stack.

---

## Conclusion

Snuzz Pro is a full-stack Next.js 15 e-commerce and learning template. It covers:

- App Router, API routes, middleware, and SSR-friendly i18n
- Cart and checkout with validation and persistence
- OTP auth with Prisma and SMTP
- Static product data and React Query
- Responsive layout and conditional navbar/footer

Use it as a reference or starting point: copy contexts, hooks, and components into your own repo and adapt types and env (DATABASE_URL, SMTP) to your needs. For questions or to share what you’ve built, open an issue or reach out via the links below.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
