"use client";

import React, { useEffect, useState } from "react";

export default function ButtonDebugPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    addLog("ButtonDebugPage mounted");
  }, []);

  const testImmediateNavigation = () => {
    addLog("=== IMMEDIATE NAVIGATION TEST ===");
    addLog("Button clicked - Immediate Navigation");
    addLog("About to navigate immediately...");

    try {
      window.location.href = "/product-detail/77-apple-mint";
      addLog("Navigation command sent");
    } catch (err) {
      addLog(`Navigation error: ${err}`);
      setError(String(err));
    }
  };

  const testDelayedNavigation = () => {
    addLog("=== DELAYED NAVIGATION TEST ===");
    addLog("Button clicked - Delayed Navigation");
    addLog("Scheduling navigation in 5 seconds...");

    const timeoutId = setTimeout(() => {
      addLog("setTimeout callback executing now (5 seconds later)");
      addLog("About to navigate...");
      window.location.href = "/product-detail/77-apple-mint";
    }, 5000);

    addLog(`setTimeout scheduled with ID: ${timeoutId}`);
    addLog("setTimeout scheduled for 5 seconds");
  };

  const testStepByStep = () => {
    addLog("=== STEP-BY-STEP TEST ===");
    addLog("Button clicked - Step-by-Step Test");
    addLog("Step 1: Starting test");

    const timeout1 = setTimeout(() => {
      addLog("Step 2: First timeout (2 seconds)");

      const timeout2 = setTimeout(() => {
        addLog("Step 3: Second timeout (4 seconds total)");

        const timeout3 = setTimeout(() => {
          addLog("Step 4: Third timeout (6 seconds total)");
          addLog("Step 5: About to navigate...");
          window.location.href = "/product-detail/77-apple-mint";
        }, 2000);

        addLog(`Step 3 timeout ID: ${timeout3}`);
      }, 2000);

      addLog(`Step 2 timeout ID: ${timeout2}`);
    }, 2000);

    addLog(`Step 1 timeout ID: ${timeout1}`);
    addLog("All timeouts scheduled");
  };

  const testNoNavigation = () => {
    addLog("=== NO NAVIGATION TEST ===");
    addLog("Button clicked - No Navigation Test");
    addLog("This should NOT navigate anywhere");

    setTimeout(() => {
      addLog("setTimeout executed (2 seconds) - still no navigation");
    }, 2000);

    addLog("setTimeout scheduled - no navigation will happen");
  };

  const testAlert = () => {
    addLog("=== ALERT TEST ===");
    addLog("Button clicked - Alert Test");

    try {
      alert("This is a test alert!");
      addLog("Alert shown successfully");
    } catch (err) {
      addLog(`Alert error: ${err}`);
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
        <h1 className="text-2xl font-bold mb-6">Button Debug Page</h1>

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
              onClick={testImmediateNavigation}
              className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
            >
              Immediate Navigation
            </button>
            <button
              onClick={testDelayedNavigation}
              className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600"
            >
              Delayed Navigation (5s)
            </button>
            <button
              onClick={testStepByStep}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            >
              Step-by-Step Test
            </button>
            <button
              onClick={testNoNavigation}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            >
              No Navigation Test
            </button>
            <button
              onClick={testAlert}
              className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600"
            >
              Alert Test
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
            <li>
              <strong>Immediate Navigation</strong> - Should navigate right away
            </li>
            <li>
              <strong>Delayed Navigation (5s)</strong> - Should wait 5 seconds
              then navigate
            </li>
            <li>
              <strong>Step-by-Step Test</strong> - Should show each step with
              2-second delays
            </li>
            <li>
              <strong>No Navigation Test</strong> - Should NOT navigate anywhere
            </li>
            <li>
              <strong>Alert Test</strong> - Should show an alert popup
            </li>
            <li>Watch the logs carefully for timing issues</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
