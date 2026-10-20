import React from 'react';
import { motion } from 'framer-motion';
import PillButton from '../../ui/PillButton';

const images = '/images';

export default function HomeHero() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-10 lg:-mt-20 xl:-mt-28 pt-4 sm:pt-0 pb-12 sm:pb-16 lg:pb-24 font-fira relative overflow-x-clip">
      
      {/* 12-Column Responsive Grid Stack */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 lg:gap-6 items-center w-full relative">
        
        {/* ========================================================================
            BACKGROUND FADED BOTTLE & SPLASH VISUAL (CENTERED ON MOBILE: < md)
            ======================================================================== */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[320px] xs:w-[380px] sm:w-[440px] opacity-30 pointer-events-none select-none z-0 md:hidden">
          <div className="relative w-full aspect-square flex justify-center items-center">
            {/* Water Splash Layer */}
            <img
              src={`${images}/splash-final.webp`}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-[140%] h-[140%] -left-[20%] -top-[20%] object-contain pointer-events-none z-0 scale-125 rotate-[-45deg]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Main Bottle Layer */}
            <img
              src={`${images}/unisip-bottle-hero.webp`}
              alt=""
              aria-hidden="true"
              className="relative z-0 w-full h-auto object-contain drop-shadow-md rotate-[-28deg]"
              onError={(e) => {
                e.currentTarget.src = `${images}/about-bg-bottle.webp`;
              }}
            />
          </div>
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
              {/* Background Water Texture Overlay */}
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
            RIGHT COLUMN: DESKTOP BOTTLE & WATER SPLASH (VISIBLE ONLY md AND UP)
            ======================================================================== */}
        <div className="hidden md:flex md:col-span-5 justify-center items-center relative z-0 md:mt-0 lg:ml-2 xl:ml-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[360px] lg:max-w-[420px] xl:max-w-[460px] flex justify-center items-center pointer-events-none select-none"
          >
            {/* Water Splash Rotated -45 Degrees */}
            <img
              src={`${images}/splash-final.webp`}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-[135%] h-[135%] -left-[17.5%] -top-[17.5%] object-contain pointer-events-none z-0 scale-120 rotate-[-45deg]"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* Main Branded Hero Bottle Visual */}
            <img
              src={`${images}/unisip-bottle-hero.webp`}
              alt="UniSip custom branded bottle with water splash"
              className="relative z-0 w-full h-auto object-contain drop-shadow-xl rotate-[-28deg]"
              onError={(e) => {
                e.currentTarget.src = `${images}/about-bg-bottle.webp`;
              }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}