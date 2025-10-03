import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
  hasPulse?: boolean;
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
}: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out animation curve for smoother effect
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.floor(target * easeOut);

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
  }, [target, duration]);

  return (
    <span className={`${className} ${hasPulse ? "stat-pulse" : ""}`}>
      {current}
    </span>
  );
}
