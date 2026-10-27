import React from 'react';
import { motion } from 'framer-motion';

export default function SlideReveal({
  children,
  direction = 'up', // 'up' | 'down' | 'left' | 'right'
  delay = 0,
  duration = 0.8,
  trigger = 'inView', // 'inView' | 'mount'
  className = '',
}) {
  const directionOffsets = {
    up: { y: '115%', x: 0 },
    down: { y: '-115%', x: 0 },
    left: { x: '105%', y: 0 },
    right: { x: '-105%', y: 0 },
  };

  const initialOffset = directionOffsets[direction] || directionOffsets.up;

  const motionProps = trigger === 'inView'
    ? {
        initial: { ...initialOffset, opacity: 0 },
        whileInView: { x: 0, y: 0, opacity: 1 },
        viewport: { once: true, margin: '-40px' },
      }
    : {
        initial: { ...initialOffset, opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
      };

  return (
    <div className={`overflow-hidden inline-block align-top ${className}`}>
      <motion.div
        {...motionProps}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}