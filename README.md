# Snuzz PRO | E-Commerce Platform 2 - Next.js, Typescript, PostgreSQL FullStack Project (including Iframe Video Channel SaaS Subscription System)

Production-ready Next.js 15 e-commerce platform with multi-language support, OTP authentication, and comprehensive documentation.

- **Live-Demo:** [https://snuzz-pro.vercel.app/](https://snuzz-pro.vercel.app/)

---

## 📚 **Complete Documentation Available!**

This project includes **150+ pages** of professional documentation:

### **Quick Links:**

- 🚀 **[Quick Start Guide](QUICK_START_GUIDE.md)** - Get running in 5 minutes
- 🔧 **[Setup Guide](SETUP_GUIDE.md)** - Detailed first-time setup (DB, SMTP, etc.)
- 📖 **[Complete Documentation](PROJECT_DOCUMENTATION.md)** - 115-page reference
- 📡 **[API Reference](API_REFERENCE.md)** - All endpoints documented
- 🗂️ **[Documentation Index](DOCUMENTATION_INDEX.md)** - Navigation hub
- 🏗️ **[Visual Structure Guide](PROJECT_STRUCTURE_VISUAL.md)** - Architecture diagrams

### **For New Developers:**

1. Start with [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) (5 min)
2. Follow [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md) (10 min)
3. Complete [SETUP_GUIDE.md](SETUP_GUIDE.md) (60 min)
4. Reference [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) as needed

**Total onboarding time: 2-3 hours to fully productive!**

---

A modern, modular, and production-ready e-commerce web application built with Next.js 15, React, TypeScript, Tailwind CSS, and Radix UI. Snuzz provides a beautiful, responsive shopping experience with real-world cart, checkout, and product detail flows deployed on Vercel, PostgreSQL, and Coolify.

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
