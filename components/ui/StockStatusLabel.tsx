// --- Inlined: StockStatusLabel ---
import type { StockStatus } from "../ProductCard/SingleProductCard";

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
  let color = "#30c275";
  let shadow = "0 0 8px 2px #30c275";
  let label = "In stock";
  if (stockStatus === "low_stock") {
    color = "#FFD600";
    shadow = "0 0 8px 2px #FFD600";
    label = "Low stock";
  } else if (stockStatus === "last_3") {
    color = "#FFD600";
    shadow = "0 0 8px 2px #FFD600";
    label = "Last 3 cans";
  } else if (stockStatus === "no_stock") {
    color = "#FF3B30";
    shadow = "0 0 8px 2px #FF3B30";
    label = "No stock";
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
