"use client";
import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center px-4 py-10 sm:px-8 sm:py-16 rounded-xl shadow-2xl bg-[#01DAE3]/10">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#22223B] mb-4">404 - Page Not Found</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          Sorry, the page you are looking for doesn't exist.<br />
          Please check the URL.<br />
          Otherwise, please return to the home page.
        </p>
        <Link href="/" className="inline-block px-6 py-3 rounded-lg bg-[#01DAE3] text-white font-semibold  hover:text-gray-200 hover:bg-[#01DAE3]/80 transition-colors">
          Go to Home
        </Link>
        <div className="mt-8 text-sm text-gray-500">Thank you!</div>
      </div>
    </div>
  );
}
