"use client";


import { useState } from "react";

export default function FaqSection() {
  const faqs = [
    { question: "How do I contact SNUZZ support", answer: "You can email us at hey@snuzz.com or use the contact form above. Please include your name, order number, and any relevant images." },
     { question: "How long does it take to get a response?", answer: "We aim to respond to all inquiries within 24-48 hours." },
    { question: "What information should I provide for order issues?", answer: "Please provide your full name, order number, and a detailed description of the issue." },
    { question: "What is your return policy?", answer: "Our return policy allows for returns within 30 days of receipt. Items must be in original condition." },
    { question: "How can I track my order?", answer: "You can track your order using the tracking link provided in your confirmation email." },
    { question: "Do you offer international shipping?", answer: "Yes, we offer international shipping to select countries. Please check our shipping policy for more details." },
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


function FaqItem({ question, answer, open, onClick, isFirst, isLast }: {
  question: string;
  answer: string;
  open: boolean;
  onClick: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className={
      `flex flex-col` +
      (isLast ? '' : ' border-b border-gray-400')
    }>
      <button
        className="flex items-center w-full py-4 px-0 text-left focus:outline-none group"
        onClick={onClick}
        aria-expanded={open}
        style={{ fontWeight: isFirst ? 400 : 400 }}
      >
        <span className={
          `flex-1 text-base md:text-lg text-gray-900` +
          (isFirst ? ' font-normal' : ' font-normal')
        }>{question}</span>
        <span className="ml-2">
          <svg
            className={`w-6 h-6 text-gray-700 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pl-0 pr-8 pb-4 text-gray-700 text-base md:text-lg animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
}
