import { NextResponse } from "next/server";
import { products } from "@/scripts/data/products";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "API endpoint working",
      productCount: products.length,
      sampleProduct: products[0]
        ? {
            id: products[0].id,
            productName: products[0].productName,
            slug: products[0].slug,
          }
        : null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
