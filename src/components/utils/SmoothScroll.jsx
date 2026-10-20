import React, { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Global Smooth Scroll Wrapper using Lenis
 * Configures inertial scrolling, easing curves, and updates automatically on page transitions.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // 1. Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // 2. Connect Lenis to requestAnimationFrame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // 3. Clean up on unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}