"use client";

import React, { useEffect, useState } from "react";
import { products } from "@/scripts/data/products";

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<string>("77-apple-mint");
  const [customSlug, setCustomSlug] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDebugInfo({
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        localStorage: typeof Storage !== "undefined",
        sessionStorage: typeof Storage !== "undefined",
      });
    }
  }, []);

  const testProductDetail = (slug: string) => {
    window.location.href = `/product-detail/${slug}`;
  };

  const testCustomSlug = () => {
    if (customSlug.trim()) {
      window.location.href = `/product-detail/${customSlug.trim()}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Vercel Production Debug</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Test Product Detail Pages
          </h2>

          {/* Product Selection Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Product to Test:
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {products.map((product) => (
                <option key={product.slug} value={product.slug}>
                  {product.productName} ({product.slug})
                </option>
              ))}
            </select>
            <button
              onClick={() => testProductDetail(selectedProduct)}
              className="mt-2 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Test Selected Product
            </button>
          </div>

          {/* Custom Slug Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Custom Slug:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="Enter product slug (e.g., 77-apple-mint)"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={testCustomSlug}
                disabled={!customSlug.trim()}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Test Custom
              </button>
            </div>
          </div>

          {/* Quick Test Buttons */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Quick Tests:</p>
            <div className="flex flex-wrap gap-2">
              {products.slice(0, 5).map((product) => (
                <button
                  key={product.slug}
                  onClick={() => testProductDetail(product.slug)}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                >
                  {product.slug}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Console Logs</h2>
          <p className="text-gray-600">
            Open your browser's developer tools (F12) and check the Console tab
            for any error messages.
          </p>
        </div>
      </div>
    </div>
  );
}
