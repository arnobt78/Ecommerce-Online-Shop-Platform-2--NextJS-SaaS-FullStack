"use client";
import { useState } from "react";
import { z } from "zod";
const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message is required"),
});


export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }



  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = ContactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; message?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof typeof fieldErrors] = err.message;
      });
      setErrors(fieldErrors);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-normal text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-normal text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-normal text-gray-700 mb-1">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200 ${errors.message ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errors.message && <div className="text-xs text-red-500 mt-1">{errors.message}</div>}
      </div>
      <div className="flex justify-start mt-2">
        <button
          type="submit"
          className="h-auto px-4 sm:px-6 py-2 sm:py-2 border border-teal-400 rounded-sm text-gray-600 hover:text-gray-900 font-normal text-xs sm:text-sm md:text-base flex items-center group transition-colors"
        >
          Contact support
          <svg className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      {submitted && (
        <div className="text-green-600 text-center mt-2">Thank you! Your message has been sent.</div>
      )}
    </form>
  );
}

