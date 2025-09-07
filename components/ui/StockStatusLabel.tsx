// --- Inlined: StockStatusLabel ---
import type { StockStatus } from "../ProductCard/SingleProductCard";
import { useLanguage } from "@/context/LanguageContextNew";

interface StockStatusLabelProps {
  stockStatus: StockStatus;
  labelClassName?: string;
  dotClassName?: string; // <-- add this
}
/**
 * StockStatusLabel displays the stock status with color and label.
 */
export const StockStatusLabel: React.FC<StockStatusLabelProps> = ({
  stockStatus,
  labelClassName,
  dotClassName,
}) => {
  const { t } = useLanguage();

  let color = "#30c275";
  let shadow = "0 0 8px 2px #30c275";
  let label = t("products.stock.inStock");

  if (stockStatus === "low_stock") {
    color = "#FFD600";
    shadow = "0 0 8px 2px #FFD600";
    label = t("products.stock.lowStock");
  } else if (stockStatus === "last_3") {
    color = "#FFD600";
    shadow = "0 0 8px 2px #FFD600";
    label = t("products.stock.last3Cans");
  } else if (stockStatus === "no_stock") {
    color = "#FF3B30";
    shadow = "0 0 8px 2px #FF3B30";
    label = t("products.stock.noStock");
  }

  return (
    <span className="relative inline-flex items-center mr-0 align-middle">
      {stockStatus === "in_stock" && (
        <span
          className={`absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75 animate-ping ${
            dotClassName ?? ""
          }`}
          // style prop removed, let dotClassName control position
        />
      )}
      <span
        className="inline-block w-2 h-2 rounded-full relative"
        style={{ backgroundColor: color, boxShadow: shadow }}
      />
      {/* <span className="text-md text-gray-900">{label}</span> */}
      <span className={labelClassName ?? "pl-2 text-md text-gray-600"}>
        {label}
      </span>
    </span>
  );
};
