import { ChevronDown, ArrowRight, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

// FooterSection
interface FooterSectionProps {
  title: string;
  items: string[];
  open: boolean;
  onToggle: () => void;
  sectionKey: string;
}

export function FooterSection({
  title,
  items,
  open,
  onToggle,
  sectionKey,
}: FooterSectionProps) {
  const router = useRouter();

  return (
    <div className="text-center sm:text-left">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full sm:pointer-events-none"
      >
        <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-base md:text-lg">
          {title}
        </h4>
        <ChevronDown
          className={`w-4 h-4 sm:hidden transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <ul
        className={`space-y-2 md:space-y-3 text-gray-600 sm:block ${
          open ? "block" : "hidden sm:block"
        }`}
      >
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="transition-colors text-sm md:text-base hover:text-gray-900 block py-1"
              onClick={() => {
                // Handle navigation for terms, privacy, refund, and FAQ links
                if (item === "Terms of Service") router.push("/terms");
                if (item === "Privacy Policy") router.push("/terms");
                if (item === "Refund Policy") router.push("/contact");
                if (item === "FAQ") router.push("/contact");

                // handle navigation for products, flavours, and strengths
                if (item === "Brands") router.push("/products");
                if (item === "Flavours") router.push("/products");
                if (item === "Strength") router.push("/products");
                if (item === "Snuzz PRO") router.push("/pro");

                // handle navigation for favorites in product detail
                if (item === "ZYN Apple Mint")
                  router.push("/product-detail/zyn-apple-mint-mini");
                if (item === "VELO Peppermint Storm")
                  router.push("/product-detail/velo-peppermint-storm");
                if (item === "Killa Grape Ice")
                  router.push("/product-detail/killa-grape-ice");
                if (item === "Puff & Pouch Grape")
                  router.push("/product-detail/puff-pouch-grape");
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// FooterContact
interface FooterContactProps {
  open: boolean;
  onToggle: () => void;
}

export function FooterContact({ open, onToggle }: FooterContactProps) {
  const router = useRouter();

  return (
    <div className="text-center sm:text-left flex flex-col justify-center items-center h-full min-h-[120px]">
      {/* <button
        onClick={onToggle}
        className="flex items-center justify-between w-full sm:pointer-events-none"
      >
        <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-base md:text-lg">Contact Us</h4>
        <ChevronDown className={`w-4 h-4 sm:hidden transition-transform ${open ? 'rotate-180' : ''}`} />
      </button> */}
      <div className={`sm:block ${open ? "block" : "block sm:block"}`}>
        <Button
          variant="ghost"
          className="h-auto px-4 sm:px-6 py-2 sm:py-2 border border-teal-400 rounded-sm text-gray-600 hover:text-gray-900 font-normal text-xs sm:text-sm md:text-base justify-center sm:justify-start group"
          onClick={() => {
            router.push("/contact");
          }}
        >
          Contact support
          <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

// FooterLogoSocial
export function FooterLogoSocial() {
  return (
    <div className="sm:col-span-2 lg:col-span-1 text-center flex flex-col justify-center items-center h-full min-h-[120px]">
      <a href="/" aria-label="Go to homepage">
        <img
          src="/logo.svg"
          alt="SNUZZ"
          className="h-10 w-auto mb-4 sm:mb-6 mx-auto mt-4 sm:mt-8"
        />
      </a>
      <div className="flex gap-2 sm:gap-1 justify-center items-center">
        {[Instagram, Facebook].map((Icon, i) => (
          <div
            key={i}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer hover:bg-gray-200"
          >
            <Icon className="w-5 h-5 sm:w-5 sm:h-5 text-black" />
          </div>
        ))}
      </div>
    </div>
  );
}

// FooterPayments
interface Payment {
  name: string;
  image: string;
}

const payments: Payment[] = [
  { name: "VISA", image: "/visa.png" },
  { name: "MASTERCARD", image: "/mastercard.png" },
];

export function FooterPayments() {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
      {payments.map((payment, i) => (
        <div
          key={i}
          className="w-10 sm:w-8 md:w-10 h-6 sm:h-5 md:h-6 rounded flex items-center justify-center bg-white shadow-sm border border-gray-200"
        >
          <img
            src={payment.image}
            alt={payment.name}
            className="size-5 object-contain"
          />
        </div>
      ))}
    </div>
  );
}

// FooterCopyright
export function FooterCopyright() {
  return (
    <p className="text-gray-500 text-xs md:text-sm text-center sm:text-right">
      © Snuzz {new Date().getUTCFullYear()}. All Rights Reserved.
    </p>
  );
}
