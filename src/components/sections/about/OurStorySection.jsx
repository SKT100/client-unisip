import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import PillTag from '../../ui/PillTag';
import SplitReveal from '../../ui/SplitReveal';

const images = '/images';

export default function OurStorySection() {
  const containerRef = useRef(null);

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
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 font-fira relative overflow-visible pb-12 sm:pb-20 lg:pb-36">
      
      {/* Header Section with SplitReveal */}
      <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
        <div className="mb-2 sm:mb-3">
          <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
            OUR STORY
          </PillTag>
        </div>

        <h2 className="m-0 flex flex-col items-center font-fira font-extrabold uppercase leading-[0.82] tracking-tight">
          <span className="text-[54px] sm:text-[90px] lg:text-[120px]">
            <SplitReveal
              delay={0.06}
              charStyle={{
                WebkitTextStroke: '2.5px var(--color-darkblue)',
                color: 'transparent',
              }}
            >
              WHY
            </SplitReveal>
          </span>
          <span className="text-darkblue text-[58px] sm:text-[98px] lg:text-[132px] -mt-1 sm:-mt-2">
            <SplitReveal delay={0.2}>
              UNISIP?
            </SplitReveal>
          </span>
        </h2>
      </div>

      {/* Main Timeline Container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto min-h-[600px]">

        {/* Timeline Spine */}
        <div 
          className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2.5px] bg-darkblue/15 -translate-x-1/2 z-0" 
          aria-hidden="true" 
        />

        {/* Rapid 1:1 Descending Line */}
        <motion.div 
          style={{ scaleY: scrollYProgress }}
          className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2.5px] bg-darkblue -translate-x-1/2 origin-top z-10" 
          aria-hidden="true" 
        />

        {/* Top Right Decorative Image */}
        <div className="hidden lg:block absolute right-[-8%] xl:right-[-12%] top-[-10%] z-0 pointer-events-none select-none">
          <img
            src={`${images}/bottle-caps-about.webp`}
            alt=""
            loading="lazy"
            decoding="async"
            width="420"
            height="320"
            className="w-[340px] lg:w-[420px] xl:w-[480px] h-auto object-contain"
          />
        </div>

        {/* Bottom Left Decorative Image */}
        <div className="hidden lg:block absolute left-[-10%] xl:left-[-14%] bottom-[-8%] xl:bottom-[-10%] z-0 pointer-events-none select-none">
          <img
            src={`${images}/toppled-bottles-about.webp`}
            alt=""
            loading="lazy"
            decoding="async"
            width="460"
            height="340"
            className="w-[380px] lg:w-[460px] xl:w-[520px] h-auto object-contain"
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
                <div
                  className={`${
                    isLeft
                      ? 'block pl-12 md:pl-0 md:pr-12 text-left md:text-right'
                      : 'hidden md:block'
                  }`}
                >
                  {isLeft && (
                    <div className="max-w-md md:ml-auto">
                      <h3 className="heading-category text-darkblue mb-1 sm:mb-2">
                        {step.title}
                      </h3>
                      <p className="text-general font-normal text-darkblue/80 leading-snug m-0">
                        {step.text}
                      </p>
                    </div>
                  )}
                </div>

                <div 
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-darkblue border-4 border-cream z-30 shadow-sm"
                  aria-hidden="true" 
                />

                <div
                  className={`${
                    !isLeft
                      ? 'block pl-12 md:pl-12 text-left'
                      : 'hidden md:block'
                  }`}
                >
                  {!isLeft && (
                    <div className="max-w-md">
                      <h3 className="heading-category text-darkblue mb-1 sm:mb-2">
                        {step.title}
                      </h3>
                      <p className="text-general font-normal text-darkblue/80 leading-snug m-0">
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