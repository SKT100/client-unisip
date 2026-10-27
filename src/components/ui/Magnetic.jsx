import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function Magnetic({
  children,
  pullStrength = 0.35, // Pull intensity (0.1 to 0.5)
  radius = 45,         // Pixel boundary beyond element edges
  className = '',
}) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Damped physical spring return
  const springX = useSpring(mouseX, { stiffness: 220, damping: 16, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 16, mass: 0.1 });

  const handleMouseMove = (e) => {
    // Disable on mobile/touch screens to preserve scroll fidelity
    if (!ref.current || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distance = Math.hypot(clientX - centerX, clientY - centerY);
    const triggerRadius = Math.max(width, height) / 2 + radius;

    if (distance < triggerRadius) {
      mouseX.set((clientX - centerX) * pullStrength);
      mouseY.set((clientY - centerY) * pullStrength);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}