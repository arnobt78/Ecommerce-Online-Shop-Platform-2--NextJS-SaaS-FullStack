"use client";

import ContactForm from "../../components/ContactPage/ContactForm";
import FaqSection from "../../components/ContactPage/FaqSection";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Gradient background on right */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 pointer-events-none z-0">
        <svg
          width="873"
          height="1688"
          viewBox="0 0 873 1688"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <g filter="url(#filter0_f_7939_620)">
            <rect
              x="277"
              y="277"
              width="1411"
              height="1411"
              rx="692.175"
              fill="#CEF6F8"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_7939_620"
              x="0.130157"
              y="0.130157"
              width="1964.74"
              height="1964.74"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="138.435"
                result="effect1_foregroundBlur_7939_620"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-4 pt-20 sm:pt-24 text-justify">
        <h1 className="text-center text-3xl sm:text-4xl font-semibold text-gray-900 mb-6 sm:mb-12">
          Contact Us
        </h1>
        {/* <h2 className="text-center text-xl sm:text-2xl font-medium text-gray-700 mb-6">
          We want to hear from you
        </h2> */}
        <p className="text-gray-600 mb-4">
          To contact our support team please fill out the form below including
          following information:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
          <li>
            <b>Your Name.</b>
          </li>
          <li>
            <b>Your Email.</b>
          </li>
          <li>
            <b>Order Number.</b>
          </li>
        </ul>
        <p className="text-gray-600 mb-8">
          By contacting our customer support team, you agree to our Privacy
          Policy. Thank you.
        </p>
        <ContactForm />
        <div className="mt-24">
          <FaqSection />
        </div>
      </main>
    </div>
  );
}
