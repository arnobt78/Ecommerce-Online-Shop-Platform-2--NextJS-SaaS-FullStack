// API route to get current order count using PostgreSQL database
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const now = new Date();
    const currentDate = now.toDateString();

    // Get or create the order counter record
    let orderCounter = await prisma.orderCounter.findFirst({
      orderBy: { createdAt: "desc" },
    });

    // If no counter exists, create one
    if (!orderCounter) {
      orderCounter = await prisma.orderCounter.create({
        data: {
          counter: 13,
          lastUpdate: now,
          lastResetDate: now,
        },
      });
      console.log(`[API] Created new order counter with value 13`);
    }

    // Reset to 13 at midnight (new day)
    if (currentDate !== orderCounter.lastResetDate.toDateString()) {
      orderCounter = await prisma.orderCounter.update({
        where: { id: orderCounter.id },
        data: {
          counter: 13,
          lastUpdate: now,
          lastResetDate: now,
        },
      });
      console.log(`[API] New day detected, reset counter to 13`);
    }

    // Calculate increments based on time passed
    const timeDiff = now.getTime() - orderCounter.lastUpdate.getTime();
    const incrementInterval = 15 * 60 * 1000; // 15 minutes
    const increments = Math.floor(timeDiff / incrementInterval);

    if (increments > 0) {
      const newCounter = orderCounter.counter + increments * 2;
      orderCounter = await prisma.orderCounter.update({
        where: { id: orderCounter.id },
        data: {
          counter: newCounter,
          lastUpdate: now,
        },
      });
      console.log(
        `[API] Incremented counter by ${
          increments * 2
        }, new value: ${newCounter}`
      );
    }

    console.log(
      `[API] Current counter: ${orderCounter.counter}, timeDiff: ${timeDiff}ms, increments: ${increments}`
    );

    return NextResponse.json({
      orders: orderCounter.counter,
      lastUpdate: orderCounter.lastUpdate.getTime(),
      isNewDay: currentDate !== orderCounter.lastResetDate.toDateString(),
      timeDiff,
      increments,
      source: "database",
    });
  } catch (error) {
    console.error("[API] Database error:", error);

    // Fallback to default values if database fails
    return NextResponse.json({
      orders: 13,
      lastUpdate: Date.now(),
      isNewDay: false,
      timeDiff: 0,
      increments: 0,
      source: "fallback",
      error: "Database connection failed",
    });
  } finally {
    await prisma.$disconnect();
  }
}
