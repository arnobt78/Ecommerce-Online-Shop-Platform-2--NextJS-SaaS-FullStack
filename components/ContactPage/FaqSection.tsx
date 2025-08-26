"use client";

import { useState } from "react";

export default function FaqSection() {
  const faqs = [
    {
      question: "Do you ship worldwide?",
      answer:
        "We are focused on the European market however, we can ship to other regions. Please note that shipping prices will be calculated based on your address.",
    },
    {
      question: "How long will my order take to arrive?",
      answer:
        "Orders typically arrive within 1-5 business days, depending on the type of shipping you chose and your location.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, in Europe consumers have a 14-day right of withdrawal, allowing them to return goods purchased online without providing a reason. This right ensures a full refund, including shipping costs, unless the item is returned damaged or used. Please be aware that we do not provide refunds for snuzz PRO platform, due to their digital nature. We understand that life can be unpredictable, and exceptional circumstances may arise that warrant consideration on a case-by-case basis. If you believe your situation warrants for an exception to our refund policy, please contact our support team.",
    },
    {
      question: "How long does it take to get answer?",
      answer:
        "Usually our support team will reply to your message in about 24 hours.",
    },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h3>
      <div className="bg-transparent">
        {faqs.map((faq, idx) => (
          <FaqItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
            open={open === idx}
            onClick={() => setOpen(open === idx ? null : idx)}
            isFirst={idx === 0}
            isLast={idx === faqs.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
  open,
  onClick,
  isFirst,
  isLast,
}: {
  question: string;
  answer: string;
  open: boolean;
  onClick: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className={`flex flex-col` + (isLast ? "" : " border-b border-gray-400")}
    >
      <button
        className="flex items-center w-full py-4 px-0 text-left focus:outline-none group"
        onClick={onClick}
        aria-expanded={open}
        style={{ fontWeight: isFirst ? 400 : 400 }}
      >
        <span
          className={
            `flex-1 text-base sm:text-md text-gray-900` +
            (isFirst ? " font-normal" : " font-normal")
          }
        >
          {question}
        </span>
        <span className="ml-2">
          <svg
            className={`w-6 h-6 text-gray-700 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pl-0 pr-8 pb-4 text-gray-700 text-base sm:text-md animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
}
