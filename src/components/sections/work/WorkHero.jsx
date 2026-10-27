import React from 'react';
import { motion } from 'framer-motion';
import PillTag from '../../ui/PillTag';
import PillButton from '../../ui/PillButton';

const images = '/images';

export default function WorkHero({ className = '' }) {
  return (
    <section className={`w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 font-fira relative overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 lg:gap-6 items-center w-full relative pt-8 xs:pt-10 sm:pt-12 md:pt-4 lg:pt-6 xl:pt-8 pb-6 sm:pb-8">

        {/* Mobile Visual Background */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[300px] xs:w-[360px] sm:w-[420px] pointer-events-none select-none z-0 md:hidden opacity-25">
          <img
            src={`${images}/work-hero.webp`}
            alt=""
            aria-hidden="true"
            width="420"
            height="420"
            className="w-full h-auto object-contain drop-shadow-md"
            onError={(e) => {
              e.currentTarget.src = `${images}/unisip-bottle-hero.webp`;
            }}
          />
        </div>

        {/* Foreground Content */}
        <div className="md:col-span-7 flex flex-col items-center text-center md:items-start md:text-left z-10 relative">
          <div className="mb-3 sm:mb-4 z-10">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              OUR WORK
            </PillTag>
          </div>

          <h1 className="m-0 font-fira font-extrabold text-darkblue uppercase tracking-tight leading-[0.82] text-[56px] xs:text-[68px] sm:text-[82px] md:text-[84px] lg:text-[104px] xl:text-[120px]">
            <span className="block">YOUR BRAND.</span>
            <span className="block -mt-1 sm:-mt-2 lg:-mt-3">BOTTLED.</span>
          </h1>

          <div className="-mt-1 sm:-mt-3 lg:-mt-4 mb-5 sm:mb-6 inline-block relative bg-cream p-1 sm:p-2 -rotate-[2.5deg] select-none shadow-none z-10">
            <div className="relative bg-darkblue text-cream font-fira font-extrabold uppercase leading-[0.82] tracking-tight text-[38px] xs:text-[46px] sm:text-[56px] md:text-[62px] lg:text-[76px] xl:text-[88px] px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 overflow-hidden whitespace-nowrap shadow-md">
              <img
                src={`${images}/logo/water-texture.svg`}
                alt=""
                aria-hidden="true"
                width="200"
                height="60"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay pointer-events-none select-none"
              />
              <span className="relative z-10">TO BE REMEMBERED.</span>
            </div>
          </div>

          <p className="max-w-xl sm:max-w-2xl font-fira font-normal text-darkblue/90 text-base sm:text-xl lg:text-[22px] leading-[1.18] tracking-tight mb-8 sm:mb-10 z-10 mx-auto md:mx-0">
            We turn brands, ideas and experiences into custom water bottles; designed to be seen, shared and remembered.
          </p>

          <div className="z-10 w-full sm:w-auto flex justify-center md:justify-start">
            <PillButton
              to="/contact"
              variant="dark"
              size="lg"
              logo={`${images}/logo/bottle-logo-mini.svg`}
              iconSize={26}
              className="w-full sm:w-auto !min-h-[54px] sm:!min-h-[64px] lg:!min-h-[72px] !px-7 sm:!px-10 lg:!px-12 !text-base sm:!text-xl lg:!text-2xl !font-extrabold shadow-xl hover:scale-105 transition-transform"
            >
              Start a project
            </PillButton>
          </div>
        </div>

        {/* Desktop Image (Instant Paint + High Priority) */}
        <div className="hidden md:flex md:col-span-5 justify-center items-center relative z-0 md:mt-0 lg:ml-2 xl:ml-4">
          <div className="relative w-full max-w-[360px] lg:max-w-[460px] xl:max-w-[500px] flex justify-center items-center pointer-events-none select-none">
            <motion.img
              initial={{ y: -40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              src={`${images}/work-hero.webp`}
              alt="UniSip custom branded bottle making process"
              width="500"
              height="500"
              fetchPriority="high"
              loading="eager"
              decoding="async"
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