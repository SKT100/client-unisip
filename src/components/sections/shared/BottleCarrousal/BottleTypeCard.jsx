import React from 'react';

const fallbackImage = '/images/unisip-bottle-hero.webp';

/**
 * Individual Bottle Type Card Component
 * Formatted to fit 2 cards per screen view with clean vertical dividers
 * and aligned bottom baselines across all cards.
 */
export default function BottleTypeCard({
  title,
  subtitle,
  image,
  isLast = false,
  className = '',
}) {
  return (
    <div
      className={`w-[85vw] sm:w-[46vw] lg:w-[48vw] xl:w-[580px] shrink-0 px-6 sm:px-10 flex flex-col justify-between items-start text-left relative select-none font-fira ${
        !isLast ? 'border-r border-darkblue/20' : ''
      } ${className}`}
    >
      {/* Top Header & Subtitle Block (Standardized min-height to balance top spacing) */}
      <div className="flex flex-col items-start w-full z-10 min-h-[110px] sm:min-h-[130px] lg:min-h-[150px]">
        {/* Card Headline */}
        <h3 className="font-fira font-extrabold text-darkblue text-3xl sm:text-4xl lg:text-[44px] leading-[0.9] tracking-tight uppercase whitespace-pre-line mb-2 sm:mb-2.5">
          {title}
        </h3>

        {/* Constrained Subtitle Statement */}
        <p className="font-fira font-normal text-darkblue/75 text-sm sm:text-base leading-snug tracking-tight m-0 max-w-[200px] sm:max-w-[240px]">
          {subtitle}
        </p>
      </div>

      {/* Prominent Bottle Visual Container (Anchored to Bottom) */}
      <div className="w-full flex-1 h-[420px] sm:h-[540px] lg:h-[660px] xl:h-[720px] flex items-end justify-center mt-2 sm:mt-4 pointer-events-none relative z-0 overflow-hidden">
        <img
          src={image}
          alt={typeof title === 'string' ? title.replace('\n', ' ') : 'Bottle Visual'}
          className="w-full h-full object-contain object-bottom origin-bottom scale-90 sm:scale-100 transform-gpu transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>
    </div>
  );
}