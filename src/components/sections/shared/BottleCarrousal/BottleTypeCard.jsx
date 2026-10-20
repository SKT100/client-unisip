import React from 'react';

const fallbackImage = '/images/unisip-bottle-hero.webp';

/**
 * Individual Bottle Type Card Component
 * Optimized container heights so card headline, subtitle, and image
 * fit simultaneously on screen across all device viewports.
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
      className={`w-[85vw] sm:w-[46vw] lg:w-[42vw] xl:w-[480px] shrink-0 px-5 sm:px-8 flex flex-col justify-between items-start text-left relative select-none font-fira ${
        !isLast ? 'border-r border-darkblue/20' : ''
      } ${className}`}
    >
      {/* Top Header & Subtitle Block */}
      <div className="flex flex-col items-start w-full z-10 min-h-[85px] sm:min-h-[105px] lg:min-h-[120px]">
        {/* Card Headline */}
        <h3 className="font-fira font-extrabold text-darkblue text-2xl sm:text-3xl lg:text-[36px] leading-[0.92] tracking-tight uppercase whitespace-pre-line mb-1.5 sm:mb-2">
          {title}
        </h3>

        {/* Subtitle Statement */}
        <p className="font-fira font-normal text-darkblue/75 text-xs sm:text-sm lg:text-base leading-snug tracking-tight m-0 max-w-[200px] sm:max-w-[240px]">
          {subtitle}
        </p>
      </div>

      {/* Scaled-down Bottle Visual Container (Anchored to Bottom) */}
      <div className="w-full flex-1 h-[260px] sm:h-[340px] lg:h-[400px] xl:h-[440px] flex items-end justify-center mt-3 sm:mt-4 pointer-events-none relative z-0 overflow-hidden">
        <img
          src={image}
          alt={typeof title === 'string' ? title.replace('\n', ' ') : 'Bottle Visual'}
          className="w-full h-full object-contain object-bottom origin-bottom scale-90 sm:scale-95 transform-gpu transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>
    </div>
  );
}