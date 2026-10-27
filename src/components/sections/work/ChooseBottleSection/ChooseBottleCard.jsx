import React from 'react';

const fallbackImage = '/images/unisip-bottle-hero.webp';

export default function ChooseBottleCard({
  title = 'Unisip Glacier',
  volume = '500 ml',
  image = fallbackImage,
  rotate = 'rotate-0',
  className = '',
}) {
  return (
    <div
      className={`shrink-0 w-[210px] sm:w-[250px] lg:w-[280px] bg-midblue text-cream rounded-[24px] sm:rounded-[28px] p-3 sm:p-4 select-none font-fira flex flex-col justify-between transition-all duration-300 hover:scale-[1.05] hover:-translate-y-2 hover:shadow-2xl hover:z-30 relative will-change-transform shadow-md ${rotate} ${className}`}
    >
      {/* 3:4 Portrait Aspect Ratio Container */}
      <div className="w-full aspect-[3/4] rounded-[16px] sm:rounded-[20px] overflow-hidden flex items-center justify-center relative bg-darkblue/25">
        <img
          src={image}
          alt={title}
          draggable="false"
          loading="lazy"
          decoding="async"
          width="280"
          height="373"
          className="w-full h-full object-cover object-top pointer-events-none select-none transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      {/* Product Details Stack */}
      <div className="pt-3 pb-1 px-1 text-left flex flex-col justify-end">
        <h4 className="font-fira font-bold text-cream text-base sm:text-lg leading-tight uppercase tracking-tight m-0">
          {title}
        </h4>
        <span className="font-fira font-normal text-cream/80 text-xs sm:text-sm leading-tight tracking-tight mt-0.5">
          {volume}
        </span>
      </div>
    </div>
  );
}