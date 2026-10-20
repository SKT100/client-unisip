import React from 'react';
import { motion } from 'framer-motion';

const images = '/images';

export default function StoryBannerSection({
  titleTop = 'EVERY BOTTLE\nTELLS',
  badgeText = 'YOUR STORY.',
  subtitle = 'OF BRAND, IDENTITY\n& EXPERIENCE.',
  bannerImage = `${images}/home-bottle-water-drop.webp`,
  className = '',
}) {
  return (
    <section className={`w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 font-fira relative overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-center">
        
        {/* ========================================================================
            1. LEFT COLUMN: TYPOGRAPHY & OVERLAPPING SLANTED BADGE STACK
            ======================================================================== */}
        <div className="lg:col-span-6 flex flex-col items-start text-left relative lg:pl-4">
          
          {/* Top Line Display Headline (Lower z-index) */}
          <h2 className="heading-display text-darkblue m-0 leading-[0.82] relative z-0">
            <span className="block whitespace-pre-line">
              {titleTop}
            </span>
          </h2>

          {/* Light-Blue Slanted Badge (Higher z-index, overlapping "TELLS") */}
          <div className="relative z-10 -mt-3 sm:-mt-5 lg:-mt-7 inline-block -rotate-[2.5deg] select-none">
            <div className="bg-[#39b8f2] text-cream heading-big px-4 sm:px-6 py-1.5 sm:py-2 whitespace-nowrap">
              <span className="relative z-10">{badgeText}</span>
            </div>
          </div>

          {/* Smaller Lower Text with Clean Spacing Gap */}
          <p className="heading-mid text-darkblue m-0 mt-3 sm:mt-5 lg:mt-6 whitespace-pre-line opacity-95 relative z-0">
            {subtitle}
          </p>

        </div>

        {/* ========================================================================
            2. RIGHT COLUMN: PRE-RENDERED WATER DROP BOTTLE VISUAL
            ======================================================================== */}
        <div className="lg:col-span-6 flex justify-center lg:justify-start items-center relative z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] flex items-center justify-center pointer-events-none select-none"
          >
            <img
              src={bannerImage}
              alt="UniSip Bottle Water Drop Visual"
              className="w-full h-auto object-contain drop-shadow-xl"
              onError={(e) => {
                e.currentTarget.src = `${images}/unisip-bottle-hero.webp`;
              }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}