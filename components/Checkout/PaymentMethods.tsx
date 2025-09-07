"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock, Info } from "lucide-react";

const schema = z.object({
  cardNumber: z.string().min(12, "Card number required").max(19),
  expiry: z.string().min(5, "MM/YY required").max(5),
  cvc: z.string().min(3, "CVC required").max(4),
  name: z.string().min(1, "Name required"),
  useShipping: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const cardIcons = [
  { src: "/payment-icons/visa-card.svg", alt: "Visa" },
  { src: "/payment-icons/mastercard.svg", alt: "Mastercard" },
  { src: "/payment-icons/amex.svg", alt: "Amex" },
  { src: "/payment-icons/discover.svg", alt: "Discover" },
  { src: "/payment-icons/maestro.svg", alt: "Maestro" },
  { src: "/payment-icons/apple-pay.svg", alt: "Apple Pay" },
  { src: "/payment-icons/bank-transfer.svg", alt: "Bank Transfer" },
  { src: "/payment-icons/ideal.svg", alt: "iDEAL" },
  { src: "/payment-icons/jcb.svg", alt: "JCB" },
  { src: "/payment-icons/klarna.svg", alt: "Klarna" },
  { src: "/payment-icons/mir.svg", alt: "MIR" },
  { src: "/payment-icons/trustly.svg", alt: "Trustly" },
];

export default function PaymentMethods() {
  const [selected, setSelected] = useState("card");
  const [isMobile, setIsMobile] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { useShipping: true },
  });
  // Only run on client
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const visibleCount = isMobile ? 2 : 6;
  const hiddenCount = cardIcons.length - visibleCount;
  const hiddenIcons = cardIcons.slice(visibleCount);
  const onSubmit = (data: FormData) => {
    alert("Payment submitted: " + JSON.stringify(data));
  };
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-1">Payment</h3>
      <p className="text-xs text-gray-500 mb-4">
        All transactions are secure and encrypted.
      </p>
      <div className="border rounded-xl overflow-hidden">
        {/* Card Option */}
        <div
          className={`flex items-center px-4 py-3 border-b ${
            selected === "card" ? "bg-gray-50" : "bg-white"
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
              selected === "card" ? "font-semibold" : "font-normal"
            } flex-1 cursor-pointer`}
          >
            Credit Card
          </label>
          <div className="flex items-center gap-1 relative group">
            {/* Show 2 icons on mobile, 6 on sm+ */}
            {cardIcons.slice(0, visibleCount).map((icon) => (
              <Image
                key={icon.alt}
                src={icon.src}
                alt={icon.alt}
                width={40}
                height={32}
                className={`h-8 w-10 object-cover border border-gray-200 rounded${
                  isMobile ? "" : " hidden sm:inline-block"
                }`}
              />
            ))}
            {/* Dynamic +N badge and hover tooltip */}
            {hiddenCount > 0 && (
              <div className="ml-1 relative">
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded cursor-pointer group-hover:bg-gray-300 transition-colors">
                  +{hiddenCount}
                </span>
                <div className="absolute -left-3 -translate-x-1/2 top-6 z-20 hidden group-hover:flex flex-col items-center">
                  <div className="bg-gray-700 text-white rounded-lg shadow-lg p-2 grid grid-cols-3 gap-2 min-w-[120px]">
                    {hiddenIcons.map((icon) => (
                      <Image
                        key={icon.alt}
                        src={icon.src}
                        alt={icon.alt}
                        width={40}
                        height={32}
                        className="h-8 w-10 object-cover bg-white rounded p-1"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {selected === "card" && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-4 pt-4 pb-2 bg-gray-50"
          >
            <div className="mb-3 relative">
              <input
                {...register("cardNumber")}
                placeholder="Card number"
                className={`w-full border rounded px-3 py-2 pr-10 ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300"
                }`}
                maxLength={19}
              />
              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              {errors.cardNumber && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div className="flex gap-2 mb-3">
              <div className="flex-1 relative">
                <input
                  {...register("expiry")}
                  placeholder="MM/YY"
                  className={`w-full border rounded px-3 py-2 pr-8 ${
                    errors.expiry ? "border-red-500" : "border-gray-300"
                  }`}
                  maxLength={5}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  MM/YY
                </span>
                {errors.expiry && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.expiry.message}
                  </p>
                )}
              </div>
              <div className="flex-1 relative">
                <input
                  {...register("cvc")}
                  placeholder="CVC"
                  className={`w-full border rounded px-3 py-2 pr-8 ${
                    errors.cvc ? "border-red-500" : "border-gray-300"
                  }`}
                  maxLength={4}
                />
                <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {errors.cvc && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.cvc.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-3">
              <input
                {...register("name")}
                placeholder="Name on card"
                className={`w-full border rounded px-3 py-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <label className="flex items-center mb-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("useShipping")}
                className="accent-black mr-2"
                defaultChecked
              />
              <span className="text-sm">
                Use shipping address as billing address
              </span>
            </label>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded font-bold flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 mr-1" /> Pay Securely
            </button>
          </form>
        )}
        {/* Klarna Option */}
        <div
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
        </div>
        {/* Online Bank Transfer Option */}
        <div
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
        </div>
        {/* Wire Transfer Option */}
        <div className={`${selected === "wire" ? "bg-yellow-50" : "bg-white"}`}>
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
        </div>
      </div>
    </div>
  );
}
