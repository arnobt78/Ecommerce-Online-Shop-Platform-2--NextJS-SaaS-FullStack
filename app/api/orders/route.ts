// API route to get current order count
import { NextResponse } from "next/server";

// In-memory store (in production, use a database)
let orderCounter = 13;
let lastUpdateTime = Date.now();
let lastResetDate = new Date().toDateString();

export async function GET() {
  const now = Date.now();
  const currentDate = new Date().toDateString();

  // Reset to 13 at midnight (new day)
  if (currentDate !== lastResetDate) {
    orderCounter = 13;
    lastUpdateTime = now;
    lastResetDate = currentDate;
  }

  const timeDiff = now - lastUpdateTime;
  const incrementInterval = 90 * 60 * 1000; // 1.5 hours (90 minutes)
  const increments = Math.floor(timeDiff / incrementInterval);

  if (increments > 0) {
    orderCounter += increments * 6;
    lastUpdateTime = now;
  }

  return NextResponse.json({
    orders: orderCounter,
    lastUpdate: lastUpdateTime,
    isNewDay: currentDate !== lastResetDate,
  });
}
