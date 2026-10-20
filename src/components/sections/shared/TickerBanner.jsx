import React from 'react';
import { motion } from 'framer-motion';

const images = '/images/logo';
const fallbackIcon = `${images}/cone-bottle-outline-logo.svg`;

const MARQUEE_ITEMS = [
  { word: 'FRESH',     icon: `${images}/sipper-bottle-outline-logo.svg` },
  { word: 'SPECIALTY', icon: `${images}/cylindrical-bottle-outline.svg` },
  { word: 'CUSTOM',    icon: `${images}/cone-bottle-outline-logo.svg` },
  { word: 'PREMIUM',   icon: `${images}/curve-bottle-outline-logo.svg` },
];

export default function TickerBanner({ className = '' }) {
  // 4 copies -> animating -50% = exactly 2 copies, so the loop is seamless
  const infiniteTrack = [
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
  ];

  const handleIconError = (e) => {
    // Guard against an endless error loop if the fallback is also missing
    if (!e.currentTarget.src.endsWith(fallbackIcon)) {
      e.currentTarget.src = fallbackIcon;
    }
  };

  const handleIconLoad = (e) => {
    // Some SVGs without a viewBox load "successfully" but render at 0 width
    if (e.currentTarget.naturalWidth === 0) handleIconError(e);
  };

  return (
    <section className={`w-full mx-auto font-fira relative ${className}`}>
      {/* Midblue Container matching Figma specs (Height: 304px, Corner Radius: 130px) */}
      <div className="w-full bg-midblue text-cream rounded-[32px] sm:rounded-[60px] md:rounded-[90px] lg:rounded-[130px] h-[160px] sm:h-[220px] md:h-[260px] lg:h-[304px] flex items-center overflow-hidden relative">

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex items-center whitespace-nowrap w-max"
        >
          {infiniteTrack.map((item, idx) => (
            <div
              key={idx}
              // Spacing lives INSIDE each item (gap + pr), not on the track
              className="flex items-center gap-8 sm:gap-14 lg:gap-20 pr-8 sm:pr-14 lg:pr-20 shrink-0"
            >
              {/* Scaled Display Text */}
              <span className="font-fira font-black text-[40px] sm:text-[76px] lg:text-[108px] xl:text-[128px] uppercase tracking-wider text-cream leading-none select-none">
                {item.word}
              </span>

              {/* Fixed-size slot for SVG separators */}
              <div className="shrink-0 flex items-center justify-center h-[100px] w-[72px] sm:h-[156px] sm:w-[110px] lg:h-[200px] lg:w-[140px] xl:h-[224px] xl:w-[156px]">
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  onError={handleIconError}
                  onLoad={handleIconLoad}
                  className="w-full h-full object-contain -rotate-6 opacity-95 select-none pointer-events-none"
                />
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}