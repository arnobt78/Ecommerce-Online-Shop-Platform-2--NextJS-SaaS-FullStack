// API route to calculate order count based on current timestamp
// No database dependency - calculates counter value dynamically
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();

    // Get start of today (00:00:00)
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    // Calculate time difference from start of day
    const timeDiff = now.getTime() - startOfDay.getTime();

    // Calculate how many 45-minute intervals have passed
    const incrementInterval = 45 * 60 * 1000; // 45 minutes in milliseconds
    const intervalsPassed = Math.floor(timeDiff / incrementInterval);

    // Calculate counter value: 13 + (intervals × 2) - increments every 45 minutes
    const counterValue = 13 + intervalsPassed * 2;

    console.log(`[API] Timestamp calculation:`, {
      currentTime: now.toISOString(),
      startOfDay: startOfDay.toISOString(),
      timeDiff: timeDiff,
      intervalsPassed: intervalsPassed,
      counterValue: counterValue,
    });

    return NextResponse.json({
      orders: counterValue,
      intervalsPassed: intervalsPassed,
      timeDiff: timeDiff,
      startOfDay: startOfDay.toISOString(),
      currentTime: now.toISOString(),
      source: "timestamp-calculation",
    });
  } catch (error) {
    console.error("[API] Calculation error:", error);

    // Fallback to base value if calculation fails
    return NextResponse.json({
      orders: 13,
      intervalsPassed: 0,
      timeDiff: 0,
      source: "fallback",
      error: "Calculation failed",
    });
  }
}
