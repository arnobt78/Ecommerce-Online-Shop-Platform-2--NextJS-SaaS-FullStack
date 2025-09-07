"use client";

import React from "react";

interface LanguageTransitionWrapperProps {
  children: React.ReactNode;
}

export const LanguageTransitionWrapper: React.FC<
  LanguageTransitionWrapperProps
> = ({ children }) => {
  // Simplified wrapper - no opacity transitions that cause delays
  return <>{children}</>;
};
