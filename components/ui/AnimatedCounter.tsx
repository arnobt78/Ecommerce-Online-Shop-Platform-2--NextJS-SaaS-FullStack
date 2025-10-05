import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
  hasPulse?: boolean;
  suffix?: string;
}

/**
 * Animated counter component with smooth counting animation and optional pulse effect
 * Used for displaying dynamically updating order statistics
 */
export default function AnimatedCounter({
  target,
  duration = 2000,
  className = "",
  hasPulse = false,
  suffix = "",
}: AnimatedCounterProps) {
  // Start from target value to avoid hydration issues and immediate jumps
  // Only animate when target actually changes (not on initial load)
  const [current, setCurrent] = useState(target);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // On first load, just set the target value without animation
    if (!isInitialized) {
      setCurrent(target);
      setIsInitialized(true);
      return;
    }

    // Only animate when target actually changes (not on initial load)
    if (target === current) return;

    let startTime: number;
    let animationId: number;
    const animationStartValue = current;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out animation curve for smoother effect
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.floor(
        animationStartValue + (target - animationStartValue) * easeOut
      );

      setCurrent(newValue);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [target, duration, current, isInitialized]);

  return (
    <span className={`${className} ${hasPulse ? "stat-pulse" : ""}`}>
      {current}
      {suffix}
    </span>
  );
}
