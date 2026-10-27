import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PillTag from '../../ui/PillTag';
import SplitReveal from '../../ui/SplitReveal';

const images = '/images';

export default function HomeAboutBanner() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const riseY = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <section ref={containerRef} className="w-full mx-auto font-fira relative">
      <div className="w-full bg-[#090F1F] text-cream rounded-[32px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] xl:rounded-[130px] p-5 sm:p-10 lg:p-16 xl:p-20 overflow-hidden shadow-2xl relative min-h-[740px] sm:min-h-[960px] lg:min-h-[1140px] xl:min-h-[1240px] flex flex-col justify-between">
        
        {/* Subtly Hidden Background Texture */}
        <img
          src={`${images}/logo/water-texture.svg`}
          alt=""
          aria-hidden="true"
          width="1200"
          height="800"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.035] pointer-events-none select-none z-0"
        />

        {/* 1. Header Stack */}
        <div className="flex flex-col items-center text-center z-10 relative pt-2 sm:pt-6">
          <div className="mb-3 sm:mb-4">
            <PillTag variant="cyan" size="md" rotate="-rotate-[3deg]">
              ABOUT US
            </PillTag>
          </div>

          <h2 className="m-0 heading-display text-center leading-[0.85]">
            <span className="block text-cream">
              <SplitReveal delay={0.06}>
                MORE THAN A BOTTLE
              </SplitReveal>
            </span>
            <span className="block text-cyanglow -mt-1 sm:-mt-3">
              <SplitReveal delay={0.22}>
                IT'S A BRAND
              </SplitReveal>
            </span>
          </h2>
        </div>

        {/* 2. Bottle in Hand Visual */}
        <div className="absolute inset-0 flex justify-center items-end z-20 pointer-events-none select-none">
          <motion.div
            style={{ y: riseY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[600px] xl:max-w-[675px] h-full flex items-end justify-center pt-24 sm:pt-36 lg:pt-48 will-change-transform"
          >
            <img
              src={`${images}/hand-bottle-about.webp`}
              alt="Hand holding UniSip custom branded bottle"
              loading="lazy"
              decoding="async"
              width="675"
              height="800"
              className="w-full h-auto object-contain object-bottom"
              onError={(e) => {
                e.currentTarget.src = `${images}/unisip-bottle-hero.webp`;
              }}
            />
          </motion.div>
        </div>

        {/* 3. Bottom Information Layer */}
        <div className="relative z-30 flex flex-row justify-between items-end mt-auto pt-32 sm:pt-40 lg:pt-0 w-full">
          <div className="w-[62%] sm:w-auto max-w-[270px] sm:max-w-[310px] lg:max-w-[350px] flex flex-col items-start text-left bg-[#070C18]/95 p-4 sm:p-5 rounded-2xl border border-cream/10 shadow-2xl">
            <div className="mb-3 sm:mb-4 opacity-95 select-none w-full">
              <img
                src={`${images}/logo/barcode-logo.svg`}
                alt="Barcode"
                width="200"
                height="80"
                className="h-14 sm:h-18 lg:h-24 w-auto max-w-[200px] sm:max-w-[260px] object-contain object-left"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <h3 className="heading-small text-cream mb-1.5 sm:mb-2">
              HYDRATION, WITH AN IDENTITY.
            </h3>

            <p className="text-small text-cream/75 m-0 font-normal">
              UniSip helps businesses turn everyday drinking water into a branded experience. From custom bottle labels to production and delivery, we create bottles designed around the identity of the businesses they represent.
            </p>
          </div>

          {/* Stamp Circle */}
          <div className="flex justify-end items-end">
            <a
              href="/about"
              className="group relative w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="More About UniSip"
            >
              <div className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite] will-change-transform pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <path
                    id="aboutCirclePath"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text className="text-[8px] font-fira font-extrabold uppercase tracking-[0.22em] fill-cream/90">
                    <textPath href="#aboutCirclePath">
                      • MORE ABOUT UNISIP • MORE ABOUT UNISIP • MORE ABOUT UNISIP 
                    </textPath>
                  </text>
                </svg>
              </div>

              <div className="relative z-10 flex items-center justify-center text-cream group-hover:text-cyanglow transition-colors duration-200">
                <svg
                  width="20"
                  height="44"
                  viewBox="0 0 20 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-9 sm:w-7 sm:h-12 lg:w-8 lg:h-14 transition-transform duration-300 group-hover:translate-y-1"
                >
                  <rect x="8" y="2" width="4" height="30" fill="currentColor" />
                  <path d="M2 28 L10 42 L18 28 H14 V28 H6 V28 Z" fill="currentColor" />
                </svg>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}