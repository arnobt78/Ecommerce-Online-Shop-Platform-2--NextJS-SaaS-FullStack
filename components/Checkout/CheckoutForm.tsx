// CheckoutForm component: handles contact & shipping form, zod validation
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useMediaQuery } from "../../hooks/use-media-query";

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
  company: z.string().optional(),
  apartment: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface CheckoutFormProps {
  title?: string;
  showFormWrapper?: boolean;
  showContactSection?: boolean;
}

export interface CheckoutFormRef {
  triggerValidation: () => Promise<boolean>;
  getData: () => FormData | null;
}

const CheckoutForm = forwardRef<CheckoutFormRef, CheckoutFormProps>(
  (
    {
      title = "Delivery",
      showFormWrapper = true,
      showContactSection = true,
    }: CheckoutFormProps,
    ref
  ) => {
    const [isPhoneTooltipOpen, setIsPhoneTooltipOpen] = useState(false);
    const isMobileDevice = useMediaQuery("(max-width: 768px)");
    const phoneTooltipRef = useRef<HTMLDivElement>(null);

    const {
      register,
      handleSubmit,
      formState: { errors },
      trigger,
      getValues,
    } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: { country: "" },
    });

    // Close phone tooltip when clicking outside on mobile
    useEffect(() => {
      if (!isMobileDevice || !isPhoneTooltipOpen) return;

      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (
          phoneTooltipRef.current &&
          !phoneTooltipRef.current.contains(event.target as Node)
        ) {
          setIsPhoneTooltipOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }, [isMobileDevice, isPhoneTooltipOpen]);

    // Expose validation method to parent component
    useImperativeHandle(ref, () => ({
      triggerValidation: async () => {
        console.log("🔍 CheckoutForm: triggerValidation called");
        const isValid = await trigger();
        console.log("🔍 CheckoutForm: validation result:", isValid);
        console.log("🔍 CheckoutForm: current errors:", errors);
        return isValid;
      },
      getData: () => {
        const values = getValues();
        console.log("🔍 CheckoutForm: getData called, values:", values);
        return values;
      },
    }));

    const onSubmit = (data: FormData) => {
      // Placeholder for submit logic
      alert("Submitted!" + JSON.stringify(data));
    };

    const formContent = (
      <>
        {showContactSection && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-4">
              Contact
            </h2>
            {/* Email */}
            <div className="mb-4">
              <div className="relative">
                <input
                  {...register("email")}
                  placeholder=" "
                  className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {/* Floating Label with Animation */}
                <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                  Email
                </label>
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">Enter an email</p>
              )}
              {/* Email me with news and offers */}
              <label className="flex items-center mt-2">
                <input type="checkbox" {...register("news")} className="mr-2" />
                <span className="text-sm">Email me with news and offers</span>
              </label>
            </div>
          </>
        )}

        {/* Delivery Details */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-4">
          {title}
        </h2>
        {/* Country */}
        <div className="mb-4">
          <div className="relative">
            <select
              {...register("country")}
              className={`w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] px-3 pt-6 pb-2 appearance-none bg-white text-gray-900 text-md ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Country</option>
              {/* Countries in Alphabetical Order (A-Z) */}
              <option value="Albania">Albania</option>
              <option value="Andorra">Andorra</option>
              <option value="Armenia">Armenia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Bosnia and Herzegovina">
                Bosnia and Herzegovina
              </option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Croatia">Croatia</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Estonia">Estonia</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Greece">Greece</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="Ireland">Ireland</option>
              <option value="Italy">Italy</option>
              <option value="Kosovo">Kosovo</option>
              <option value="Latvia">Latvia</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Malta">Malta</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Netherlands">Netherlands</option>
              <option value="North Macedonia">North Macedonia</option>
              <option value="Norway">Norway</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="San Marino">San Marino</option>
              <option value="Serbia">Serbia</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Spain">Spain</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Turkey">Turkey</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Vatican City">Vatican City</option>
              {/* Non-European Countries (Commented Out) */}
              {/* <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Japan">Japan</option>
            <option value="South Korea">South Korea</option>
            <option value="Singapore">Singapore</option> */}
              <option value="Other">Other</option>
            </select>
            {/* Floating Label */}
            <label className="absolute left-3 top-2 text-xs text-gray-500 pointer-events-none">
              Country/Region
            </label>
            {/* Custom Dropdown Arrow */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.country && (
            <p className="text-sm text-red-600 mt-1">Enter a country</p>
          )}
        </div>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="relative">
              <input
                {...register("firstName")}
                placeholder=" "
                className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {/* Floating Label */}
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                First name
              </label>
            </div>
            {errors.firstName && (
              <p className="text-sm text-red-600 mt-1">Enter a first name</p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                {...register("lastName")}
                placeholder=" "
                className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {/* Floating Label */}
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                Last name
              </label>
            </div>
            {errors.lastName && (
              <p className="text-sm text-red-600 mt-1">Enter a last name</p>
            )}
          </div>
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <div className="relative">
            <input
              {...register("company", { required: false })}
              placeholder=" "
              className="peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md border-gray-300"
            />
            {/* Floating Label */}
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
              Company (optional)
            </label>
          </div>
          {errors.company && (
            <p className="text-sm text-red-600 mt-1">Enter a company name</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <div className="relative">
            <input
              {...register("address")}
              placeholder=" "
              className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {/* Floating Label */}
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
              Address
            </label>
          </div>
          {errors.address && (
            <p className="text-sm text-red-600 mt-1">Enter an address</p>
          )}
        </div>

        {/* Apartment, Suite, etc. */}
        <div className="mb-4">
          <div className="relative">
            <input
              {...register("apartment", { required: false })}
              placeholder=" "
              className="peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md border-gray-300"
            />
            {/* Floating Label */}
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
              Apartment, Suite, etc. (optional)
            </label>
          </div>
          {errors.apartment && (
            <p className="text-sm text-red-600 mt-1">
              Enter an apartment, suite, etc.
            </p>
          )}
        </div>

        {/* City and ZIP */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="relative">
              <input
                {...register("zip")}
                placeholder=" "
                className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                  errors.zip ? "border-red-500" : "border-gray-300"
                }`}
              />
              {/* Floating Label */}
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                ZIP code
              </label>
            </div>
            {errors.zip && (
              <p className="text-sm text-red-600 mt-1">
                Enter a ZIP / postal code
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                {...register("city")}
                placeholder=" "
                className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {/* Floating Label */}
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                City
              </label>
            </div>
            {errors.city && (
              <p className="text-sm text-red-600 mt-1">Enter a city</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4 relative">
          <div className="relative">
            <input
              {...register("phone", { required: false })}
              placeholder=" "
              className="peer w-full border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md pr-10"
            />
            {/* Floating Label */}
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
              Phone (optional)
            </label>
            <div ref={phoneTooltipRef}>
              <TooltipProvider>
                <Tooltip
                  open={isMobileDevice ? isPhoneTooltipOpen : undefined}
                  onOpenChange={
                    isMobileDevice ? setIsPhoneTooltipOpen : undefined
                  }
                >
                  <TooltipTrigger asChild>
                    <Info
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-help pointer-events-auto"
                      onClick={
                        isMobileDevice
                          ? () => setIsPhoneTooltipOpen(!isPhoneTooltipOpen)
                          : undefined
                      }
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black text-white p-3 max-w-xs text-xs">
                    <p className="text-xs text-white justify-center text-justify">
                      In case we need to contact you about your order.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">Enter a phone number</p>
          )}
        </div>
      </>
    );

    if (showFormWrapper) {
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {formContent}
        </form>
      );
    }

    return formContent;
  }
);

CheckoutForm.displayName = "CheckoutForm";

export default CheckoutForm;
