
"use client";
import PaymentMethods from "@/components/Checkout/PaymentMethods";
// CheckoutPayment component: placeholder for payment gateway buttons

export default function CheckoutPayment() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex flex-col gap-4 mb-4">
        <button className="w-full bg-[#5a31f4] text-white font-bold py-3 rounded text-lg">shopPay</button>
        <button className="w-full bg-[#ffc439] text-black font-bold py-3 rounded text-lg">PayPal</button>
      </div>
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="mx-4 text-gray-400 font-bold">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {/* Payment methods section */}
      <PaymentMethods />
    </div>
  );
}
