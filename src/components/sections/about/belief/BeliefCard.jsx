import React from 'react';

export default function BeliefCard({
  number = '01',
  badgeText = 'IDENTITY',
  heading = '',
  description = '',
  badgeRotate = '-rotate-[5deg]',
  className = '',
}) {
  return (
    <div
      className={`relative bg-cream text-darkblue rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] p-5 sm:p-7 lg:p-8 pt-11 xs:pt-13 sm:pt-16 lg:pt-18 flex flex-col justify-between min-h-[180px] sm:min-h-[220px] lg:min-h-[250px] shadow-lg border border-darkblue/10 min-w-0 ${className}`}
    >
      {/* ========================================================================
          TOP-LEFT BADGE (Enlarged Pin & Broad Outlined Heading)
          ======================================================================== */}
      <div
        className={`absolute -top-5 xs:-top-6 sm:-top-8 lg:-top-10 left-3.5 sm:left-6 z-20 flex items-center gap-2 sm:gap-2.5 select-none pointer-events-none max-w-[95%] ${badgeRotate}`}
      >
        {/* Number Badge Pin */}
        <div className="bg-darkblue text-cream font-fira font-black text-base xs:text-lg sm:text-2xl lg:text-[28px] px-2.5 xs:px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-[12px] sm:rounded-[16px] rounded-br-[3px] shadow-md flex items-center justify-center shrink-0 border border-white/20">
          {number}
        </div>

        {/* Larger Outlined Badge Heading with Broader Stroke */}
        <span
          className="font-fira font-extrabold text-[28px] xs:text-[34px] sm:text-[44px] lg:text-[54px] xl:text-[58px] uppercase tracking-tight leading-[0.82] text-cream whitespace-nowrap"
          style={{
            WebkitTextStroke: '10px var(--color-darkblue)',
            paintOrder: 'stroke fill',
          }}
        >
          {badgeText}
        </span>
      </div>

      {/* ========================================================================
          CARD CONTENT BLOCK
          ======================================================================== */}
      <div className="flex flex-col mt-auto pt-2">
        {/* Enlarged Heading */}
        <h3 className="heading-mid text-darkblue mb-1.5 sm:mb-2 leading-tight">
          {heading}
        </h3>

        <p className="text-small text-darkblue/80 font-normal leading-relaxed m-0">
          {description}
        </p>
      </div>
    </div>
  );
}