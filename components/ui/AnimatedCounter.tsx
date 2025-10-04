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
  // For large numbers (like 7000, 4000), start from target-20 for smooth animation
  // For small numbers (like 13), start from target-5 for smooth animation
  const startValue =
    target > 100 ? Math.max(0, target - 20) : Math.max(0, target - 6);
  const [current, setCurrent] = useState(startValue);

  useEffect(() => {
    // If target is the same as current, no need to animate
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
  }, [target, duration, current]);

  return (
    <span className={`${className} ${hasPulse ? "stat-pulse" : ""}`}>
      {current}
      {suffix}
    </span>
  );
}
