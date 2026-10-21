import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import PillTag from '../../ui/PillTag';

const images = '/images';

export default function OurStorySection() {
  const containerRef = useRef(null);

  // Direct 1:1 scroll tracking (instant rapid response scrolling up and down)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 85%'],
  });

  const storySteps = [
    {
      id: 'observation',
      title: 'THE OBSERVATION',
      text: 'Water is everywhere. But the bottles carrying it rarely say anything about the brand behind them.',
      side: 'left',
    },
    {
      id: 'idea',
      title: 'THE IDEA',
      text: 'What if hydration could become part of the brand experience?',
      side: 'right',
    },
    {
      id: 'build',
      title: 'THE BUILD',
      text: 'UniSip was created to bring together custom bottles, thoughtful design and reliable production.',
      side: 'left',
    },
    {
      id: 'today',
      title: 'TODAY',
      text: 'We help businesses turn an ordinary bottle into something recognisably theirs.',
      side: 'right',
    },
  ];

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 font-fira relative overflow-visible">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
        {/* Top Slanted Pill Tag */}
        <div className="mb-2 sm:mb-3">
          <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
            OUR STORY
          </PillTag>
        </div>

        {/* Display Title ("WHY" Outlined + "UNISIP?" Solid) */}
        <h2 className="m-0 flex flex-col items-center font-fira font-extrabold uppercase leading-[0.82] tracking-tight">
          <span 
            className="text-[54px] sm:text-[90px] lg:text-[120px] select-none"
            style={{ WebkitTextStroke: '2.5px #101A35', color: 'transparent' }}
          >
            WHY
          </span>
          <span className="text-darkblue text-[58px] sm:text-[98px] lg:text-[132px]">
            UNISIP?
          </span>
        </h2>
      </div>

      {/* Main Timeline Container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto min-h-[600px]">

        {/* Faint Background Timeline Spine */}
        <div 
          className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2.5px] bg-darkblue/15 -translate-x-1/2 z-0" 
          aria-hidden="true" 
        />

        {/* Rapid 1:1 Descending Line (Animated on Scroll) */}
        <motion.div 
          style={{ scaleY: scrollYProgress }}
          className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2.5px] bg-darkblue -translate-x-1/2 origin-top z-10" 
          aria-hidden="true" 
        />

        {/* Top Right Decorative Image: Bottle Caps (Positioned in empty right space of Row 1) */}
        <div className="hidden lg:block absolute right-[-10%] xl:right-[-14%] top-[-15%] z-0 pointer-events-none select-none">
          <img
            src={`${images}/bottle-caps-about.webp`}
            alt="Variety of UniSip custom bottle caps"
            className="w-[360px] lg:w-[440px] xl:w-[500px] h-auto object-contain"
          />
        </div>

        {/* Bottom Left Decorative Image: Packaging Box & Bottles (Positioned in empty left space of Row 4) */}
        <div className="hidden lg:block absolute left-[-14%] xl:left-[-18%] bottom-[-25%] z-0 pointer-events-none select-none">
          <img
            src={`${images}/toppled-bottles-about.webp`}
            alt="UniSip custom packaging box and branded bottles"
            className="w-[420px] lg:w-[520px] xl:w-[600px] h-auto object-contain"
          />
        </div>

        {/* Timeline Items Grid Stack */}
        <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32 relative z-20">
          {storySteps.map((step) => {
            const isLeft = step.side === 'left';

            return (
              <div
                key={step.id}
                className="relative grid grid-cols-1 md:grid-cols-2 items-center w-full min-h-[90px]"
              >
                {/* Left Side Column */}
                <div
                  className={`${
                    isLeft
                      ? 'block pl-12 md:pl-0 md:pr-12 text-left md:text-right'
                      : 'hidden md:block'
                  }`}
                >
                  {isLeft && (
                    <div className="max-w-md md:ml-auto">
                      <h3 className="font-fira font-extrabold text-darkblue uppercase tracking-tight text-2xl sm:text-3xl lg:text-[38px] leading-none mb-2">
                        {step.title}
                      </h3>
                      <p className="font-fira font-normal text-darkblue/80 text-base sm:text-xl lg:text-[22px] leading-snug">
                        {step.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Timeline Center Node Dot */}
                <div 
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-darkblue border-4 border-cream z-30"
                  aria-hidden="true" 
                />

                {/* Right Side Column */}
                <div
                  className={`${
                    !isLeft
                      ? 'block pl-12 md:pl-12 text-left'
                      : 'hidden md:block'
                  }`}
                >
                  {!isLeft && (
                    <div className="max-w-md">
                      <h3 className="font-fira font-extrabold text-darkblue uppercase tracking-tight text-2xl sm:text-3xl lg:text-[38px] leading-none mb-2">
                        {step.title}
                      </h3>
                      <p className="font-fira font-normal text-darkblue/80 text-base sm:text-xl lg:text-[22px] leading-snug">
                        {step.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}