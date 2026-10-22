"use client";

import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Returns the current scroll progress (0–1) and scroll direction.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const lastY = useRef(0);

  const update = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const p = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
    setProgress(p);
    setDirection(scrollTop > lastY.current ? "down" : "up");
    lastY.current = scrollTop;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [update]);

  return { progress, direction };
}
