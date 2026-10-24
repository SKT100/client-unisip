import React from 'react';
import PillTag from '../../../ui/PillTag';
import BrandShowcaseCard from './BrandShowcaseCard';

const images = '/images';

const DEFAULT_SHOWCASE_ITEMS = [
  { id: 'portrait-card', image: `${images}/gallery-1.webp` },
  { id: 'landscape-card', image: `${images}/gallery-2.webp` },
  { id: 'bottom-left-card', image: `${images}/gallery-3.webp` },
  { id: 'bottom-right-card', image: `${images}/gallery-4.webp` },
];

export default function WhereBrandShowsUpSection({
  tagText = 'ON THE MOVE',
  titleLine1Prefix = 'WHERE YOUR',
  titleLine1Outlined = 'BRAND',
  titleLine2 = 'SHOWS UP',
  subtitle = 'From your brand identity to the finished bottle, we make custom hydration simple.',
  items = DEFAULT_SHOWCASE_ITEMS,
  className = '',
}) {
  return (
    <section className={`w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 font-fira relative ${className}`}>
      
      {/* 1. Header Stack */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-16">
        {tagText && (
          <div className="mb-3 sm:mb-4">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              {tagText}
            </PillTag>
          </div>
        )}

        <h2 className="m-0 heading-display text-darkblue text-center leading-[0.83]">
          <span className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
            <span>{titleLine1Prefix}</span>
            {titleLine1Outlined && (
              <span
                className="select-none"
                style={{
                  WebkitTextStroke: '3px var(--color-darkblue)',
                  color: 'transparent',
                }}
              >
                {titleLine1Outlined}
              </span>
            )}
          </span>
          <span className="block -mt-1 sm:-mt-3">
            {titleLine2}
          </span>
        </h2>

        <p className="mt-4 sm:mt-6 max-w-md sm:max-w-xl lg:max-w-2xl text-general font-normal text-darkblue/80 leading-snug tracking-tight m-0">
          {subtitle}
        </p>
      </div>

      {/* 2. Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 w-full">
        <div className="lg:col-span-4">
          <BrandShowcaseCard
            image={items[0]?.image}
            aspectClass="aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[380px] xl:h-[420px]"
          />
        </div>

        <div className="lg:col-span-8">
          <BrandShowcaseCard
            image={items[1]?.image}
            aspectClass="aspect-[16/10] sm:aspect-[16/11] lg:aspect-auto lg:h-[380px] xl:h-[420px]"
          />
        </div>

        <div className="lg:col-span-6">
          <BrandShowcaseCard
            image={items[2]?.image}
            aspectClass="aspect-[16/10] sm:aspect-[16/11] lg:aspect-auto lg:h-[380px] xl:h-[420px]"
          />
        </div>

        <div className="lg:col-span-6">
          <BrandShowcaseCard
            image={items[3]?.image}
            aspectClass="aspect-[16/10] sm:aspect-[16/11] lg:aspect-auto lg:h-[380px] xl:h-[420px]"
          />
        </div>
      </div>

    </section>
  );
}