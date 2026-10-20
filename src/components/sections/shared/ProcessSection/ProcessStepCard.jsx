import React from 'react';
import { motion } from 'framer-motion';

const fallbackImage = '/images/hand-bottle-about.webp';

/**
 * Individual Process Step Card Component
 * Features straight, thick-outlined white display badge text (STEP XX: / TITLE),
 * full background image, cream content overlay card, and subtle hover interaction.
 */
export default function ProcessStepCard({
  stepNumber,
  badgeText,
  title,
  description,
  image,
  className = '',
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-[28px] sm:rounded-[36px] overflow-visible select-none font-fira group shadow-xl ${className}`}
    >
      {/* ========================================================================
          1. OVERLAPPING STRAIGHT OUTLINED DISPLAY TEXT BADGE
          ======================================================================== */}
      <div className="absolute -top-7 sm:-top-9 lg:-top-11 left-6 sm:left-8 z-30 flex flex-col items-start select-none pointer-events-none">
        {/* Line 1: STEP XX: */}
        <span
          className="font-fira font-extrabold text-[24px] sm:text-[34px] lg:text-[42px] uppercase tracking-tight leading-[0.85] text-white whitespace-nowrap"
          style={{
            WebkitTextStroke: '10px #101A35',
            paintOrder: 'stroke fill',
          }}
        >
          STEP {stepNumber}:
        </span>

        {/* Line 2: BADGE TITLE */}
        <span
          className="font-fira font-extrabold text-[24px] sm:text-[34px] lg:text-[42px] uppercase tracking-tight leading-[0.85] text-white whitespace-nowrap -mt-0.5 sm:-mt-1"
          style={{
            WebkitTextStroke: '10px #101A35',
            paintOrder: 'stroke fill',
          }}
        >
          {badgeText}
        </span>
      </div>

      {/* ========================================================================
          2. MAIN OUTER FRAME & BACKGROUND IMAGE
          ======================================================================== */}
      <div className="relative w-full aspect-[4/3.8] sm:aspect-[4/3.5] lg:aspect-[4/3.2] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#101A35]">
        <img
          src={image}
          alt={`Step ${stepNumber}: ${badgeText}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />

        {/* Subtle Dark Gradient Overlay at Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101A35]/60 via-transparent to-transparent z-10" />

        {/* ========================================================================
            3. BOTTOM CREAM CONTENT OVERLAY CARD
            ======================================================================== */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 bg-[#F5F4EF] p-4 sm:p-6 lg:p-7 rounded-[20px] sm:rounded-[26px] shadow-lg border border-[#101A35]/5 text-left">
          <h3 className="font-fira font-extrabold text-[#101A35] text-base sm:text-xl lg:text-2xl leading-snug tracking-tight uppercase mb-1.5 sm:mb-2">
            {title}
          </h3>
          <p className="font-fira font-normal text-[#101A35]/80 text-xs sm:text-sm lg:text-base leading-snug tracking-tight m-0 max-w-md">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}