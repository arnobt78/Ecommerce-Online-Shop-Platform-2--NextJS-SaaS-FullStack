"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContextNew";

export default function FaqSection() {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("contact.faq.shipping.question"),
      answer: t("contact.faq.shipping.answer"),
    },
    {
      question: t("contact.faq.delivery.question"),
      answer: t("contact.faq.delivery.answer"),
    },
    {
      question: t("contact.faq.refunds.question"),
      answer: t("contact.faq.refunds.answer"),
    },
    {
      question: t("contact.faq.response.question"),
      answer: t("contact.faq.response.answer"),
    },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {t("contact.faq.title")}
      </h3>
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
