// Checkout page for /checkout
// Responsive, two-column on desktop, single column on mobile
// Uses zod for validation, placeholder for payment gateway
// Imports summary/cart logic from context

"use client";

import { useRef, useState } from "react";
import CheckoutForm, {
  CheckoutFormRef,
} from "@/components/Checkout/CheckoutForm";
import CheckoutPayment from "@/components/Checkout/CheckoutPayment";
import { ShoppingBag, ChevronDown } from "lucide-react";
import Image from "next/image";
import CheckoutSummery from "@/components/Checkout/CheckoutSummery";
import Link from "next/link";
import PaymentMethods, {
  PaymentMethodsRef,
} from "@/components/Checkout/PaymentMethods";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContextNew";

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { cartItems } = useCart();
  const checkoutFormRef = useRef<CheckoutFormRef>(null);
  const paymentMethodsRef = useRef<PaymentMethodsRef>(null);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  // Calculate total for mobile order summary
  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      let priceStr =
        typeof item.salePrice === "string" && item.salePrice.trim().length > 0
          ? item.salePrice
          : item.originalPrice;
      const price = parseFloat(
        priceStr?.replace(/[^0-9,.-]+/g, "").replace(",", ".") || "0"
      );
      const originalTotal = price * item.quantity;
      const discountAmount = originalTotal * 0.1; // 10% discount per item
      const discountedTotal = originalTotal - discountAmount;
      return total + discountedTotal;
    }, 0);
  };

  // Unified validation handler
  const handlePaymentSubmit = async (paymentData: any) => {
    console.log("🔍 Starting unified validation...");

    // Validate BOTH forms simultaneously to show all errors
    console.log("📋 Validating CheckoutForm...");
    const deliveryValid = await checkoutFormRef.current?.triggerValidation();
    console.log("📋 CheckoutForm validation result:", deliveryValid);

    console.log("💳 Validating PaymentMethods...");
    const paymentValid = await paymentMethodsRef.current?.triggerValidation();
    console.log("💳 PaymentMethods validation result:", paymentValid);

    // If either form is invalid, show errors and scroll to top
    if (!deliveryValid || !paymentValid) {
      console.log(
        "❌ Validation failed - delivery:",
        deliveryValid,
        "payment:",
        paymentValid
      );
      console.log("📜 Scrolling to top to show all errors");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Both forms are valid, proceed with submission
    console.log("✅ Both forms valid, proceeding with submission");
    const deliveryData = checkoutFormRef.current?.getData();
    const paymentFormData = paymentMethodsRef.current?.getData();

    // Combined checkout data
    const checkoutData = {
      delivery: deliveryData,
      payment: paymentFormData,
    };

    // Submit to payment gateway / backend
    console.log("Complete Checkout Data:", checkoutData);
    alert(
      "Order submitted successfully!\n\n" +
        "Delivery: " +
        JSON.stringify(deliveryData, null, 2) +
        "\n\nPayment: " +
        JSON.stringify(paymentData, null, 2)
    );

    // TODO: Send to backend/payment gateway
  };

  return (
    <div className="bg-[#f5f5f5] w-full">
      <div className="pt-4 sm:pt-6">
        {/* Header */}
        <div className="max-w-5xl mx-auto w-full">
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

        {/* Horizontal separator - full width across screen */}
        <div className="w-full border-t border-gray-300 mt-4"></div>

        {/* Mobile Order Summary Header - Only visible on mobile */}
        <div className="block sm:hidden">
          <Collapsible
            open={isOrderSummaryOpen}
            onOpenChange={setIsOrderSummaryOpen}
          >
            <CollapsibleTrigger asChild>
              <div className="w-full bg-gray-200 px-4 py-6 flex items-center justify-between cursor-pointer hover:bg-gray-300 transition-colors border-b border-gray-300">
                <div className="flex items-center">
                  <span className="text-[#65bbe6] hover:text-[#65bbe6]/80 transition-colors duration-200 text-md font-medium mr-2">
                    {t("cartPage.orderSummary")}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-[#65bbe6] hover:text-[#65bbe6]/80 transition-transform duration-200 ${
                      isOrderSummaryOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                <span className="text-gray-900 font-bold text-lg">
                  €{getTotal().toFixed(2)}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-b border-gray-300 bg-gray-50">
              <div className="pt-4 px-4">
                <CheckoutSummery />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="max-w-5xl mx-auto w-full py-4 sm:py-8 flex flex-col sm:flex-row gap-4 sm:gap-0 relative px-4 sm:px-0">
          {/* Vertical separator - only visible on desktop */}
          <div className="hidden sm:block absolute left-[60%] top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>

          {/* Left: Form & Payment - 60% width */}
          <div className="w-full sm:w-[60%] sm:pr-10">
            <CheckoutForm ref={checkoutFormRef} />
            <div className="mt-8">
              {/* <CheckoutPayment /> */}

              {/* Payment methods section */}
              <PaymentMethods
                ref={paymentMethodsRef}
                onPaymentSubmit={handlePaymentSubmit}
              />
            </div>
          </div>

          {/* Right: Cart Summary - 40% width - Only visible on desktop */}
          <div className="hidden sm:block w-full sm:w-[40%] sm:pl-10 sm:sticky sm:top-0 sm:self-start">
            <CheckoutSummery />
          </div>
        </div>
      </div>
    </div>
  );
}
