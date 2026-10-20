import React from 'react';
import PillTag from '../../../ui/PillTag';
import BrandShowcaseCard from './BrandShowcaseCard';

const images = '/images';

// Default Showcase Visuals matching the 4-card Bento layout
const DEFAULT_SHOWCASE_ITEMS = [
  {
    id: 'portrait-card',
    image: `${images}/gallery-1.webp`,
  },
  {
    id: 'landscape-card',
    image: `${images}/gallery-2.webp`,
  },
  {
    id: 'bottom-left-card',
    image: `${images}/gallery-3.webp`,
  },
  {
    id: 'bottom-right-card',
    image: `${images}/gallery-4.webp`,
  },
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
    <section className={`w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 font-fira relative ${className}`}>
      
      {/* ========================================================================
          1. SECTION HEADER STACK
          ======================================================================== */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        
        {/* Slanted Pill Tag */}
        {tagText && (
          <div className="mb-3 sm:mb-4">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              {tagText}
            </PillTag>
          </div>
        )}

        {/* Display Headline */}
        <h2 className="m-0 font-fira font-extrabold uppercase tracking-tight leading-[0.83] text-darkblue text-center">
          <span className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap text-[40px] sm:text-[76px] lg:text-[104px] xl:text-[124px]">
            <span>{titleLine1Prefix}</span>
            {titleLine1Outlined && (
              <span
                className="select-none"
                style={{
                  WebkitTextStroke: '3px #101A35',
                  color: 'transparent',
                }}
              >
                {titleLine1Outlined}
              </span>
            )}
          </span>
          <span className="block text-[40px] sm:text-[76px] lg:text-[104px] xl:text-[124px] -mt-1 sm:-mt-3">
            {titleLine2}
          </span>
        </h2>

        {/* Subtitle Statement */}
        <p className="mt-4 sm:mt-6 max-w-md sm:max-w-xl lg:max-w-2xl font-fira font-normal text-darkblue/80 text-sm sm:text-lg lg:text-xl leading-snug tracking-tight m-0">
          {subtitle}
        </p>
      </div>

      {/* ========================================================================
          2. PROPORTIONAL BENTO GRID LAYOUT
          ======================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 w-full">
        
        {/* TOP ROW: Narrow Portrait (Col 4) + Wide Landscape (Col 8) */}
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

        {/* BOTTOM ROW: Equal 50/50 Split (Col 6 + Col 6) */}
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