// API route to get current order count
import { NextResponse } from "next/server";

// In-memory store (in production, use a database)
let orderCounter = 13;
let lastUpdateTime = Date.now();
let lastResetDate = new Date().toDateString();

export async function GET() {
  const now = Date.now();
  const currentDate = new Date().toDateString();

  // Reset to 13 at midnight (new day) - Fixed logic
  if (currentDate !== lastResetDate) {
    orderCounter = 13;
    lastUpdateTime = now;
    lastResetDate = currentDate;
    console.log(`[API] New day detected, reset counter to 13`);
  }

  const timeDiff = now - lastUpdateTime;
  const incrementInterval = 2 * 60 * 1000; // 2 minutes for testing
  const increments = Math.floor(timeDiff / incrementInterval);

  if (increments > 0) {
    orderCounter += increments * 6;
    lastUpdateTime = now;
    console.log(
      `[API] Incremented counter by ${
        increments * 6
      }, new value: ${orderCounter}`
    );
  }

  console.log(
    `[API] Current counter: ${orderCounter}, timeDiff: ${timeDiff}ms, increments: ${increments}`
  );

  return NextResponse.json({
    orders: orderCounter,
    lastUpdate: lastUpdateTime,
    isNewDay: currentDate !== lastResetDate,
    timeDiff,
    increments,
  });
}
