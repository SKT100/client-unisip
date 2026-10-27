import React from 'react';
import { motion } from 'framer-motion';

const transitionConfig = {
  duration: 0.38,
  ease: [0.22, 1, 0.36, 1], // Crisp cubic-bezier snap
};

export default function RollingText({ text, className = '' }) {
  const chars = typeof text === 'string' ? text.split('') : [];

  return (
    <motion.span
      className={`relative inline-flex overflow-hidden uppercase select-none ${className}`}
      initial="initial"
      whileHover="hover"
    >
      {/* 1. Primary Baseline Layer */}
      <span className="flex">
        {chars.map((char, index) => (
          <motion.span
            key={`top-${index}`}
            className="inline-block will-change-transform"
            transition={{ ...transitionConfig, delay: index * 0.016 }}
            variants={{
              initial: { y: '0%' },
              hover: { y: '-122%' },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>

      {/* 2. Secondary Ascending Layer */}
      <span className="absolute inset-0 flex" aria-hidden="true">
        {chars.map((char, index) => (
          <motion.span
            key={`bot-${index}`}
            className="inline-block will-change-transform"
            transition={{ ...transitionConfig, delay: index * 0.016 }}
            variants={{
              initial: { y: '122%' },
              hover: { y: '0%' },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}