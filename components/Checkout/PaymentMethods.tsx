"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CheckoutForm from "./CheckoutForm";

const schema = z.object({
  cardNumber: z.string().min(12, "Enter a card number").max(19),
  expiry: z.string().min(5, "Enter a valid expiration date").max(5),
  cvc: z
    .string()
    .min(3, "Enter the CVV or security code on your card required")
    .max(4),
  name: z
    .string()
    .min(1, "Enter your name exactly as it's written on your card"),
  useShipping: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const cardIcons = [
  { src: "/payment-icons/visa-card.svg", alt: "Visa" },
  { src: "/payment-icons/mastercard.svg", alt: "Mastercard" },
  { src: "/payment-icons/amex.svg", alt: "Amex" },
  // { src: "/payment-icons/discover.svg", alt: "Discover" },
  // { src: "/payment-icons/maestro.svg", alt: "Maestro" },
  // { src: "/payment-icons/apple-pay.svg", alt: "Apple Pay" },
  // { src: "/payment-icons/bank-transfer.svg", alt: "Bank Transfer" },
  // { src: "/payment-icons/ideal.svg", alt: "iDEAL" },
  { src: "/payment-icons/jcb.svg", alt: "JCB" },
  { src: "/payment-icons/unionpay.svg", alt: "UnionPay" },
  // { src: "/payment-icons/klarna.svg", alt: "Klarna" },
  // { src: "/payment-icons/mir.svg", alt: "MIR" },
  // { src: "/payment-icons/trustly.svg", alt: "Trustly" },
];

export default function PaymentMethods() {
  const [selected, setSelected] = useState("card");
  const [isMobile, setIsMobile] = useState(false);
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      useShipping: true,
      cardNumber: "",
      expiry: "",
      cvc: "",
      name: "",
    },
  });
  // Only run on client
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const visibleCount = isMobile ? 3 : 3;
  const hiddenCount = cardIcons.length - visibleCount;
  const hiddenIcons = cardIcons.slice(visibleCount);
  const onSubmit = (data: FormData) => {
    alert("Payment submitted: " + JSON.stringify(data));
  };
  return (
    <div className="mt-6">
      {/* Payment title */}
      <div className="flex flex-col px-4 sm:px-0">
        <h3 className="text-lg font-bold mb-1">Payment</h3>
        <p className="text-sm text-gray-500 mb-4">
          All transactions are secure and encrypted.
        </p>
      </div>

      {/* Card Option */}
      <div className="border rounded-xl">
        <div
          className={`flex items-center px-4 py-3 border-b ${
            selected === "card" ? "bg-[#65bbe6]/10" : "bg-white"
          }`}
        >
          <input
            type="radio"
            id="card"
            name="payment-method"
            checked={selected === "card"}
            onChange={() => setSelected("card")}
            className="accent-black mr-2"
          />
          <label
            htmlFor="card"
            className={`${
              selected === "card"
                ? "font-medium text-gray-900"
                : "font-normal text-gray-900"
            } flex-1 cursor-pointer`}
          >
            Credit Card
          </label>
          <div className="flex items-center gap-2 relative group">
            {/* Show 2 icons on mobile, 6 on sm+ */}
            {cardIcons.slice(0, visibleCount).map((icon) => (
              <Image
                key={icon.alt}
                src={icon.src}
                alt={icon.alt}
                width={40}
                height={40}
                className={`h-8 w-10 object-cover border-2 border-gray-200 rounded shadow-xl${
                  isMobile ? "" : " hidden sm:inline-block"
                }`}
              />
            ))}
            {/* Dynamic +N badge and Shadcn tooltip */}
            {hiddenCount > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs bg-black text-white/80 hover:text-[#65bbe6] h-8 w-10 rounded cursor-pointer hover:bg-gray-900 transition-colors text-md font-bold flex items-center justify-center">
                      +{hiddenCount}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white p-2 rounded-lg shadow-xl">
                    <div className="grid grid-cols-2 gap-2 min-w-[80px]">
                      {hiddenIcons.map((icon) => (
                        <Image
                          key={icon.alt}
                          src={icon.src}
                          alt={icon.alt}
                          width={40}
                          height={40}
                          className="h-6 w-10 object-cover border-2 border-gray-200 rounded shadow-xl"
                        />
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        {selected === "card" && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 pt-4 pb-2 bg-gray-50"
          >
            <div className="mb-4">
              <div className="relative">
                <input
                  {...register("cardNumber")}
                  placeholder="Card number"
                  className={`w-full border rounded px-3 py-2 pr-10 text-gray-900 text-md${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  maxLength={19}
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.cardNumber && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    {...register("expiry")}
                    placeholder="Expiration date"
                    className={`w-full border rounded px-3 py-2 pr-8 text-gray-900 text-md${
                      errors.expiry ? "border-red-500" : "border-gray-300"
                    }`}
                    maxLength={5}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold pointer-events-none">
                    MM/YY
                  </span>
                </div>
                {errors.expiry && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.expiry.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <div className="relative">
                  <input
                    {...register("cvc")}
                    placeholder="Security code"
                    className={`w-full border rounded px-3 py-2 pr-8 text-gray-900 text-md${
                      errors.cvc ? "border-red-500" : "border-gray-300"
                    }`}
                    maxLength={4}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-help pointer-events-auto" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-black text-white p-3 max-w-xs text-xs">
                        <p className="text-xs text-white justify-center text-justify">
                          3-digit security code usually found on the back of
                          your card. American Express cards have a 4-digit code
                          located on the front.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {errors.cvc && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.cvc.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  {...register("name")}
                  placeholder="Name on card"
                  className={`w-full border rounded px-3 py-2 pr-10 text-gray-900 text-md${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Use shipping address as billing address checkbox */}
            <Collapsible
              open={!useShippingAddress}
              onOpenChange={(open) => setUseShippingAddress(!open)}
            >
              <CollapsibleTrigger asChild>
                <label className="flex items-center mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("useShipping")}
                    className="accent-black mr-2"
                    checked={useShippingAddress}
                    onChange={(e) => setUseShippingAddress(e.target.checked)}
                  />
                  <span className="text-sm">
                    Use shipping address as billing address
                  </span>
                </label>
              </CollapsibleTrigger>
              <CollapsibleContent className="mb-6">
                <CheckoutForm
                  title="Billing Address"
                  showFormWrapper={false}
                  showContactSection={false}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* Secure and encrypted text */}
            <div className="flex items-center mb-2 text-gray-400 text-sm">
              <Lock className=" w-4 h-4 mr-2 text-gray-400 text-sm" /> Secure
              and encrypted
            </div>

            {/* Pay Now button */}
            <button
              type="submit"
              className="w-full bg-[#65bbe6]/60 hover:bg-[#65bbe6] transition transform duration-200 cursor-pointer text-gray-900 py-3 rounded-lg text-md font-bold flex items-center justify-center"
            >
              {/* <Lock className="w-4 h-4 mr-1" /> Pay Now */}
              Pay Now
            </button>

            {/* Legal Text */}
            <div className="mt-4 text-sm text-gray-600 leading-relaxed text-justify">
              <p>
                By clicking "Pay now" you agree to ourTerms and Conditions,
                Refund Policy, Privacy Policy, Cookie Policy and other
                applicable policies. You are enrolling in recurring billing
                program on snuzz PRO platform, if you don't cancel prior to the
                end of 3-day free trial you will be charged $9.99 every 14 days.
                You can terminate snuzz PRO plan at anytime, in your account. If
                you would have any questions please contact our{" "}
                <a
                  href="/contact"
                  className="text-gray-600 underline hover:text-gray-800"
                >
                  support team
                </a>
                .
              </p>
            </div>

            {/* Separator Line */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Policy Links */}
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href="/terms"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Terms and Conditions
              </a>
              <a
                href="/refund-policy"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Refund Policy
              </a>
              <a
                href="/privacy-policy"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Privacy Policy
              </a>
              <a
                href="/cookie-policy"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Cookie Policy
              </a>
              <a
                href="/contact"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Support Team
              </a>
            </div>
          </form>
        )}

        {/* Klarna Option */}
        {/* <div
          className={`border-t border-b ${
            selected === "klarna" ? "bg-pink-50" : "bg-white"
          }`}
        >
          <div className="flex items-center px-4 py-3">
            <input
              type="radio"
              id="klarna"
              name="payment-method"
              checked={selected === "klarna"}
              onChange={() => setSelected("klarna")}
              className="accent-pink-500 mr-2"
            />
            <label
              htmlFor="klarna"
              className={`${
                selected === "klarna" ? "font-semibold" : "font-normal"
              } flex-1 cursor-pointer`}
            >
              Klarna - Pay now or later
            </label>
            <Image
              src={cardIcons.find((icon) => icon.alt === "Klarna")?.src || ""}
              alt="Klarna"
              width={40}
              height={32}
              className="h-8 w-10 object-cover bg-white rounded shadow border border-gray-200"
            />
          </div>
          {selected === "klarna" && (
            <div className="flex flex-col items-center px-4 pb-6 pt-2 text-center animate-fade-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-252.3 356.1 163 80.9"
                className="w-36 h-36"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                  d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"
                ></path>
                <circle
                  cx="-227.8"
                  cy="361.9"
                  r="1.8"
                  fill="currentColor"
                ></circle>
                <circle
                  cx="-222.2"
                  cy="361.9"
                  r="1.8"
                  fill="currentColor"
                ></circle>
                <circle
                  cx="-216.6"
                  cy="361.9"
                  r="1.8"
                  fill="currentColor"
                ></circle>
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                  d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"
                ></path>
              </svg>
              <p className="text-sm text-gray-700 mb-1">
                After you review your order, you will be redirected to Klarna to
                securely complete your purchase.
              </p>
            </div>
          )}
        </div> */}

        {/* Online Bank Transfer Option */}
        {/* <div
          className={`border-b ${
            selected === "bank" ? "bg-blue-50" : "bg-white"
          }`}
        >
          <div className="flex items-center px-4 py-3">
            <input
              type="radio"
              id="bank"
              name="payment-method"
              checked={selected === "bank"}
              onChange={() => setSelected("bank")}
              className="accent-blue-500 mr-2"
            />
            <label
              htmlFor="bank"
              className={`${
                selected === "bank" ? "font-semibold" : "font-normal"
              } flex-1 cursor-pointer`}
            >
              Online Bank Transfer
            </label>
            <Image
              src={
                cardIcons.find((icon) => icon.alt === "Bank Transfer")?.src ||
                ""
              }
              alt="Bank Transfer"
              width={40}
              height={32}
              className="h-8 w-10 object-cover bg-white rounded shadow border border-gray-200"
            />
          </div>
          {selected === "bank" && (
            <div className="px-6 pb-6 pt-2 animate-fade-in">
              <div className="mb-3">
                <span className="block font-medium mb-2">
                  Select payment method:
                </span>
                <div className="border rounded-xl p-4 flex items-center justify-between max-w-xs mx-auto bg-white">
                  <div className="flex items-center">
                    <Image
                      src={
                        cardIcons.find((icon) => icon.alt === "Trustly")?.src ||
                        ""
                      }
                      alt="Trustly"
                      width={130}
                      height={40}
                      className="h-10 sm:h-14 max-w-[130px] sm:max-w-[280px] object-contain bg-white rounded px-2"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-2 text-center">
                After you click "Buy now", you will be redirected to Trustly to
                securely complete your purchase.
              </p>
            </div>
          )}
        </div> */}

        {/* Wire Transfer Option */}
        {/* <div className={`${selected === "wire" ? "bg-yellow-50" : "bg-white"}`}>
          <div className="flex items-center px-4 py-3">
            <input
              type="radio"
              id="wire"
              name="payment-method"
              checked={selected === "wire"}
              onChange={() => setSelected("wire")}
              className="accent-blue-500 mr-2"
            />
            <label
              htmlFor="wire"
              className={`${
                selected === "wire" ? "font-semibold" : "font-normal"
              } flex-1 cursor-pointer`}
            >
              Wire Transfer
            </label>
            <Image
              src={cardIcons.find((icon) => icon.alt === "iDEAL")?.src || ""}
              alt="iDEAL"
              width={40}
              height={32}
              className="h-8 w-10 object-cover bg-white rounded shadow border border-gray-200"
            />
          </div>
          {selected === "wire" && (
            <div className="px-6 pb-6 pt-2 animate-fade-in">
              <p className="text-sm text-gray-700 mb-1">
                After you complete your order, you will receive payment
                instructions for the wire transfer.
              </p>
              <p className="text-xs text-gray-600">
                → Important: Your order will be shipped after your payment is
                received.
              </p>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
