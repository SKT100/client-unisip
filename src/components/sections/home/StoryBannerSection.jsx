import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitReveal from '../../ui/SplitReveal';
import AngledBadgeReveal from '../../ui/AngledBadgeReveal';

const images = '/images';

export default function StoryBannerSection({
  titleTop = 'EVERY BOTTLE TELLS',
  badgeText = 'YOUR STORY.',
  subtitle = 'OF BRAND, IDENTITY & EXPERIENCE.',
  bannerImage = `${images}/home-bottle-water-drop.webp`,
  className = '',
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const floatY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section ref={containerRef} className={`w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 font-fira relative overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-center">
        
        {/* Left Column: Typography Stack */}
        <div className="lg:col-span-6 flex flex-col items-start text-left relative lg:pl-4">
          <h2 className="heading-display text-darkblue m-0 leading-[0.82] relative z-0">
            <span className="block">
              <SplitReveal delay={0.06}>
                {titleTop}
              </SplitReveal>
            </span>
          </h2>

          {/* Static-Position Angled Stamp Pop */}
          <AngledBadgeReveal
            trigger="inView"
            targetRotate={-2.5}
            delay={0.22}
            className="-mt-2 sm:-mt-4 lg:-mt-6 z-10"
          >
            <div className="bg-[#39b8f2] text-cream heading-big px-4 sm:px-6 py-1.5 sm:py-2 whitespace-nowrap shadow-md select-none">
              <span className="relative z-10">{badgeText}</span>
            </div>
          </AngledBadgeReveal>

          <p className="heading-mid text-darkblue m-0 mt-3 sm:mt-5 lg:mt-6 opacity-95 relative z-0">
            {subtitle}
          </p>
        </div>

        {/* Right Column: Floating Visual */}
        <div className="lg:col-span-6 flex justify-center lg:justify-start items-center relative z-0">
          <motion.div
            style={{ y: floatY }}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] flex items-center justify-center pointer-events-none select-none"
          >
            <img
              src={bannerImage}
              alt="UniSip Bottle Water Drop Visual"
              loading="lazy"
              decoding="async"
              width="440"
              height="580"
              className="w-full h-auto object-contain drop-shadow-xl"
              onError={(e) => {
                e.currentTarget.src = `${images}/unisip-bottle-hero.webp`;
              }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}