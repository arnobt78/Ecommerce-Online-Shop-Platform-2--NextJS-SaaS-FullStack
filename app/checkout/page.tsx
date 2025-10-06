// Checkout page for /checkout
// Responsive, two-column on desktop, single column on mobile
// Uses zod for validation, placeholder for payment gateway
// Imports summary/cart logic from context

"use client";

import CheckoutForm from "@/components/Checkout/CheckoutForm";
import CheckoutPayment from "@/components/Checkout/CheckoutPayment";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import CheckoutSummery from "@/components/Checkout/CheckoutSummery";
import Link from "next/link";
import PaymentMethods from "@/components/Checkout/PaymentMethods";

export default function CheckoutPage() {
  // const { cartItems } = useCart();

  return (
    <div className="max-w-7xl mx-auto bg-white pt-4 sm:pt-6">
      <div className="">
        <div className="flex items-center justify-between px-4 sm:px-0">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="flex items-center justify-center"
          >
            <Image
              src="/logo-black.svg"
              alt="SNUZZ Logo"
              width={100}
              height={100}
              style={{ width: 140, height: 40, minWidth: 120, maxWidth: 160 }}
              className=" mx-auto"
              priority
            />
          </Link>

          <Link
            href="/cart"
            aria-label="Go to cart"
            className="flex items-center justify-center"
          >
            <ShoppingBag className="w-6 h-6 text-[#42E5EE]/50 hover:text-[#42E5EE]/80 transition-all duration-200" />
          </Link>
        </div>
      </div>

      <div className="py-4 sm:py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        {/* Left: Form & Payment */}
        <div className="w-full">
          <CheckoutForm />
          <div className="mt-8">
            {/* <CheckoutPayment /> */}

            {/* Payment methods section */}
            <PaymentMethods />
          </div>
        </div>

        {/* Right: Cart Summary */}
        <CheckoutSummery />
      </div>
    </div>
  );
}
