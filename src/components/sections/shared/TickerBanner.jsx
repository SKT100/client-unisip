import React from 'react';

const images = '/images/logo';
const fallbackIcon = `${images}/cone-bottle-outline-logo.svg`;

const MARQUEE_ITEMS = [
  { word: 'FRESH', icon: `${images}/sipper-bottle-outline-logo.svg` },
  { word: 'SPECIALTY', icon: `${images}/cylindrical-bottle-outline.svg` },
  { word: 'CUSTOM', icon: `${images}/cone-bottle-outline-logo.svg` },
  { word: 'PREMIUM', icon: `${images}/curve-bottle-outline-logo.svg` },
];

export default function TickerBanner({ className = '' }) {
  // 2 sets are sufficient for a seamless -50% translation loop
  const trackItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  const handleIconError = (e) => {
    if (!e.currentTarget.src.endsWith(fallbackIcon)) {
      e.currentTarget.src = fallbackIcon;
    }
  };

  return (
    <section className={`w-full mx-auto font-fira relative select-none ${className}`}>
      <div className="w-full bg-midblue text-cream rounded-[32px] sm:rounded-[60px] md:rounded-[90px] lg:rounded-[130px] h-[160px] sm:h-[220px] md:h-[260px] lg:h-[304px] flex items-center overflow-hidden relative shadow-lg">
        
        {/* Hardware-accelerated CSS Marquee Track */}
        <div className="flex items-center whitespace-nowrap w-max animate-ticker will-change-transform">
          {trackItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-8 sm:gap-14 lg:gap-20 pr-8 sm:pr-14 lg:pr-20 shrink-0"
            >
              <span className="font-fira font-black text-[40px] sm:text-[76px] lg:text-[108px] xl:text-[128px] uppercase tracking-wider text-cream leading-none">
                {item.word}
              </span>

              <div className="shrink-0 flex items-center justify-center h-[90px] w-[65px] sm:h-[140px] sm:w-[100px] lg:h-[180px] lg:w-[130px] xl:h-[210px] xl:w-[145px]">
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  onError={handleIconError}
                  className="w-full h-full object-contain -rotate-6 opacity-95 pointer-events-none"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}