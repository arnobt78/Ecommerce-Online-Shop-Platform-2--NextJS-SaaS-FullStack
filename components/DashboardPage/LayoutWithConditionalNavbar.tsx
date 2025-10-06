"use client";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/FooterSectionLayout";
import CartSidebarLayout from "@/components/CartSidebar/CartSidebarPage";
import { products } from "@/scripts/data/products";
import { usePathname } from "next/navigation";

export default function LayoutWithConditionalNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isCheckout = pathname === "/checkout";
  return (
    <>
      {!isDashboard && !isCheckout && <Navbar allProducts={products} />}
      <CartSidebarLayout />
      {children}
      {!isDashboard && !isCheckout && <Footer />}
    </>
  );
}
