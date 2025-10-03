import { useState, useEffect, useCallback } from "react";

interface DynamicStatsHook {
  currentOrders: number;
  isLoading: boolean;
}

/**
 * Custom hook for dynamic order statistics
 * - Resets to base number (13) daily at 00:00
 * - Increments by 6 every 1.5 hours
 * - Maintains state across browser sessions using localStorage
 */
export function useDynamicStats(): DynamicStatsHook {
  const [currentOrders, setCurrentOrders] = useState<number>(13);
  const [isLoading, setIsLoading] = useState(true);

  // Generate a unique key for today's date to store data separately for each day
  const getTodayKey = useCallback(() => {
    const today = new Date();
    return `daily_orders_${today.getFullYear()}_${today.getMonth()}_${today.getDate()}`;
  }, []);

  // Calculate overnight increments based on current time
  const calculateOvernightIncrements = useCallback((lastUpdateTime: number) => {
    const now = Date.now();
    const timeDiff = now - lastUpdateTime;

    // Increment by 6 every 1.5 hours (90 minutes = 5,400,000 ms)
    const incrementInterval = 90 * 60 * 1000; // 1.5 hours in milliseconds
    const increments = Math.floor(timeDiff / incrementInterval);

    return Math.max(0, increments);
  }, []);

  // Load and initialize stats
  const initializeStats = useCallback(() => {
    try {
      const todayKey = getTodayKey();
      const storedData = localStorage.getItem(todayKey);

      if (storedData) {
        const { lastOrders, lastUpdateTime } = JSON.parse(storedData);
        const overnightIncrements =
          calculateOvernightIncrements(lastUpdateTime);
        const newOrders = lastOrders + overnightIncrements * 6;

        setCurrentOrders(newOrders);

        // Update storage with new data
        localStorage.setItem(
          todayKey,
          JSON.stringify({
            lastOrders: newOrders,
            lastUpdateTime: Date.now(),
          })
        );
      } else {
        // First visit of the day - start with base number
        setCurrentOrders(13);
        localStorage.setItem(
          todayKey,
          JSON.stringify({
            lastOrders: 13,
            lastUpdateTime: Date.now(),
          })
        );
      }
    } catch (error) {
      console.warn("Failed to load dynamic stats:", error);
      setCurrentOrders(13);
    }

    setIsLoading(false);
  }, [getTodayKey, calculateOvernightIncrements]);

  // Set up periodic updates
  const schedulePeriodicUpdates = useCallback(() => {
    const updateInterval = 90 * 60 * 1000; // 1.5 hours in milliseconds

    const incrementOrders = () => {
      setCurrentOrders((prev) => {
        const newOrders = prev + 6;
        const todayKey = getTodayKey();

        localStorage.setItem(
          todayKey,
          JSON.stringify({
            lastOrders: newOrders,
            lastUpdateTime: Date.now(),
          })
        );

        return newOrders;
      });
    };

    const timeoutId = setTimeout(() => {
      incrementOrders();
      schedulePeriodicUpdates(); // Schedule next update
    }, updateInterval);

    return () => clearTimeout(timeoutId);
  }, [getTodayKey]);

  // Cleanup old data (older than 7 days)
  const cleanupOldData = useCallback(() => {
    try {
      const keys = Object.keys(localStorage);
      const oldKeys = keys.filter(
        (key) =>
          key.startsWith("daily_orders_") &&
          !key.includes(getTodayKey().split("_").slice(1).join("_"))
      );

      oldKeys.slice(0, -7).forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      console.warn("Failed to cleanup old stats data:", error);
    }
  }, [getTodayKey]);

  useEffect(() => {
    initializeStats();
    cleanupOldData();

    const cleanup = schedulePeriodicUpdates();

    return cleanup;
  }, [initializeStats, cleanupOldData, schedulePeriodicUpdates]);

  return {
    currentOrders,
    isLoading,
  };
}
