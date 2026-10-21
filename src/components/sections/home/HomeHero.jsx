import React from 'react';
import { motion } from 'framer-motion';
import PillButton from '../../ui/PillButton';

const images = '/images';

// Elastic spring physics for organic water splash & bottle emergence
const splashSpring = {
  type: 'spring',
  stiffness: 110,
  damping: 13,
  mass: 0.85,
};

const bottleSpring = {
  type: 'spring',
  stiffness: 120,
  damping: 14,
  mass: 0.9,
  delay: 0.12, // Slight stagger so splash erupts first
};

export default function HomeHero() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 font-fira relative overflow-x-clip">
      
      {/* 12-Column Responsive Grid Stack */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 lg:gap-6 items-center w-full relative">
        
        {/* ========================================================================
            BACKGROUND FADED BOTTLE & SPLASH VISUAL (CENTERED ON MOBILE: < md)
            ======================================================================== */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[300px] xs:w-[350px] sm:w-[420px] aspect-square opacity-30 pointer-events-none select-none z-0 md:hidden flex items-center justify-center">
          {/* Centered Mobile Splash */}
          <motion.img
            initial={{ scale: 0.2, opacity: 0, rotate: -55 }}
            animate={{ scale: 1.25, opacity: 1, rotate: -45 }}
            transition={splashSpring}
            src={`${images}/splash-final.webp`}
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] object-contain pointer-events-none z-0"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Centered Mobile Bottle */}
          <motion.img
            initial={{ scale: 0.6, opacity: 0, rotate: -34, y: 30 }}
            animate={{ scale: 1, opacity: 1, rotate: -28, y: 0 }}
            transition={bottleSpring}
            src={`${images}/unisip-bottle-hero.webp`}
            alt=""
            aria-hidden="true"
            className="relative z-10 w-full h-auto object-contain drop-shadow-md"
            onError={(e) => {
              e.currentTarget.src = `${images}/about-bg-bottle.webp`;
            }}
          />
        </div>

        {/* ========================================================================
            FOREGROUND COLUMN: DISPLAY HEADLINE, SUBTITLE & CTAS (CENTERED z-10)
            ======================================================================== */}
        <div className="md:col-span-7 flex flex-col items-center text-center md:items-start md:text-left z-10 relative pt-2 sm:pt-4">
          
          {/* Main Display Headline Stack */}
          <h1 className="m-0 font-fira font-extrabold text-darkblue uppercase tracking-tight leading-[0.82] text-[62px] xs:text-[72px] sm:text-[82px] md:text-[88px] lg:text-[108px] xl:text-[124px]">
            <span className="block">BOTTLES</span>
            <span className="block -mt-1 sm:-mt-2 lg:-mt-3">BUILT TO BE</span>
          </h1>

          {/* Slanted Rectangle Emblem Badge ("REMEMBERED.") */}
          <div className="-mt-1 sm:-mt-3 lg:-mt-5 mb-5 sm:mb-6 inline-block relative bg-cream p-1 sm:p-2 -rotate-[2.5deg] select-none shadow-none z-10">
            <div className="relative bg-[#223856] text-cream font-fira font-extrabold uppercase leading-[0.82] tracking-tight text-[40px] xs:text-[48px] sm:text-[58px] md:text-[66px] lg:text-[80px] xl:text-[92px] px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 overflow-hidden whitespace-nowrap shadow-md">
              <img
                src={`${images}/logo/water-texture.svg`}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay pointer-events-none select-none"
              />
              <span className="relative z-10">REMEMBERED.</span>
            </div>
          </div>

          {/* Subtitle Statement */}
          <p className="max-w-xl sm:max-w-2xl font-fira font-normal text-darkblue/90 text-lg sm:text-xl lg:text-[23px] leading-[1.18] tracking-tight mb-6 sm:mb-8 z-10 mx-auto md:mx-0">
            Custom bottles and branded hydration experiences designed around your identity.
          </p>

          {/* Dual Action Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start w-full sm:w-auto gap-3 sm:gap-4 z-10">
            <PillButton
              to="/contact"
              variant="dark"
              size="md"
              className="w-full sm:w-auto !min-h-[50px] !px-7 !text-base sm:!min-h-[52px] sm:!px-6 lg:!min-h-[56px] lg:!px-7 !shadow-md"
            >
              Bottle Your Brand
            </PillButton>

            <PillButton
              to="/work"
              variant="outline"
              size="md"
              className="w-full sm:w-auto !min-h-[50px] !px-7 !text-base sm:!min-h-[52px] sm:!px-6 lg:!min-h-[56px] lg:!px-7 !shadow-none !border-2 !border-darkblue"
            >
              Explore Our Work
            </PillButton>
          </div>

        </div>

        {/* ========================================================================
            RIGHT COLUMN: PULLED INWARD CLOSER TO CENTER (DESKTOP: md+)
            ======================================================================== */}
        <div className="hidden md:flex md:col-span-5 justify-start items-center relative z-0 md:mt-0 md:-ml-4 lg:-ml-8 xl:-ml-12">
          <div className="relative w-full max-w-[360px] lg:max-w-[420px] xl:max-w-[460px] flex justify-center items-center pointer-events-none select-none">
            
            {/* 1. Water Splash: Sized to 140%, locked dead-center, blooms from 0.2 to 1.24 */}
            <motion.img
              initial={{ scale: 0.2, opacity: 0, rotate: -55 }}
              animate={{ scale: 1.24, opacity: 1, rotate: -45 }}
              transition={splashSpring}
              src={`${images}/splash-final.webp`}
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] object-contain pointer-events-none z-0 origin-center"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* 2. Main Branded Bottle: Emerges through the splash from 0.55 to 1.0 */}
            <motion.img
              initial={{ scale: 0.55, opacity: 0, rotate: -34, y: 35 }}
              animate={{ scale: 1, opacity: 1, rotate: -28, y: 0 }}
              transition={bottleSpring}
              src={`${images}/unisip-bottle-hero.webp`}
              alt="UniSip custom branded bottle with water splash"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl origin-center"
              onError={(e) => {
                e.currentTarget.src = `${images}/about-bg-bottle.webp`;
              }}
            />

          </div>
        </div>

      </div>
    </section>
  );
}