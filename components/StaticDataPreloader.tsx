"use client";

import { useStaticData } from "@/hooks/useStaticData";

// Component to preload all static data at app startup
export function StaticDataPreloader() {
  // This hook will automatically fetch and cache all static data when the component mounts
  // The data will then be available globally via React Query cache
  useStaticData();

  return null; // This component doesn't render anything
}
