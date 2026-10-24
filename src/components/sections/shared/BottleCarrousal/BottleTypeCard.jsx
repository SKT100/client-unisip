import React from 'react';

const fallbackImage = '/images/unisip-bottle-hero.webp';

export default function BottleTypeCard({
  title,
  subtitle,
  image,
  isLast = false,
  className = '',
}) {
  return (
    <div
      className={`w-[74vw] xs:w-[76vw] sm:w-[46vw] lg:w-[40vw] xl:w-[460px] shrink-0 px-3.5 sm:px-8 flex flex-col justify-between items-start text-left relative select-none font-fira group ${
        !isLast ? 'border-r border-darkblue/15' : ''
      } ${className}`}
    >
      {/* Title & Subtitle */}
      <div className="flex flex-col items-start w-full z-10 min-h-[64px] xs:min-h-[72px] sm:min-h-[95px] lg:min-h-[115px]">
        <h3 className="heading-mid text-darkblue whitespace-pre-line mb-1 sm:mb-2 group-hover:text-midblue transition-colors duration-200">
          {title}
        </h3>
        <p className="text-small text-darkblue/75 font-normal leading-snug m-0 max-w-[190px] sm:max-w-[240px]">
          {subtitle}
        </p>
      </div>

      {/* Visual Container: Scaled down on mobile for balanced proportion */}
      <div className="w-full flex-1 h-[170px] xs:h-[195px] sm:h-[300px] lg:h-[380px] xl:h-[420px] flex items-end justify-center mt-2 sm:mt-4 pointer-events-none relative z-0 overflow-hidden">
        <img
          src={image}
          alt={typeof title === 'string' ? title.replace('\n', ' ') : 'Bottle Visual'}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain object-bottom origin-bottom scale-[0.78] xs:scale-[0.82] sm:scale-95 group-hover:scale-100 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>
    </div>
  );
}