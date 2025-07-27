"use client";

import Image from "next/image";
import ContactForm from "../../components/ContactPage/ContactForm";
import FaqSection from "../../components/ContactPage/FaqSection";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">

      {/* Gradient background on right */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 pointer-events-none z-0">
        <svg width="873" height="1688" viewBox="0 0 873 1688" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <g filter="url(#filter0_f_7939_620)">
            <rect x="277" y="277" width="1411" height="1411" rx="692.175" fill="#CEF6F8" />
          </g>
          <defs>
            <filter id="filter0_f_7939_620" x="0.130157" y="0.130157" width="1964.74" height="1964.74" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="138.435" result="effect1_foregroundBlur_7939_620" />
            </filter>
          </defs>
        </svg>
      </div>

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-4 pt-20 sm:pt-24 text-justify">
        <h1 className="text-center text-3xl sm:text-4xl font-semibold text-gray-900 mb-6 sm:mb-24">Contact Us</h1>
        <h2 className="text-center text-xl sm:text-2xl font-medium text-gray-700 mb-6">We want to hear from you</h2>
        <p className="text-gray-600 mb-4">
          To contact us at SNUZZ, please email <a href="mailto:hey@snuzz.com" className="text-teal-500 underline">hey@snuzz.com</a> or you can fill out the form below. Include the following information so we can help you handle your inquiry efficiently:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
          <li><b>Your Name:</b> Provide your full name for customer identification.</li>
          <li><b>Order Number:</b> If available, include the order number related to your inquiry or complaint.</li>
          <li><b>Relevant Images:</b> Attach any relevant images that can help us understand and resolve the issue, such as damaged goods or incorrect deliveries.</li>
        </ul>
        <p className="text-gray-600 mb-8">Providing these details will help us address your issue promptly and effectively. We look forward to hearing from you.</p>
        <ContactForm />
        <div className="mt-24">
          <FaqSection />
        </div>
      </main>
    </div>
  );
}


