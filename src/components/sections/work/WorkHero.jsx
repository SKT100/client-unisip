import React from 'react';
import PillTag from '../../ui/PillTag';
import PillButton from '../../ui/PillButton';

const images = '/images';

export default function WorkHero({ className = '' }) {
  return (
    <section className={`w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-8 lg:-mt-14 sm:pb-2 lg:pb-4 font-fira relative overflow-x-clip ${className}`}>

      {/* 12-Column Responsive Grid Stack */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 lg:gap-6 items-center w-full relative">

        {/* ========================================================================
            LEFT COLUMN: DISPLAY HEADLINE, SUBTITLE & START A PROJECT PILL BUTTON (z-10)
            ======================================================================== */}
        <div className="md:col-span-7 flex flex-col items-start text-left z-10 relative pt-1 sm:pt-2">

          {/* Slanted "OUR WORK" Pill Tag */}
          <div className="mb-3 sm:mb-4 z-10">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              OUR WORK
            </PillTag>
          </div>

          {/* Main Display Headline Stack */}
          <h1 className="m-0 font-fira font-extrabold text-darkblue uppercase tracking-tight leading-[0.82] text-[58px] sm:text-[78px] md:text-[88px] lg:text-[108px] xl:text-[124px]">
            <span className="block">YOUR BRAND.</span>
            <span className="block -mt-1 sm:-mt-2 lg:-mt-3">BOTTLED.</span>
          </h1>

          {/* Slanted Water-Texture Emblem Badge ("TO BE REMEMBERED.") */}
          <div className="-mt-1 sm:-mt-3 lg:-mt-5 mb-5 sm:mb-6 inline-block relative bg-cream p-1 sm:p-2 -rotate-[2.5deg] select-none shadow-none z-10">
            <div className="relative bg-[#223856] text-cream font-fira font-extrabold uppercase leading-[0.82] tracking-tight text-[38px] sm:text-[56px] md:text-[66px] lg:text-[80px] xl:text-[92px] px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 overflow-hidden whitespace-nowrap shadow-md">
              {/* Background Water Texture Overlay */}
              <img
                src={`${images}/logo/water-texture.svg`}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay pointer-events-none select-none"
              />
              <span className="relative z-10">TO BE REMEMBERED.</span>
            </div>
          </div>

          {/* Subtitle Statement */}
          <p className="max-w-xl sm:max-w-2xl font-fira font-normal text-darkblue/90 text-lg sm:text-xl lg:text-[23px] leading-[1.18] tracking-tight mb-8 sm:mb-10 z-10">
            We turn brands, ideas and experiences into custom water bottles; designed to be seen, shared and remembered.
          </p>

          {/* Big & Chunky PillButton linked to Contact Page */}
          <div className="z-10">
            <PillButton
              to="/contact"
              variant="dark"
              size="lg"
              logo={`${images}/logo/bottle-logo-mini.svg`}
              iconSize={28}
              className="!min-h-[62px] sm:!min-h-[72px] lg:!min-h-[80px] !px-8 sm:!px-10 lg:!px-12 !text-lg sm:!text-xl lg:!text-2xl !font-extrabold shadow-xl"
            >
              Start a project
            </PillButton>
          </div>

        </div>

        {/* ========================================================================
            RIGHT COLUMN: BOTTLE & SCENIC ILLUSTRATION VISUAL
            ======================================================================== */}
        <div className="flex md:col-span-5 justify-center md:justify-center items-center relative z-0 mt-4 md:mt-0 lg:ml-2 xl:ml-4">
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] flex justify-center items-center pointer-events-none select-none">
            <img
              src={`${images}/work-hero.webp`}
              alt="UniSip custom branded bottle making process"
              className="relative z-0 w-full h-auto object-contain drop-shadow-xl"
              onError={(e) => {
                e.currentTarget.src = `${images}/unisip-bottle-hero.webp`;
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}