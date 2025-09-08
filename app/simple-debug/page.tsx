"use client";

import React, { useEffect, useState } from "react";

export default function SimpleDebugPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  useEffect(() => {
    addLog("SimpleDebugPage mounted");

    // Test basic functionality
    try {
      addLog("Testing basic JavaScript...");
      const testObj = { test: "value" };
      addLog(`Test object: ${JSON.stringify(testObj)}`);

      // Test window object
      if (typeof window !== "undefined") {
        addLog(`Window width: ${window.innerWidth}`);
        addLog(`User agent: ${navigator.userAgent.substring(0, 50)}...`);
      }

      addLog("All basic tests passed!");
    } catch (err) {
      addLog(`Error in basic tests: ${err}`);
      setError(String(err));
    }
  }, []);

  const testProductDetail = () => {
    addLog("Attempting to navigate to product detail...");
    try {
      window.location.href = "/product-detail/77-apple-mint";
    } catch (err) {
      addLog(`Navigation error: ${err}`);
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
        <h1 className="text-2xl font-bold mb-6">Simple Debug Page</h1>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={testProductDetail}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            >
              Test Product Detail
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
            <li>Click "Test Product Detail" button</li>
            <li>Watch the logs above</li>
            <li>If you see an error, it will appear in red</li>
            <li>Take a screenshot of any errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
