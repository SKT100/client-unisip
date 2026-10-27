import React from 'react';
import { motion } from 'framer-motion';
import PillButton from '../../ui/PillButton';

const images = '/images';

const springPhysics = {
  type: 'spring',
  stiffness: 120,
  damping: 14,
  mass: 0.9,
};

export default function HomeHero() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 font-fira relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 lg:gap-6 items-center w-full relative pt-8 xs:pt-10 sm:pt-12 md:pt-4 lg:pt-6 xl:pt-8 pb-4 sm:pb-6">

        {/* ========================================================================
            BACKGROUND FADED BOTTLE & SPLASH (MOBILE ONLY: < md)
            ======================================================================== */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[53%] -translate-y-1/2 w-[260px] xs:w-[300px] sm:w-[350px] h-[360px] xs:h-[400px] sm:h-[440px] opacity-25 pointer-events-none select-none z-0 md:hidden flex items-center justify-center">
          <img
            src={`${images}/splash-final.webp`}
            alt=""
            aria-hidden="true"
            width="350"
            height="350"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] object-contain pointer-events-none z-0 origin-center animate-pulse"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          <motion.img
            initial={{ scale: 0.6, opacity: 0, rotate: -34, y: 25 }}
            animate={{ scale: 1, opacity: 1, rotate: -28, y: 0 }}
            transition={springPhysics}
            src={`${images}/unisip-bottle-hero.webp`}
            alt="UniSip custom branded bottle"
            width="280"
            height="380"
            className="relative z-10 w-full h-auto max-h-[340px] xs:max-h-[380px] object-contain drop-shadow-md"
            onError={(e) => {
              e.currentTarget.src = `${images}/about-bg-bottle.webp`;
            }}
          />
        </div>

        {/* ========================================================================
            FOREGROUND COLUMN: DISPLAY HEADLINE, SUBTITLE & CTAS
            ======================================================================== */}
        <div className="md:col-span-7 flex flex-col items-center text-center md:items-start md:text-left z-10 relative">
          <h1 className="m-0 font-fira font-extrabold text-darkblue uppercase tracking-tight leading-[0.82] text-[56px] xs:text-[68px] sm:text-[82px] md:text-[84px] lg:text-[104px] xl:text-[120px]">
            <span className="block">BOTTLES</span>
            <span className="block -mt-1 sm:-mt-2 lg:-mt-3">BUILT TO BE</span>
          </h1>

          <div className="-mt-1 sm:-mt-3 lg:-mt-4 mb-5 sm:mb-6 inline-block relative bg-cream p-1 sm:p-2 -rotate-[2.5deg] select-none shadow-none z-10">
            <div className="relative bg-[#223856] text-cream font-fira font-extrabold uppercase leading-[0.82] tracking-tight text-[38px] xs:text-[46px] sm:text-[56px] md:text-[62px] lg:text-[76px] xl:text-[88px] px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 overflow-hidden whitespace-nowrap shadow-md">
              <img
                src={`${images}/logo/water-texture.svg`}
                alt=""
                aria-hidden="true"
                width="200"
                height="80"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay pointer-events-none select-none"
              />
              <span className="relative z-10">REMEMBERED.</span>
            </div>
          </div>

          <p className="max-w-xl sm:max-w-2xl font-fira font-normal text-darkblue/90 text-base sm:text-xl lg:text-[22px] leading-[1.18] tracking-tight mb-6 sm:mb-8 z-10 mx-auto md:mx-0">
            Custom bottles and branded hydration experiences designed around your identity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start w-full sm:w-auto gap-3 sm:gap-4 z-10">
            <PillButton
              to="/contact"
              variant="dark"
              size="md"
              className="w-full sm:w-auto !min-h-[50px] !px-7 !text-base sm:!min-h-[52px] sm:!px-6 lg:!min-h-[56px] lg:!px-7 !shadow-md hover:scale-[1.03] transition-transform"
            >
              Bottle Your Brand
            </PillButton>

            <PillButton
              to="/work"
              variant="outline"
              size="md"
              className="w-full sm:w-auto !min-h-[50px] !px-7 !text-base sm:!min-h-[52px] sm:!px-6 lg:!min-h-[56px] lg:!px-7 !shadow-none !border-2 !border-darkblue hover:scale-[1.03] transition-transform"
            >
              Explore Our Work
            </PillButton>
          </div>
        </div>

        {/* ========================================================================
            RIGHT COLUMN: DESKTOP BOTTLE & GPU PULSING SPLASH
            ======================================================================== */}
        <div className="hidden md:flex md:col-span-5 justify-center items-center relative z-10 md:-translate-y-3 lg:-translate-y-5 md:-ml-2 lg:-ml-4 xl:-ml-6">
          <div className="relative w-full max-w-[340px] lg:max-w-[390px] xl:max-w-[430px] flex justify-center items-center select-none">
            
            {/* GPU Composited Continuous Breathing Splash */}
            <img
              src={`${images}/splash-final.webp`}
              alt=""
              aria-hidden="true"
              width="500"
              height="500"
              className="absolute left-1/2 top-1/2 w-[126%] h-[126%] object-contain pointer-events-none z-0 origin-center animate-splash-pulse will-change-transform"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* Interactive LCP Bottle */}
            <motion.img
              initial={{ scale: 0.55, opacity: 0, rotate: -34, y: 30 }}
              animate={{ scale: 1, opacity: 1, rotate: -28, y: 0 }}
              whileHover={{
                rotate: -18,
                scale: 1.05,
                y: -10,
                transition: { type: 'spring', stiffness: 280, damping: 16 },
              }}
              whileTap={{
                scale: 0.98,
                rotate: -22,
                transition: { type: 'spring', stiffness: 350, damping: 20 },
              }}
              transition={springPhysics}
              src={`${images}/unisip-bottle-hero.webp`}
              alt="UniSip custom branded bottle with water splash"
              width="430"
              height="580"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl origin-center pointer-events-auto cursor-pointer "
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