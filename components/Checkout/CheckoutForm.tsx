// CheckoutForm component: handles contact & shipping form, zod validation
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().optional(),
  news: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: "United States" },
  });

  const onSubmit = (data: FormData) => {
    // Placeholder for submit logic
    alert("Submitted!" + JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold mb-4">Contact</h2>
      <div className="mb-4">
        <input {...register("email")}
          placeholder="Email"
          className={`w-full border rounded px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-xs text-red-600 mt-1">Enter an email</p>}
        <label className="flex items-center mt-2">
          <input type="checkbox" {...register("news")} className="mr-2" />
          <span className="text-sm">Email me with news and offers</span>
        </label>
      </div>
      <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <input {...register("firstName")}
            placeholder="First name"
            className={`w-full border rounded px-3 py-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.firstName && <p className="text-xs text-red-600 mt-1">Enter a first name</p>}
        </div>
        <div>
          <input {...register("lastName")}
            placeholder="Last name"
            className={`w-full border rounded px-3 py-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lastName && <p className="text-xs text-red-600 mt-1">Enter a last name</p>}
        </div>
      </div>
      <div className="mb-4">
        <input {...register("address")}
          placeholder="Address"
          className={`w-full border rounded px-3 py-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.address && <p className="text-xs text-red-600 mt-1">Enter an address</p>}
      </div>
      <div className="mb-4">
        <input {...register("city")}
          placeholder="City"
          className={`w-full border rounded px-3 py-2 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.city && <p className="text-xs text-red-600 mt-1">Enter a city</p>}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <select {...register("country")}
            className={`w-full border rounded px-3 py-2 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            {/* Add more countries as needed */}
          </select>
        </div>
        <div>
          <input {...register("zip")}
            placeholder="ZIP code"
            className={`w-full border rounded px-3 py-2 ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.zip && <p className="text-xs text-red-600 mt-1">Enter a ZIP / postal code</p>}
        </div>
      </div>
      <div className="mb-4">
        <input {...register("phone")}
          placeholder="Phone (optional)"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button type="submit" className="w-full bg-black text-white py-3 rounded font-bold mt-2">Continue to Shipping</button>
    </form>
  );
}
