import React from 'react';

export default function BeliefCard({
  number = '01',
  badgeText = 'IDENTITY',
  heading = '',
  description = '',
  badgeRotate = '-rotate-[6deg]',
  className = '',
}) {
  return (
    <div
      className={`relative bg-cream text-darkblue rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-6 sm:p-7 lg:p-8 pt-16 sm:pt-20 lg:pt-22 flex flex-col justify-end min-h-[220px] sm:min-h-[260px] shadow-xl border border-darkblue/5 min-w-0 ${className}`}
    >
      {/* ========================================================================
          TOP-LEFT SLANTED BADGE (Side-by-Side Pin & Outlined Text)
          ======================================================================== */}
      <div
        className={`absolute -top-7 sm:-top-9 left-4 sm:left-6 z-20 flex items-center gap-1.5 sm:gap-2 select-none pointer-events-none max-w-[90%] ${badgeRotate}`}
      >
        {/* Teardrop / Bubble Pin for Number */}
        <div className="bg-[#101A35] text-white font-fira font-black text-xl sm:text-2xl lg:text-[32px] xl:text-[36px] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-[14px] sm:rounded-[18px] rounded-br-[4px] shadow-lg flex items-center justify-center shrink-0 border border-white/20">
          {number}
        </div>

        {/* Thick Outlined Badge Title Text with Stroke Paint-Order */}
        <span
          className="font-fira font-extrabold text-[32px] sm:text-[42px] lg:text-[50px] xl:text-[58px] uppercase tracking-tight leading-[0.82] text-white whitespace-nowrap"
          style={{
            WebkitTextStroke: '12px #101A35',
            paintOrder: 'stroke fill',
          }}
        >
          {badgeText}
        </span>
      </div>

      {/* ========================================================================
          CARD CONTENT BLOCK (Stickied to Bottom)
          ======================================================================== */}
      <div className="mt-auto flex flex-col">
        {/* Primary Card Title */}
        <h3 className="font-fira font-extrabold text-darkblue text-xl sm:text-2xl lg:text-[28px] xl:text-[31px] leading-[0.88] tracking-tight uppercase mb-1.5">
          {heading}
        </h3>

        {/* Paragraph Subtext */}
        <p className="font-fira font-normal text-darkblue/90 text-sm sm:text-base lg:text-[18px] xl:text-[19px] leading-[1.15] tracking-tight m-0">
          {description}
        </p>
      </div>
    </div>
  );
}