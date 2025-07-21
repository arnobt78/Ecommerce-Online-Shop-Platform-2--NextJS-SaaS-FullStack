
# Snuzz E-Commerce Platform - Next.js Resuable Components

![Screenshot 2025-07-10 at 15 16 30](https://github.com/user-attachments/assets/04d4e5b8-2c45-4887-afff-288a0cca4110)
![Screenshot 2025-07-10 at 15 17 06](https://github.com/user-attachments/assets/c7594508-d07d-4b86-a397-8fce30c9827e)
![Screenshot 2025-07-10 at 15 48 52](https://github.com/user-attachments/assets/95406d79-c391-427e-8c9b-8fb87e8cfdd7)
![Screenshot 2025-07-10 at 15 49 21](https://github.com/user-attachments/assets/53e1598f-c9ed-4eb2-9ea5-e04d5a69b1bb)
![Screenshot 2025-07-10 at 15 49 43](https://github.com/user-attachments/assets/9e7173f9-908d-4ee6-b1df-cbe9749ccf84)
![Screenshot 2025-07-10 at 15 50 11](https://github.com/user-attachments/assets/64654463-a4a7-4568-b298-7842ea4b958c)
![Screenshot 2025-07-10 at 15 50 36](https://github.com/user-attachments/assets/ee2d3bb0-4ac3-4162-b33d-4924ba265156)
![Screenshot 2025-07-10 at 15 53 57](https://github.com/user-attachments/assets/98e51f1d-7552-42f5-9489-605e7c5cdd89)
![Screenshot 2025-07-10 at 15 54 11](https://github.com/user-attachments/assets/1ca78a76-b617-4c0c-bc24-a7dff38b38c3)

---

A modern, modular, and production-ready e-commerce web application built with Next.js 15, React, TypeScript, Tailwind CSS, and Radix UI. Snuzz provides a beautiful, responsive shopping experience with real-world cart, checkout, and product detail flows.

- **Live-Demo:** [https://snuzz-pro.vercel.app/](https://snuzz-pro.vercel.app/)

---

## Table of Contents

- Project Summary
- Features
- Tech Stack
- Project Structure
- Getting Started
- Scripts & Usage
- Core Components
- Context & State Management
- Routing & Navigation
- Styling & Theming
- API & Data
- Extending & Reusing Components
- Deployment
- Keywords
- Conclusion

---

## Project Summary

Snuzz is a feature-rich e-commerce platform designed for maintainability, scalability, and a delightful user experience. It demonstrates best practices in modular React/Next.js development, robust type safety, and real-world UI/UX polish. The project is ideal for learning, teaching, or as a foundation for your own e-commerce solution.

---

## Features

- **Product Catalog**: Browse, filter, and paginate products with detailed information.
- **Product Detail**: Dynamic product pages with images, descriptions, and purchase options.
- **Cart & Cart Sidebar**: Add, remove, and update product quantities. Access cart from anywhere.
- **Checkout Flow**: Secure checkout with promo code support and order summary.
- **Responsive Design**: Fully mobile-friendly and accessible.
- **Persistent Cart**: Cart state is saved in localStorage.
- **Modern UI**: Built with Tailwind CSS, Radix UI, and custom components.
- **Type Safety**: End-to-end TypeScript for all logic and data.
- **Reusable Components**: Modular, composable, and easy to extend.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, SSR/SSG, dynamic routes)
- **Language**: TypeScript, React 18
- **Styling**: Tailwind CSS, custom CSS, shadcn/ui, Radix UI
- **State Management**: React Context API
- **Icons**: Lucide React
- **Other**: Embla Carousel, React Hook Form, Zod, and more

---

## Project Structure

```bash

snuzz/
├── app/                # Next.js app directory (routing, pages, layouts)
│   ├── cart/           # Cart page
│   ├── product-detail/ # Dynamic product detail route
│   ├── products/       # Product listing page
│   └── ...             # Other app routes and layouts
├── components/         # All UI and feature components
│   ├── Cart/           # Cart summary/details
│   ├── Layout/         # Header, Footer, Sidebar, etc.
│   ├── ProductCard/    # Product list and single card components
│   ├── ProductDetail/  # Product detail sections
│   ├── ui/             # shadcn/ui and Radix UI components
│   └── ...             # Other shared components
├── context/            # React Context (CartContext)
├── data/               # Static product data
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets (images, icons)
├── styles/             # Global and Tailwind CSS
├── package.json        # Project dependencies and scripts
├── tailwind.config.ts  # Tailwind CSS config
├── tsconfig.json       # TypeScript config
└── ...                 # Other config and support files
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm, but use only one lockfile!)

### Installation

```bash
git clone https://github.com/your-username/snuzz.git
cd snuzz
npm install
```

### Running Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts & Usage

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run start` – Start the production server
- `npm run lint` – Lint the codebase

---

## Core Components

### ProductCard

Reusable product card for listing and detail views.

```tsx
import { SingleProductCard } from "@/components/ProductCard/SingleProductCard";

<SingleProductCard
  productSlug="klint-arctic-mint-1"
  productImage="/product-image.png"
  productName="Klint Arctic Mint"
  salePrice="€ 9,60"
  originalPrice="€ 14,99"
  saleLabel="Sale 30%"
  shippingLabel="Free shipping"
  stockStatus="in_stock"
  addToCart={() => ...}
/>
```

### CartSidebar

Accessible from anywhere, shows cart items, allows quantity updates, and links to product detail.

```tsx
import CartSidebar from "@/components/cart-sidebar";
// Used in layout, toggled via context
```

### CartContext

Global state for cart items and sidebar open/close.

```tsx
import { useCart } from "@/context/CartContext";
const { cartItems, setCartItems, cartOpen, setCartOpen } = useCart();
```

---

## Context & State Management

- **CartContext**: Provides cart state and actions via React Context.
- **Persistence**: Cart is saved to localStorage and restored on reload.

---

## Routing & Navigation

- **Dynamic Product Detail**: `/product-detail/[slug]` (uses Next.js dynamic routes)
- **Cart Page**: `/cart`
- **Product Listing**: `/products`
- **Sidebar Navigation**: Cart sidebar uses Next.js router for navigation.

---

## Styling & Theming

- **Tailwind CSS**: Utility-first styling, custom theme in tailwind.config.ts
- **shadcn/ui & Radix UI**: Accessible, composable UI primitives
- **Custom CSS**: For global styles and overrides

---

## API & Data

- **Static Data**: Products are defined in products.ts as TypeScript objects.
- **Type Safety**: All product and cart data is strongly typed.

---

## Extending & Reusing Components

- All components are modular and reusable.
- To use a component in another project, copy the component and its dependencies, and update imports as needed.
- Example: To reuse the CartSidebar, import it and wrap your app in `CartProvider`.

---

## Deployment

- **Vercel**: Recommended for Next.js.
- **Lockfile**: Use only one lockfile (package-lock.json for npm or `pnpm-lock.yaml` for pnpm).
- **Production Build**: `npm run build` then `npm run start`

---

## Keywords

`nextjs`, `react`, `typescript`, `tailwindcss`, `ecommerce`, `cart`, `product`, `radix-ui`, `shadcn-ui`, `modular`, context, `responsive`, `ssr`, `ssg`, `vercel`, `modern-ui`, `component-library`, `best-practices`

---

## Conclusion

Snuzz is a modern, modular, and production-ready e-commerce platform built with the latest web technologies. Use it as a learning resource, a starter for your own projects, or a showcase of best practices in Next.js and React development.

---

Happy Coding! 🚀

Thank you!

---
