import React from 'react';
import { motion } from 'framer-motion';

export default function AngledBadgeReveal({
  children,
  targetRotate = -2.5, // Match badge slant
  delay = 0.25,
  trigger = 'inView', // 'inView' | 'mount'
  className = '',
}) {
  const animationVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: targetRotate + 8, // Enters slightly over-rotated
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: targetRotate,
      transition: {
        type: 'spring',
        stiffness: 380,
        damping: 20,
        mass: 0.75,
        delay,
      },
    },
  };

  const motionProps = trigger === 'inView'
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-40px' },
      }
    : {
        initial: 'hidden',
        animate: 'visible',
      };

  return (
    <motion.div
      {...motionProps}
      variants={animationVariants}
      style={{ originX: 0.5, originY: 0.5 }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}