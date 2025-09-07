"use client";
import { useState } from "react";
import { z } from "zod";
import { useLanguage } from "@/context/LanguageContextNew";
export default function ContactForm() {
  const { t } = useLanguage();

  const ContactSchema = z.object({
    name: z.string().min(2, t("contact.validation.nameRequired")),
    email: z.string().email(t("contact.validation.emailInvalid")),
    orderNumber: z.string().min(1, t("contact.validation.orderNumberRequired")),
    message: z.string().min(5, t("contact.validation.messageRequired")),
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    orderNumber: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    orderNumber?: string;
    message?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  const [apiError, setApiError] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = ContactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: {
        name?: string;
        email?: string;
        orderNumber?: string;
        message?: string;
      } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0])
          fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
      });
      setErrors(fieldErrors);
      setSubmitted(false);
      setApiError(null);
      return;
    }
    setErrors({});
    setApiError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setApiError(null);
        setForm({ name: "", email: "", orderNumber: "", message: "" });
      } else {
        setSubmitted(false);
        setApiError(t("contact.form.error"));
      }
    } catch (err) {
      setSubmitted(false);
      setApiError(t("contact.form.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-normal text-gray-700 mb-1">
            {t("contact.form.name")}
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder={t("contact.form.namePlaceholder")}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <div className="text-xs text-red-500 mt-1">{errors.name}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-normal text-gray-700 mb-1">
            {t("contact.form.email")}
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder={t("contact.form.emailPlaceholder")}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <div className="text-xs text-red-500 mt-1">{errors.email}</div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-normal text-gray-700 mb-1">
          {t("contact.form.orderNumber")}
        </label>
        <input
          type="text"
          name="orderNumber"
          value={form.orderNumber}
          onChange={handleChange}
          required
          placeholder={t("contact.form.orderNumberPlaceholder")}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 ${
            errors.orderNumber ? "border-red-400" : "border-gray-300"
          }`}
        />
        {errors.orderNumber && (
          <div className="text-xs text-red-500 mt-1">{errors.orderNumber}</div>
        )}
      </div>
      <div>
        <label className="block text-sm font-normal text-gray-700 mb-1">
          {t("contact.form.message")}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder={t("contact.form.messagePlaceholder")}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 ${
            errors.message ? "border-red-400" : "border-gray-300"
          }`}
        />
        {errors.message && (
          <div className="text-xs text-red-500 mt-1">{errors.message}</div>
        )}
        {apiError && (
          <div className="text-xs text-red-500 mt-1">{apiError}</div>
        )}
      </div>
      <div className="flex justify-start mt-2">
        <button
          type="submit"
          className="h-auto px-4 sm:px-6 py-2 sm:py-2 border border-teal-400 rounded-sm text-gray-600 hover:text-gray-900 font-normal text-xs sm:text-sm md:text-base flex items-center group transition-colors"
          disabled={loading}
        >
          {loading ? (
            <span className="opacity-60 flex items-center">
              {t("contact.form.sending")}
              <svg
                className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </span>
          ) : (
            <>
              {t("contact.form.submit")}
              <svg
                className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </>
          )}
        </button>
      </div>
      {submitted && (
        <div className="text-green-600 text-center mt-2">
          {t("contact.form.success")}
        </div>
      )}
    </form>
  );
}
