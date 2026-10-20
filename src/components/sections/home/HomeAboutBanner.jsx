import React from 'react';
import { motion } from 'framer-motion';
import PillTag from '../../ui/PillTag';

const images = '/images';

export default function HomeAboutBanner() {
  return (
    <section className="w-full mx-auto font-fira relative">
      
      {/* Outer Rounded Container - Full Width with Dynamic Aspect Ratio */}
      <div className="w-full bg-[#101A35] text-[#F5F4EF] rounded-[32px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] xl:rounded-[130px] p-5 sm:p-10 lg:p-16 xl:p-20 overflow-hidden shadow-2xl relative min-h-[740px] sm:min-h-[960px] lg:min-h-[1140px] xl:min-h-[1240px] flex flex-col justify-between">
        
        {/* Subtle Background Water Texture Overlay */}
        <img
          src={`${images}/logo/water-texture.svg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none select-none z-0"
        />

        {/* ========================================================================
            1. TOP SECTION: HEADLINE STACK (z-10, Larger on Mobile)
            ======================================================================== */}
        <div className="flex flex-col items-center text-center z-10 relative pt-2 sm:pt-6">
          
          {/* Cyan "ABOUT US" Pill Badge */}
          <div className="mb-3 sm:mb-4">
            <PillTag variant="cyan" size="md" rotate="-rotate-[3deg]">
              ABOUT US
            </PillTag>
          </div>

          {/* Display Headline Stack */}
          <h2 className="m-0 font-fira font-extrabold uppercase tracking-tight leading-[0.85] text-center">
            {/* Line 1 in Cream */}
            <span className="block text-[#F5F4EF] text-[42px] sm:text-[72px] lg:text-[104px] xl:text-[124px]">
              MORE THAN A BOTTLE
            </span>
            {/* Line 2 in Bright Cyan */}
            <span className="block text-[#39B8F2] text-[42px] sm:text-[72px] lg:text-[104px] xl:text-[124px] -mt-1 sm:-mt-3">
              IT'S A BRAND
            </span>
          </h2>

        </div>

        {/* ========================================================================
            2. CENTER VISUAL: BOTTLE IN HAND (z-20, Scaled Up for Mobile)
            ======================================================================== */}
        <div className="absolute inset-0 flex justify-center items-end z-20 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[675px] h-full flex items-end justify-center pt-24 sm:pt-36 lg:pt-48"
          >
            <img
              src={`${images}/hand-bottle-about.webp`}
              alt="Hand holding UniSip custom branded bottle"
              className="w-full h-auto object-contain object-bottom drop-shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = `${images}/unisip-bottle-hero.webp`;
              }}
            />
          </motion.div>
        </div>

        {/* ========================================================================
            3. BOTTOM OVERLAY LAYER (z-30) - Portrait Card & Circular Stamp
            ======================================================================== */}
        <div className="relative z-30 flex flex-row justify-between items-end mt-auto pt-32 sm:pt-40 lg:pt-0 w-full">
          
          {/* Bottom Left Block: Portrait Card with Scaled Barcode */}
          <div className="w-[62%] sm:w-auto max-w-[270px] sm:max-w-[310px] lg:max-w-[350px] flex flex-col items-start text-left bg-[#101A35]/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/5">
            {/* Enlarged Barcode Graphic */}
            <div className="mb-3 sm:mb-4 opacity-95 select-none w-full">
              <img
                src={`${images}/logo/barcode-logo.svg`}
                alt="Barcode"
                className="h-18 sm:h-20 lg:h-28 w-auto max-w-[220px] sm:max-w-[280px] object-contain object-left"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Sub-heading */}
            <h3 className="font-fira font-extrabold text-[#F5F4EF] text-xs sm:text-lg lg:text-xl uppercase tracking-tight leading-tight mb-1.5 sm:mb-2">
              HYDRATION, WITH AN IDENTITY.
            </h3>

            {/* Paragraph Subtext */}
            <p className="font-fira font-normal text-[#F5F4EF]/75 text-[11px] sm:text-sm leading-snug tracking-tight m-0">
              UniSip helps businesses turn everyday drinking water into a branded experience. From custom bottle labels to production and delivery, we create bottles designed around the identity of the businesses they represent.
            </p>
          </div>

          {/* Bottom Right Block: Rotating Stamp with Narrow Geometric Arrow */}
          <div className="flex justify-end items-end">
            <a
              href="/about"
              className="group relative w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
              aria-label="More About UniSip"
            >
              {/* Spinning Circular Text Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 w-full h-full"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <path
                    id="aboutCirclePath"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text className="text-[8px] font-fira font-extrabold uppercase tracking-[0.22em] fill-[#F5F4EF]/90">
                    <textPath href="#aboutCirclePath">
                      • MORE ABOUT UNISIP • MORE ABOUT UNISIP • MORE ABOUT UNISIP 
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Narrow Geometric Arrow SVG */}
              <div className="relative z-10 flex items-center justify-center text-[#F5F4EF] group-hover:text-[#39B8F2] transition-colors duration-300">
                <svg
                  width="20"
                  height="44"
                  viewBox="0 0 20 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-9 sm:w-7 sm:h-12 lg:w-8 lg:h-14 transition-transform duration-300 group-hover:translate-y-1"
                >
                  {/* Narrow Center Stem */}
                  <rect x="8" y="2" width="4" height="30" fill="currentColor" />
                  {/* Pointing Downward Arrow Head */}
                  <path
                    d="M2 28 L10 42 L18 28 H14 V28 H6 V28 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}