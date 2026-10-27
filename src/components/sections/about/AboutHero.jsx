import React from 'react';
import PillTag from '../../ui/PillTag';
import SplitReveal from '../../ui/SplitReveal';
import AngledBadgeReveal from '../../ui/AngledBadgeReveal';

const images = '/images';

export default function AboutHero() {
  return (
    <section className="w-full mx-auto font-fira text-center">
      
      {/* Header Headline Stack */}
      <header className="mb-10 sm:mb-14 flex flex-col items-center">

        {/* "ABOUT US" Pill Badge */}
        <div className="mb-2 sm:mb-4">
          <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
            ABOUT US
          </PillTag>
        </div>

        {/* Main Display Headline with SplitReveal on Mount */}
        <h1 className="m-0 font-fira font-extrabold text-darkblue uppercase tracking-tight leading-[0.82] text-[52px] sm:text-[96px] lg:text-[144px] xl:text-[180px]">
          <SplitReveal trigger="mount" delay={0.06}>
            THE BOTTLE
          </SplitReveal>
        </h1>

        {/* Slanted Rectangle Emblem Badge ("BEHIND THE BRAND.") Pop-in Reveal */}
        <AngledBadgeReveal
          trigger="mount"
          targetRotate={-2.5}
          delay={0.24}
          className="-mt-2 sm:-mt-5 lg:-mt-8 z-10"
        >
          <div className="relative bg-cream p-1.5 sm:p-2.5 lg:p-3 select-none shadow-none">
            <div className="relative bg-darkblue text-cream font-fira font-extrabold uppercase leading-[0.823] tracking-tight text-[32px] sm:text-[60px] lg:text-[92px] xl:text-[118px] px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2.5 lg:py-3 overflow-hidden whitespace-nowrap shadow-md">
              {/* Background Water Texture Overlay */}
              <img
                src={`${images}/logo/water-texture.svg`}
                alt=""
                aria-hidden="true"
                width="300"
                height="80"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay pointer-events-none select-none z-0"
              />
              <span className="relative z-10">BEHIND THE BRAND.</span>
            </div>
          </div>
        </AngledBadgeReveal>

        {/* Subtitle Statement Paragraph */}
        <p className="mt-6 sm:mt-8 max-w-2xl sm:max-w-3xl mx-auto font-fira font-normal text-darkblue/90 text-lg sm:text-2xl lg:text-3xl leading-snug tracking-normal">
          We believe a bottle can be more than something you drink from.
          It can carry a brand, a place, a moment and an identity.
        </p>

      </header>

      {/* Responsive Wide Hero Image Banner (LCP Optimized) */}
      <div className="w-full">
        <div className="w-full overflow-hidden rounded-[32px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] xl:rounded-[130px] shadow-sm border border-darkblue/10 bg-cream/40 aspect-[16/10] sm:aspect-[16/9] max-h-[500px] sm:max-h-[650px] md:max-h-[750px] lg:max-h-[850px] xl:max-h-[950px]">
          <picture>
            <source
              media="(min-width: 640px)"
              srcSet={`${images}/about-bg-bottle.webp`}
              type="image/webp"
            />
            <img
              src={`${images}/about-bg-bottle.webp`}
              alt="Custom branded UniSip glass bottle"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width="1400"
              height="788"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = `${images}/unisip-bottle-hero.webp`;
              }}
            />
          </picture>
        </div>
      </div>

    </section>
  );
}