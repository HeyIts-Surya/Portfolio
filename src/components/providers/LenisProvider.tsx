"use client";

import { useEffect, useRef } from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<import("lenis").default | null>(null);

  useEffect(() => {
    // Only run on client
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Integrate with GSAP ScrollTrigger if available
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        import("gsap").then(({ gsap }) => {
          gsap.ticker.add((time: number) => {
            lenis.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
          lenis.on("scroll", ScrollTrigger.update);
        });
      }).catch(() => {
        // GSAP not loaded yet, use RAF loop as fallback
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      });
    });

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
