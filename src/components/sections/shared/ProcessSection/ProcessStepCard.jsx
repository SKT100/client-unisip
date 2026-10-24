import React from 'react';

const fallbackImage = '/images/hand-bottle-about.webp';

export default function ProcessStepCard({
  stepNumber,
  badgeText,
  title,
  description,
  image,
  className = '',
}) {
  return (
    <div
      className={`relative w-full rounded-[24px] sm:rounded-[32px] select-none font-fira group shadow-lg transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      {/* Overlapping Badge Text */}
      <div className="absolute -top-5 sm:-top-7 lg:-top-9 left-4 sm:left-6 z-30 flex flex-col items-start select-none pointer-events-none">
        <span
          className="font-fira font-extrabold text-[20px] sm:text-[30px] lg:text-[38px] uppercase tracking-tight leading-[0.85] text-cream whitespace-nowrap"
          style={{
            WebkitTextStroke: '6px var(--color-darkblue)',
            paintOrder: 'stroke fill',
          }}
        >
          STEP {stepNumber}:
        </span>

        <span
          className="font-fira font-extrabold text-[20px] sm:text-[30px] lg:text-[38px] uppercase tracking-tight leading-[0.85] text-cream whitespace-nowrap -mt-0.5 sm:-mt-1"
          style={{
            WebkitTextStroke: '6px var(--color-darkblue)',
            paintOrder: 'stroke fill',
          }}
        >
          {badgeText}
        </span>
      </div>

      {/* Frame & Image */}
      <div className="relative w-full aspect-[4/3.6] sm:aspect-[4/3.3] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-darkblue">
        <img
          src={image}
          alt={`Step ${stepNumber}: ${badgeText}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-darkblue/60 via-transparent to-transparent z-10" />

        {/* Content Card Overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 z-20 bg-cream p-3.5 sm:p-5 lg:p-6 rounded-[18px] sm:rounded-[24px] shadow-md border border-darkblue/5 text-left">
          <h3 className="heading-small text-darkblue mb-1 sm:mb-1.5 leading-snug">
            {title}
          </h3>
          <p className="text-small text-darkblue/80 font-normal leading-snug m-0 max-w-md">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}