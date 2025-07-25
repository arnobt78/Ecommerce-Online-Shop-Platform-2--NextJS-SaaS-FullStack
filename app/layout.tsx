import type { Metadata } from "next";
import "./globals.css";


import Footer from '@/components/Footer/FooterSectionLayout'
import Navbar from '@/components/Navbar/Navbar'
import { CartProvider } from '../context/CartContext'
import { products } from '../data/products'
import CartSidebarLayout from "@/components/CartSidebar/CartSidebarPage";
import LayoutWithConditionalNavbar from "@/components/DashboardPage/LayoutWithConditionalNavbar";




export const metadata: Metadata = {
  title: "Sunzz Pro – Online Shop",
  description: "Pixel-perfect Next.js category filter UI with Tailwind, TypeScript, and Figma-accurate design.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" suppressHydrationWarning>
    //   <body className="antialiased bg-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
    //     <CartProvider>
    //       <Navbar allProducts={products} />
    //       <CartSidebarLayout />
    //       {children}
    //       <Footer />
    //     </CartProvider>
    //   </body>
    // </html>
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
        <CartProvider>
          <LayoutWithConditionalNavbar>{children}</LayoutWithConditionalNavbar>
        </CartProvider>
      </body>
    </html>
  );
}