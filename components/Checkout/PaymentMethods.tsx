"use client";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock, Info } from "lucide-react";
import { useMediaQuery } from "../../hooks/use-media-query";
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
import CheckoutSummery from "./CheckoutSummery";
import { useLanguage } from "@/context/LanguageContextNew";

// Function to create schema with translations
const createSchema = (t: (key: string) => string) =>
  z.object({
    cardNumber: z
      .string()
      .min(12, t("checkoutPage.payment.errors.cardNumber"))
      .max(19),
    expiry: z.string().min(5, t("checkoutPage.payment.errors.expiry")).max(5),
    cvc: z.string().min(3, t("checkoutPage.payment.errors.cvc")).max(4),
    name: z.string().min(1, t("checkoutPage.payment.errors.name")),
    useShipping: z.boolean().optional(),
  });

type FormData = z.infer<ReturnType<typeof createSchema>>;

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

export interface PaymentMethodsRef {
  triggerValidation: () => Promise<boolean>;
  getData: () => FormData | null;
  submitPayment: () => void;
}

interface PaymentMethodsProps {
  onPaymentSubmit?: (data: FormData) => void;
}

const PaymentMethods = forwardRef<PaymentMethodsRef, PaymentMethodsProps>(
  ({ onPaymentSubmit }, ref) => {
    const { t } = useLanguage();
    const [selected, setSelected] = useState("card");
    const [isMobile, setIsMobile] = useState(false);
    const [useShippingAddress, setUseShippingAddress] = useState(true);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isPaymentIconsTooltipOpen, setIsPaymentIconsTooltipOpen] =
      useState(false);
    const isMobileDevice = useMediaQuery("(max-width: 768px)");
    const tooltipRef = useRef<HTMLDivElement>(null);
    const paymentIconsTooltipRef = useRef<HTMLDivElement>(null);

    // Close CVC tooltip when clicking outside on mobile
    useEffect(() => {
      if (!isMobileDevice || !isTooltipOpen) return;

      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
          tooltipRef.current &&
          !tooltipRef.current.contains(event.target as Node)
        ) {
          setIsTooltipOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }, [isMobileDevice, isTooltipOpen]);

    // Close payment icons tooltip when clicking outside on mobile
    useEffect(() => {
      if (!isMobileDevice || !isPaymentIconsTooltipOpen) return;

      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
          paymentIconsTooltipRef.current &&
          !paymentIconsTooltipRef.current.contains(event.target as Node)
        ) {
          setIsPaymentIconsTooltipOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }, [isMobileDevice, isPaymentIconsTooltipOpen]);
    const {
      register,
      handleSubmit,
      formState: { errors },
      trigger,
      getValues,
      watch,
    } = useForm<FormData>({
      resolver: zodResolver(createSchema(t)),
      defaultValues: {
        useShipping: true,
        cardNumber: "",
        expiry: "",
        cvc: "",
        name: "",
      },
    });

    // Watch all form fields to hide error messages when user starts typing
    const watchedValues = watch();

    // Expose validation method to parent component
    useImperativeHandle(ref, () => ({
      triggerValidation: async () => {
        const isValid = await trigger();
        return isValid;
      },
      getData: () => {
        const values = getValues();
        return values;
      },
      submitPayment: () => {
        handleSubmit(onSubmit)();
      },
    }));
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
      console.log("🔍 PaymentMethods onSubmit called with data:", data);
      if (onPaymentSubmit) {
        console.log("🔍 Calling parent onPaymentSubmit");
        onPaymentSubmit(data);
      } else {
        console.log("🔍 No parent onPaymentSubmit, using default alert");
        alert("Payment submitted: " + JSON.stringify(data));
      }
    };
    return (
      <div className="mt-6">
        {/* Payment title */}
        <div className="flex flex-col px-4 sm:px-0">
          <h3 className="text-lg font-bold mb-1">
            {t("checkoutPage.payment.title")}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {t("checkoutPage.payment.secure")}
          </p>
        </div>

        {/* Card Option */}
        <div className="border border-gray-200 rounded-xl">
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
              {t("checkoutPage.payment.creditCard")}
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
                <div ref={paymentIconsTooltipRef}>
                  <TooltipProvider>
                    <Tooltip
                      open={
                        isMobileDevice ? isPaymentIconsTooltipOpen : undefined
                      }
                      onOpenChange={
                        isMobileDevice
                          ? setIsPaymentIconsTooltipOpen
                          : undefined
                      }
                    >
                      <TooltipTrigger asChild>
                        <span
                          className="text-xs bg-black text-white/80 hover:text-[#65bbe6] h-8 w-10 rounded cursor-pointer hover:bg-gray-900 transition-colors text-md font-bold flex items-center justify-center"
                          onClick={
                            isMobileDevice
                              ? () =>
                                  setIsPaymentIconsTooltipOpen(
                                    !isPaymentIconsTooltipOpen
                                  )
                              : undefined
                          }
                        >
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
                </div>
              )}
            </div>
          </div>
          {selected === "card" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("🔍 PaymentMethods form submitted");
                // Always call the parent handler, regardless of validation
                if (onPaymentSubmit) {
                  console.log("🔍 Calling parent onPaymentSubmit directly");
                  const formData = getValues();
                  onPaymentSubmit(formData);
                } else {
                  // Fallback to normal form submission
                  handleSubmit(onSubmit)(e);
                }
              }}
              className="px-4 pt-4 pb-2 bg-gray-50"
            >
              <div className="mb-4">
                <div className="relative">
                  <input
                    {...register("cardNumber")}
                    placeholder=" "
                    autoComplete="off"
                    className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 pr-10 text-gray-900 text-md ${
                      errors.cardNumber && !watchedValues.cardNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    maxLength={19}
                  />
                  {/* Floating Label */}
                  <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                    {t("checkoutPage.payment.cardNumber")}
                  </label>
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.cardNumber && !watchedValues.cardNumber && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      {...register("expiry")}
                      placeholder=" "
                      autoComplete="off"
                      className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 pr-8 text-gray-900 text-md ${
                        errors.expiry && !watchedValues.expiry
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      maxLength={5}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                        if (value.length >= 2) {
                          value =
                            value.substring(0, 2) + "/" + value.substring(2, 4);
                        }
                        e.target.value = value;
                        // Update the form state
                        const { onChange } = register("expiry");
                        onChange(e);
                      }}
                    />
                    {/* Floating Label */}
                    <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                      {t("checkoutPage.payment.expirationDate")}
                    </label>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm font-semibold pointer-events-none">
                      MM/YY
                    </span>
                  </div>
                  {errors.expiry && !watchedValues.expiry && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.expiry.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <input
                      {...register("cvc")}
                      placeholder=" "
                      autoComplete="off"
                      className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 pr-8 text-gray-900 text-md ${
                        errors.cvc && !watchedValues.cvc
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      maxLength={4}
                    />
                    {/* Floating Label */}
                    <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                      {t("checkoutPage.payment.securityCode")}
                    </label>
                    <div ref={tooltipRef}>
                      <TooltipProvider>
                        <Tooltip
                          open={isMobileDevice ? isTooltipOpen : undefined}
                          onOpenChange={
                            isMobileDevice ? setIsTooltipOpen : undefined
                          }
                        >
                          <TooltipTrigger asChild>
                            <Info
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-help pointer-events-auto"
                              onClick={
                                isMobileDevice
                                  ? () => setIsTooltipOpen(!isTooltipOpen)
                                  : undefined
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-black text-white p-3 max-w-xs text-xs">
                            <p className="text-xs text-white justify-center text-justify">
                              {t("checkoutPage.payment.securityCodeTooltip")}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  {errors.cvc && !watchedValues.cvc && (
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
                    placeholder=" "
                    autoComplete="off"
                    className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 pr-10 text-gray-900 text-md ${
                      errors.name && !watchedValues.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {/* Floating Label */}
                  <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                    {t("checkoutPage.payment.nameOnCard")}
                  </label>
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.name && !watchedValues.name && (
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
                  <label className="flex items-center mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("useShipping")}
                      className="accent-black mr-2"
                      checked={useShippingAddress}
                      onChange={(e) => setUseShippingAddress(e.target.checked)}
                    />
                    <span className="text-sm">
                      {t("checkoutPage.payment.useShippingAddress")}
                    </span>
                  </label>
                </CollapsibleTrigger>
                <CollapsibleContent className="mb-2">
                  <CheckoutForm
                    title={t("checkoutPage.payment.billingAddress")}
                    showFormWrapper={false}
                    showContactSection={false}
                  />
                </CollapsibleContent>
              </Collapsible>
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

        {/* Secure and encrypted text */}
        <div className="flex items-center justify-center mt-2 mb-2 text-gray-400 text-sm">
          <Lock className=" w-4 h-4 mr-2 text-gray-400 text-sm" />{" "}
          {t("checkoutPage.payment.secureEncrypted")}
        </div>

        {/* Right: Cart Summary - 40% width - Only visible on desktop */}
        <div className="block sm:hidden w-full mt-4">
          <CheckoutSummery />
        </div>

        {/* Pay Now button */}
        <button
          type="button"
          onClick={() => {
            console.log("🔍 Pay Now button clicked");
            // Always call parent onPaymentSubmit to trigger unified validation
            // The parent will validate both forms and show all errors
            if (onPaymentSubmit) {
              console.log("🔍 Calling parent onPaymentSubmit directly");
              const formData = getValues();
              onPaymentSubmit(formData);
            } else {
              console.log(
                "🔍 No parent onPaymentSubmit, using form validation"
              );
              // Fallback: validate and submit normally
              handleSubmit(onSubmit)();
            }
          }}
          className="w-full bg-[#65bbe6]/60 hover:bg-[#65bbe6] transition transform duration-200 cursor-pointer text-gray-900 py-3 rounded-lg text-md font-bold flex items-center justify-center"
        >
          {/* <Lock className="w-4 h-4 mr-1" /> Pay Now */}
          {t("checkoutPage.payment.payNow")}
        </button>

        {/* Legal Text */}
        <div className="mt-4 text-sm text-gray-600 leading-relaxed text-left sm:text-justify">
          <p>
            {t("checkoutPage.payment.legalText")}{" "}
            <a
              href="/contact"
              className="text-gray-600 underline hover:text-gray-800"
            >
              {t("checkoutPage.payment.supportTeam")}
            </a>
            .
          </p>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Policy Links */}
        <div className="flex flex-wrap gap-4 text-sm items-center justify-center">
          <a
            href="/terms"
            className="text-[#8EF7FB] font-semibold text-md underline hover:text-[#65bbe6]"
          >
            {t("checkoutPage.payment.termsConditions")}
          </a>
          <a
            href="/refund-policy"
            className="text-[#8EF7FB] font-semibold text-md underline hover:text-[#65bbe6]"
          >
            {t("checkoutPage.payment.refundPolicy")}
          </a>
          <a
            href="/privacy-policy"
            className="text-[#8EF7FB] font-semibold text-md underline hover:text-[#65bbe6]"
          >
            {t("checkoutPage.payment.privacyPolicy")}
          </a>
          <a
            href="/cookie-policy"
            className="text-[#8EF7FB] font-semibold text-md underline hover:text-[#65bbe6]"
          >
            {t("checkoutPage.payment.cookiePolicy")}
          </a>
          <a
            href="/contact"
            className="text-[#8EF7FB] font-semibold text-md underline hover:text-[#65bbe6]"
          >
            {t("checkoutPage.payment.supportTeam")}
          </a>
        </div>
      </div>
    );
  }
);

PaymentMethods.displayName = "PaymentMethods";

export default PaymentMethods;
