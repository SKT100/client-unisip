import React from 'react';
import PillTag from '../../ui/PillTag';

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

        {/* Main Display Headline */}
        <h1 className="m-0 font-fira font-extrabold text-darkblue uppercase tracking-tight leading-[0.82] text-[52px] sm:text-[96px] lg:text-[144px] xl:text-[180px]">
          THE BOTTLE
        </h1>

        {/* Slanted Rectangle Emblem Badge ("BEHIND THE BRAND.") */}
        <div className="-mt-2 sm:-mt-5 lg:-mt-8 inline-block relative bg-cream p-1.5 sm:p-2.5 lg:p-3 -rotate-[2.5deg] rounded-none shadow-none">
          <div className="relative bg-[#223856] text-cream font-fira font-extrabold uppercase leading-[0.823] tracking-tight text-[32px] sm:text-[60px] lg:text-[92px] xl:text-[118px] px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2.5 lg:py-3 overflow-hidden whitespace-nowrap">
            {/* Background Water Texture Overlay */}
            <img
              src={`${images}/logo/water-texture.svg`}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay pointer-events-none"
            />
            <span className="relative z-10">BEHIND THE BRAND.</span>
          </div>
        </div>

        {/* Subtitle Statement Paragraph */}
        <p className="mt-6 sm:mt-8 max-w-2xl sm:max-w-3xl mx-auto font-fira font-normal text-darkblue/90 text-lg sm:text-2xl lg:text-3xl leading-snug tracking-normal">
          We believe a bottle can be more than something you drink from.
          It can carry a brand, a place, a moment and an identity.
        </p>

      </header>

      {/* Responsive Wide Hero Image Banner */}
      <div className="w-full">
        <div className="w-full overflow-hidden rounded-[32px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] xl:rounded-[130px] shadow-sm border border-darkblue/10">
          <img
            src="/images/about-bg-bottle.webp"
            alt="Custom branded UniSip glass bottle"
            className="w-full h-auto max-h-[500px] sm:max-h-[650px] md:max-h-[750px] lg:max-h-[850px] xl:max-h-[950px] object-cover object-center"
          />
        </div>
      </div>

    </section>
  );
}