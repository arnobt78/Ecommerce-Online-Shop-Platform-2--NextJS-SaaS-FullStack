"use client";

import React from "react";

export default function TestPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    console.log("TestPage mounted successfully on iPhone 8");
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">iPhone 8 Test Page</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Basic Test</h2>
          <p className="text-gray-600 mb-4">
            If you can see this page, the basic React rendering works on iPhone
            8.
          </p>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800">
              ✅ Page loaded successfully
              <br />
              ✅ React components working
              <br />✅ Console logging working
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Product Detail</h2>
          <button
            onClick={() => {
              console.log("Navigating to product detail...");
              window.location.href = "/product-detail/77-apple-mint";
            }}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Test 77 Apple Mint Product Detail
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Device Info</h2>
          <div className="text-sm text-gray-600">
            <p>
              <strong>User Agent:</strong> {navigator.userAgent}
            </p>
            <p>
              <strong>Platform:</strong> {navigator.platform}
            </p>
            <p>
              <strong>Language:</strong> {navigator.language}
            </p>
            <p>
              <strong>Screen:</strong> {window.screen.width}x
              {window.screen.height}
            </p>
            <p>
              <strong>Viewport:</strong> {window.innerWidth}x
              {window.innerHeight}
            </p>
            <p>
              <strong>Device Pixel Ratio:</strong> {window.devicePixelRatio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
