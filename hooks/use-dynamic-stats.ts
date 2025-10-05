import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface DynamicStatsHook {
  currentOrders: number;
  isLoading: boolean;
}

/**
 * Custom hook for dynamic order statistics using server-side API
 * - Fetches current order count from server API
 * - Automatically increments every 2 minutes (testing)
 * - Resets to 13 daily at midnight
 * - Consistent across all users and devices
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
    // Initial fetch
    fetchOrders();

    // Fetch every 30 seconds to keep data fresh (since counter changes every 2 minutes)
    const interval = setInterval(fetchOrders, 30 * 1000);
    // Fetch every 5 minutes to keep data fresh (since counter changes every 1.5 hours)
    // const interval = setInterval(fetchOrders, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  return { currentOrders, isLoading };
}
