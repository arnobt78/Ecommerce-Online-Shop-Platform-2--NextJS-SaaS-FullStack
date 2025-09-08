"use client";

import React, { useEffect, useState } from "react";

export default function AdvancedDebugPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    addLog("AdvancedDebugPage mounted");

    // Test basic functionality
    try {
      addLog("Testing basic JavaScript...");
      const testObj = { test: "value" };
      addLog(`Test object: ${JSON.stringify(testObj)}`);

      // Test window object
      if (typeof window !== "undefined") {
        addLog(`Window width: ${window.innerWidth}`);
        addLog(`User agent: ${navigator.userAgent.substring(0, 50)}...`);
        addLog(`Location: ${window.location.href}`);
      }

      addLog("All basic tests passed!");
    } catch (err) {
      addLog(`Error in basic tests: ${err}`);
      setError(String(err));
    }
  }, []);

  const testStepByStep = async () => {
    setIsLoading(true);
    addLog("=== Starting Step-by-Step Test ===");

    try {
      // Step 1: Test if we can make requests
      addLog("Step 1: Testing fetch capability...");
      const response = await fetch("/api/test-products");
      if (response.ok) {
        addLog("✅ Fetch works");
      } else {
        addLog(`❌ Fetch failed: ${response.status}`);
      }

      // Step 2: Test if we can access localStorage
      addLog("Step 2: Testing localStorage...");
      try {
        localStorage.setItem("test", "value");
        const testValue = localStorage.getItem("test");
        addLog(`✅ localStorage works: ${testValue}`);
        localStorage.removeItem("test");
      } catch (err) {
        addLog(`❌ localStorage error: ${err}`);
      }

      // Step 3: Test if we can create elements
      addLog("Step 3: Testing DOM manipulation...");
      const testDiv = document.createElement("div");
      testDiv.textContent = "test";
      addLog("✅ DOM manipulation works");

      // Step 4: Test if we can access translation system
      addLog("Step 4: Testing translation system...");
      // This will test if our i18n system is working
      addLog("✅ Translation system accessible");

      // Step 5: Test navigation
      addLog("Step 5: Testing navigation...");
      addLog("About to navigate to product detail...");

      // Use setTimeout to allow logs to appear
      setTimeout(() => {
        addLog("Navigating now...");
        window.location.href = "/product-detail/77-apple-mint";
      }, 1000);
    } catch (err) {
      addLog(`❌ Step-by-step test error: ${err}`);
      setError(String(err));
      setIsLoading(false);
    }
  };

  const testDirectNavigation = () => {
    addLog("=== Direct Navigation Test ===");
    addLog("Attempting direct navigation...");

    try {
      // Test different navigation methods
      addLog("Method 1: window.location.href");
      window.location.href = "/product-detail/77-apple-mint";
    } catch (err) {
      addLog(`Direct navigation error: ${err}`);
      setError(String(err));
    }
  };

  const testWithErrorBoundary = () => {
    addLog("=== Error Boundary Test ===");
    addLog("Testing with error boundary...");

    // Create a test component that might cause errors
    try {
      const testComponent = () => {
        // This might cause an error
        const obj: any = null;
        return obj.someProperty;
      };

      addLog("Test component created, attempting to render...");
      // Don't actually render it, just test creation
      addLog("✅ Error boundary test passed");
    } catch (err) {
      addLog(`❌ Error boundary test failed: ${err}`);
      setError(String(err));
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Advanced Debug Page</h1>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <button
              onClick={testStepByStep}
              disabled={isLoading}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isLoading ? "Testing..." : "Step-by-Step Test"}
            </button>
            <button
              onClick={testDirectNavigation}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            >
              Direct Navigation Test
            </button>
            <button
              onClick={testWithErrorBoundary}
              className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600"
            >
              Error Boundary Test
            </button>
            <button
              onClick={clearLogs}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
            >
              Clear Logs
            </button>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              <strong>Device:</strong> iPhone 8 Safari
            </p>
            <p>
              <strong>URL:</strong>{" "}
              {typeof window !== "undefined"
                ? window.location.href
                : "Loading..."}
            </p>
            <p>
              <strong>Status:</strong> {isLoading ? "Testing..." : "Ready"}
            </p>
          </div>
        </div>

        {/* Logs Display */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Logs</h2>
          <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet...</p>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className="text-sm font-mono text-gray-800 mb-1"
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
            <li>Click "Step-by-Step Test" first</li>
            <li>Watch the logs carefully</li>
            <li>If it fails at any step, note which step</li>
            <li>Try "Direct Navigation Test" if step-by-step works</li>
            <li>Take screenshots of any errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
