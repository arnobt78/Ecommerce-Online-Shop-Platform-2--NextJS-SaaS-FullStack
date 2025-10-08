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
import { useLanguage } from "@/context/LanguageContextNew";

// Function to create schema with translations
const createSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("checkoutPage.delivery.errors.email")),
    firstName: z.string().min(1, t("checkoutPage.delivery.errors.firstName")),
    lastName: z.string().min(1, t("checkoutPage.delivery.errors.lastName")),
    address: z.string().min(1, t("checkoutPage.delivery.errors.address")),
    city: z.string().min(1, t("checkoutPage.delivery.errors.city")),
    state: z.string().min(1),
    zip: z.string().min(1, t("checkoutPage.delivery.errors.zip")),
    country: z.string().min(1, t("checkoutPage.delivery.errors.country")),
    phone: z.string().optional(),
    news: z.boolean().optional(),
    company: z.string().optional(),
    apartment: z.string().optional(),
  });

type FormData = z.infer<ReturnType<typeof createSchema>>;

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
    const { t } = useLanguage();
    const [isPhoneTooltipOpen, setIsPhoneTooltipOpen] = useState(false);
    const isMobileDevice = useMediaQuery("(max-width: 768px)");
    const phoneTooltipRef = useRef<HTMLDivElement>(null);

    const {
      register,
      handleSubmit,
      formState: { errors },
      trigger,
      getValues,
      watch,
    } = useForm<FormData>({
      resolver: zodResolver(createSchema(t)),
      defaultValues: {
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        company: "",
        apartment: "",
        news: false,
      },
    });

    // Watch all form fields to hide error messages when user starts typing
    const watchedValues = watch();

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
              {t("checkoutPage.delivery.contact")}
            </h2>
            {/* Email */}
            <div className="mb-4">
              <div className="relative">
                <input
                  {...register("email")}
                  placeholder=" "
                  autoComplete="off"
                  className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {/* Floating Label with Animation */}
                <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                  {t("checkoutPage.delivery.email")}
                </label>
              </div>
              {errors.email && !watchedValues.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
              {/* Email me with news and offers */}
              <label className="flex items-center mt-2">
                <input type="checkbox" {...register("news")} className="mr-2" />
                <span className="text-sm">
                  {t("checkoutPage.delivery.emailNews")}
                </span>
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
              autoComplete="off"
              className={`w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 appearance-none bg-white text-gray-900 text-md ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">
                {t("checkoutPage.delivery.selectCountry")}
              </option>
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
              {t("checkoutPage.delivery.countryRegion")}
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
          {errors.country && !watchedValues.country && (
            <p className="text-sm text-red-600 mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="relative">
              <input
                {...register("firstName")}
                placeholder=" "
                autoComplete="off"
                className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {/* Floating Label */}
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                {t("checkoutPage.delivery.firstName")}
              </label>
            </div>
            {errors.firstName && !watchedValues.firstName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                {...register("lastName")}
                placeholder=" "
                autoComplete="off"
                className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {/* Floating Label */}
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                {t("checkoutPage.delivery.lastName")}
              </label>
            </div>
            {errors.lastName && !watchedValues.lastName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <div className="relative">
            <input
              {...register("company", { required: false })}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md border-gray-300"
            />
            {/* Floating Label */}
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
              {t("checkoutPage.delivery.company")}
            </label>
          </div>
          {errors.company && !watchedValues.company && (
            <p className="text-sm text-red-600 mt-1">
              {t("checkoutPage.delivery.errors.company")}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <div className="relative">
            <input
              {...register("address")}
              placeholder=" "
              autoComplete="off"
              className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {/* Floating Label */}
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
              {t("checkoutPage.delivery.address")}
            </label>
          </div>
          {errors.address && !watchedValues.address && (
            <p className="text-sm text-red-600 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Apartment, Suite, etc. */}
        <div className="mb-4">
          <div className="relative">
            <input
              {...register("apartment", { required: false })}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md border-gray-300"
            />
            {/* Floating Label */}
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
              {t("checkoutPage.delivery.apartment")}
            </label>
          </div>
          {errors.apartment && !watchedValues.apartment && (
            <p className="text-sm text-red-600 mt-1">
              {t("checkoutPage.delivery.errors.apartment")}
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
                autoComplete="off"
                className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                  errors.zip ? "border-red-500" : "border-gray-300"
                }`}
              />
              {/* Floating Label */}
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                {t("checkoutPage.delivery.zipCode")}
              </label>
            </div>
            {errors.zip && !watchedValues.zip && (
              <p className="text-sm text-red-600 mt-1">{errors.zip.message}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                {...register("city")}
                placeholder=" "
                autoComplete="off"
                className={`peer w-full border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              />
              {/* Floating Label */}
              <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
                {t("checkoutPage.delivery.city")}
              </label>
            </div>
            {errors.city && !watchedValues.city && (
              <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4 relative">
          <div className="relative">
            <input
              {...register("phone", { required: false })}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#8EF7FB] focus:border-[#8EF7FB] px-3 pt-6 pb-2 text-gray-900 text-md pr-10"
            />
            {/* Floating Label */}
            <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-md transition-all duration-200 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-md peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-500 pointer-events-none">
              {t("checkoutPage.delivery.phone")}
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
                      {t("checkoutPage.delivery.phoneTooltip")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {errors.phone && !watchedValues.phone && (
            <p className="text-sm text-red-600 mt-1">
              {t("checkoutPage.delivery.errors.phone")}
            </p>
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
