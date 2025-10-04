import { useState, useEffect, useCallback } from "react";

interface DynamicStatsHook {
  currentOrders: number;
  isLoading: boolean;
}

/**
 * Custom hook for dynamic order statistics using server-side API
 * - Fetches current order count from server API
 * - Automatically increments every 2 minutes (testing) / 1.5 hours (production)
 * - Resets to 13 daily at midnight
 * - Consistent across all users and devices
 */
export function useDynamicStats(): DynamicStatsHook {
  const [currentOrders, setCurrentOrders] = useState<number>(13);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setCurrentOrders(data.orders);
        setIsLoading(false);
      } else {
        console.warn("Failed to fetch orders:", response.status);
        setCurrentOrders(13);
        setIsLoading(false);
      }
    } catch (error) {
      console.warn("Error fetching orders:", error);
      setCurrentOrders(13);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Initial fetch
    fetchOrders();

    // Fetch every 5 minutes to keep data fresh (since counter only changes every 1.5 hours)
    const interval = setInterval(fetchOrders, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isClient, fetchOrders]);

  return { currentOrders, isLoading };
}
