import React, { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import SelectedWorkItem from './SelectedWorkItem';
import SplitReveal from '../../../ui/SplitReveal';

const images = '/images';

// 1. Ashish Solanki (Top)
// 2. Boat
// 3. Chirag Panjwani (Creator Edition / Stand-up Tour)
// 4. Xavrang'25 (The only video)
const DEFAULT_PROJECTS = [
  {
    id: 'ashish-solanki',
    title: 'Ashish Solanki trusts Unisip',
    subtitle: 'Exclusive backstage comedy tour bottles designed for live show audiences and VIP artist lounges.',
    category: 'CREATOR EDITION',
    mediaSrc: `${images}/ashish_solanki.webp`,
    mediaType: 'image',
  },
  {
    id: 'boat',
    title: 'UNISIP x Boat',
    subtitle: 'Limited edition high-impact matte black bottles crafted for nationwide product launch kits and influencer gifting.',
    category: 'CO-BRANDED DROP',
    mediaSrc: `${images}/boat.webp`,
    mediaType: 'image',
  },
  {
    id: 'chirag-panjwani',
    title: 'UniSip x Chirag Panjwani',
    subtitle: 'Custom tour hydration crafted for live stand-up specials, fan meetups, and backstage artist hospitality.',
    category: 'CREATOR EDITION',
    mediaSrc: `${images}/unisip-chirag.webp`,
    mediaType: 'image',
  },
  {
    id: 'xavrang',
    title: "AQUA PARTNER AT XAVRANG'25",
    subtitle: 'Custom branded bottles for thousands of college fest attendees, VIP lounges, and live stage artists.',
    category: 'FESTIVAL PARTNERSHIP',
    mediaSrc: 'https://youtu.be/2btSDWyi5oQ?si=16l4cRxqWUyjTLPs',
    mediaType: 'youtube', // The only video
  },
];

export default function SelectedWorksSection({
  titleOutlined = 'SELECTED',
  titleSolid = 'WORKS',
  subtitle = "A look at a few brands, moments, and projects we've helped bring to life.",
  projects = DEFAULT_PROJECTS,
  className = '',
}) {
  const containerRef = useRef(null);

  // Global scroll through the pinned stage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamic progress line tracking on the left column
  const trackHeight = useTransform(scrollYProgress, [0, 1], ['25%', '100%']);

  return (
    <section
      ref={containerRef}
      className={`relative w-full font-fira h-[380vh] ${className}`}
    >
      {/* Viewport Stays Pinned While User Scrolls Through Projects */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto overflow-hidden">
        
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ====================================================================
              LEFT COLUMN (PINNED HEADLINE & EDITORIAL CONTEXT ON DESKTOP)
              ==================================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left z-20 shrink-0">
            <h2 className="m-0 font-fira font-extrabold uppercase tracking-tight leading-[0.83] text-center lg:text-left">
              {titleOutlined && (
                <span className="block text-[44px] sm:text-[68px] lg:text-[84px] xl:text-[96px]">
                  <SplitReveal
                    delay={0.06}
                    charStyle={{
                      WebkitTextStroke: '2.5px var(--color-darkblue)',
                      color: 'transparent',
                    }}
                  >
                    {titleOutlined}
                  </SplitReveal>
                </span>
              )}

              {titleSolid && (
                <span className="block text-darkblue text-[44px] sm:text-[68px] lg:text-[84px] xl:text-[96px] -mt-1 sm:-mt-2">
                  <SplitReveal delay={0.22}>
                    {titleSolid}
                  </SplitReveal>
                </span>
              )}
            </h2>

            {subtitle && (
              <p className="mt-3 sm:mt-5 font-fira font-normal text-darkblue/80 text-xs sm:text-base lg:text-lg leading-snug tracking-tight m-0 max-w-sm">
                {subtitle}
              </p>
            )}

            {/* Architectural Progress Track (Desktop Only) */}
            <div className="hidden lg:flex items-center gap-3 mt-10">
              <div className="w-28 h-1 bg-darkblue/15 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: trackHeight }}
                  className="h-full bg-darkblue rounded-full"
                />
              </div>
              <span className="text-[11px] font-extrabold text-darkblue/50 uppercase tracking-widest">
                SCROLL TO NAVIGATE
              </span>
            </div>
          </div>

          {/* ====================================================================
              RIGHT COLUMN (ELABORATE DISPLAY STAGE: ONE FADES & ANOTHER APPEARS)
              ==================================================================== */}
          <div className="lg:col-span-7 relative w-full h-[380px] xs:h-[420px] sm:h-[480px] lg:h-[560px] flex items-center z-10">
            {projects.map((project, idx) => (
              <SelectedWorkItem
                key={project.id || idx}
                title={project.title}
                subtitle={project.subtitle}
                category={project.category}
                mediaSrc={project.mediaSrc}
                mediaType={project.mediaType}
                index={idx}
                progress={scrollYProgress}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}