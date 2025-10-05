import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface DynamicStatsHook {
  currentOrders: number;
  isLoading: boolean;
}

/**
 * Custom hook for dynamic order statistics
 * - Calculates counter value based on current timestamp
 * - No database dependency - pure timestamp calculation
 * - Resets to 13 daily at midnight
 * - Always shows correct value regardless of user visits
 */
export function useDynamicStats(): DynamicStatsHook {
  const [currentOrders, setCurrentOrders] = useState<number>(13);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      console.log("[Hook] Fetching orders from API...");
      const response = await axios.get("/api/orders", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("[Hook] API Response:", data);
        setCurrentOrders(data.orders);
        setIsLoading(false);
      } else {
        console.warn("[Hook] Failed to fetch orders:", response.status);
        setCurrentOrders(13);
        setIsLoading(false);
      }
    } catch (error) {
      console.warn("[Hook] Error fetching orders:", error);
      setCurrentOrders(13);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch - no need for frequent updates since it's timestamp-based
    fetchOrders();
  }, [fetchOrders]);

  return { currentOrders, isLoading };
}
