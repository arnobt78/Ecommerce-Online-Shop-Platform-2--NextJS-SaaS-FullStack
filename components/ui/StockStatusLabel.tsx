// --- Inlined: StockStatusLabel ---
import type { StockStatus } from "../ProductCard/SingleProductCard";

interface StockStatusLabelProps {
  stockStatus: StockStatus;
  labelClassName?: string;
}
/**
 * StockStatusLabel displays the stock status with color and label.
 */
export const StockStatusLabel: React.FC<StockStatusLabelProps> = ({
  stockStatus,
  labelClassName,
}) => {
  let color = "#4ade80";
  let shadow = "0 0 8px 2px #22c55e";
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
    <>
      <span
        className="inline-block w-2 h-2 rounded-full mr-1"
        style={{ backgroundColor: color, boxShadow: shadow }}
      />
      {/* <span className="text-md text-gray-900">{label}</span> */}
      <span className={labelClassName ?? "text-md text-gray-600"}>{label}</span>
    </>
  );
};
