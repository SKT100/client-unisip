import React from 'react';
import { motion } from 'framer-motion';

const letterVariants = {
  hidden: { 
    y: '112%',
    opacity: 0,
  },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      delay: i * 0.02,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function SplitReveal({
  children,
  className = '',
  style = {},
  charStyle = {},
  delay = 0,
  trigger = 'inView', // 'inView' | 'mount'
}) {
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  let globalCharIndex = 0;

  return (
    <span
      className={`inline ${className}`}
      style={style}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      
      <span aria-hidden="true" className="inline">
        {words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((char, charIndex) => {
                const currentIndex = globalCharIndex++;
                return (
                  <span
                    key={charIndex}
                    className="inline-block overflow-hidden align-top px-[0.04em] -mx-[0.04em] pt-[0.02em] pb-[0.16em] -mb-[0.16em]"
                  >
                    <motion.span
                      custom={currentIndex + delay * 32}
                      variants={letterVariants}
                      initial="hidden"
                      {...(trigger === 'inView'
                        ? {
                            whileInView: 'visible',
                            viewport: { once: true, margin: '-30px' },
                          }
                        : { animate: 'visible' })}
                      style={charStyle}
                      className="inline-block will-change-transform"
                    >
                      {char}
                    </motion.span>
                  </span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
}