"use client";

import React, { useEffect, useState } from "react";

export default function MinimalDebugPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    addLog("MinimalDebugPage mounted");

    // Test setTimeout specifically
    addLog("Testing setTimeout...");
    setTimeout(() => {
      addLog("setTimeout executed after 2 seconds");
    }, 2000);

    addLog("setTimeout scheduled");
  }, []);

  const testNavigation = () => {
    addLog("=== Navigation Test ===");
    addLog("Button clicked");

    // Test immediate navigation
    addLog("Attempting immediate navigation...");
    try {
      window.location.href = "/product-detail/77-apple-mint";
      addLog("Navigation command sent");
    } catch (err) {
      addLog(`Navigation error: ${err}`);
      setError(String(err));
    }
  };

  const testDelayedNavigation = () => {
    addLog("=== Delayed Navigation Test ===");
    addLog("Button clicked");

    // Test delayed navigation
    addLog("Scheduling navigation in 3 seconds...");
    setTimeout(() => {
      addLog("setTimeout callback executing now");
      addLog("Navigating to product detail...");
      window.location.href = "/product-detail/77-apple-mint";
    }, 3000);

    addLog("setTimeout scheduled for 3 seconds");
  };

  const testStepByStep = () => {
    addLog("=== Step-by-Step Test ===");
    addLog("Step 1: Starting test");

    setTimeout(() => {
      addLog("Step 2: First timeout (1 second)");

      setTimeout(() => {
        addLog("Step 3: Second timeout (2 seconds)");

        setTimeout(() => {
          addLog("Step 4: Third timeout (3 seconds)");
          addLog("Step 5: About to navigate...");
          window.location.href = "/product-detail/77-apple-mint";
        }, 1000);
      }, 1000);
    }, 1000);

    addLog("All timeouts scheduled");
  };

  const clearLogs = () => {
    setLogs([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Minimal Debug Page</h1>

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
              onClick={testNavigation}
              className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
            >
              Immediate Navigation
            </button>
            <button
              onClick={testDelayedNavigation}
              className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
            >
              Delayed Navigation (3s)
            </button>
            <button
              onClick={testStepByStep}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            >
              Step-by-Step Test
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
            <li>Wait for the initial setTimeout test (2 seconds)</li>
            <li>Try "Immediate Navigation" - should navigate right away</li>
            <li>
              Try "Delayed Navigation" - should wait 3 seconds then navigate
            </li>
            <li>Try "Step-by-Step Test" - should show each step</li>
            <li>Watch the logs carefully for timing issues</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
