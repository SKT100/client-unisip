import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import PillTag from '../../../ui/PillTag';
import BeliefCard from './BeliefCard';

const images = '/images';

/**
 * Smooth Animated Counter Component (0 -> Target)
 */
function CounterNumber({ rawValue }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  const numericTarget = parseInt(rawValue, 10) || 0;
  const hasPlus = rawValue.includes('+');

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericTarget, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1], // Smooth custom ease-out
        onUpdate(latest) {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericTarget]);

  return (
    <span ref={ref}>
      {displayValue}
      {hasPlus && '+'}
    </span>
  );
}

// Stagger animation variants for cards
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function OurBeliefSection() {
  const pillarCards = [
    {
      number: '01',
      badgeText: 'IDENTITY',
      heading: 'Your bottle should look like you.',
      description:
        'From colour and typography to labels and finishes, every detail starts with your brand.',
      rotate: '-rotate-[5deg]',
    },
    {
      number: '02',
      badgeText: 'EXPERIENCE',
      heading: 'Small details become brand moments.',
      description:
        'A bottle on a conference table, hotel room, or event table speaks volumes before the first sip.',
      rotate: 'rotate-[3deg]',
    },
    {
      number: '03',
      badgeText: 'QUALITY',
      heading: 'Designed to be seen. Made to be used.',
      description:
        'The final bottle should feel considered from the first glance to the last sip.',
      rotate: '-rotate-[6deg]',
    },
  ];

  // Stat Specifications
  const stats = [
    { number: '100+', label: 'CUSTOM LABELS' },
    { number: '4', label: 'BOTTLE FORMATS' },
    { number: '3', label: 'BOTTLE MATERIALS' },
    { number: '4', label: 'WATER TYPES' },
  ];

  return (
    <section className="mt-20 sm:mt-32 lg:mt-40 w-full mx-auto font-fira">
      
      {/* Royal Navy Container Wrapper */}
      <div className="w-full bg-midblue text-cream rounded-[32px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] xl:rounded-[130px] p-6 sm:p-10 lg:p-16 xl:p-20 relative overflow-hidden">
        
        {/* Subtle Water Texture Overlay */}
        <img
          src={`${images}/logo/water-texture.svg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none select-none"
        />

        {/* ========================================================================
            TOP SECTION: OUR BELIEF & 3 PILLAR CARDS
            ======================================================================== */}
        <div className="flex flex-col items-center text-center relative z-10">
          
          {/* Top PillTag Component */}
          <div className="mb-3 sm:mb-4">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              OUR BELIEF
            </PillTag>
          </div>

          {/* Main Headline Stack */}
          <h2 className="m-0 flex flex-col gap-1 sm:gap-2 items-center font-fira font-extrabold uppercase tracking-tight">
            <span className="heading-display text-cream">
              MORE THAN A BOTTLE.
            </span>
            <span className="heading-display text-darkblue -mt-1 sm:-mt-3">
              IT'S PART OF YOUR BRAND.
            </span>
          </h2>

          {/* Subtitle Paragraph */}
          <p className="mt-4 sm:mt-6 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-general font-normal text-cream/90 leading-snug tracking-tight">
            Every bottle has a job beyond holding water. It represents the business behind it,
            its identity, its attention to detail and the experience it wants people to remember.
          </p>

          {/* 3 Pillar Cards Grid - Clean lg: Breakpoint to Prevent Squishing */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="w-full grid grid-cols-1 lg:grid-cols-3 gap-14 sm:gap-16 lg:gap-8 xl:gap-10 mt-16 sm:mt-24 lg:mt-28 text-left"
          >
            {pillarCards.map((card) => (
              <motion.div key={card.number} variants={itemVariants} className="min-w-0">
                <BeliefCard
                  number={card.number}
                  badgeText={card.badgeText}
                  heading={card.heading}
                  description={card.description}
                  badgeRotate={card.rotate}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Dashed Separator Line */}
        <div className="w-full my-12 sm:my-16 lg:my-20 relative z-10">
          <svg
            className="w-full h-1 text-white/30"
            viewBox="0 0 1200 4"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="2"
              x2="1200"
              y2="2"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>
        </div>

        {/* ========================================================================
            BOTTOM SECTION: FROM BRAND TO BOTTLE
            ======================================================================== */}
        <div className="flex flex-col items-center text-center relative z-10">
          
          {/* Main Section Headline */}
          <h2 className="heading-display font-fira font-extrabold uppercase tracking-tight m-0">
            <span className="text-cream block">FROM BRAND</span>
            <span className="text-cream">TO </span>
            <span className="text-darkblue">BOTTLE.</span>
          </h2>

          {/* Grid Layout: Stats Top (2x2 Grid) on Mobile, Side-by-Side on Desktop */}
          <div className="mt-8 sm:mt-12 w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-end">
            
            {/* 1. Stats Section with Animated Counters (No Bouncy Hover) */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="order-1 lg:order-2 lg:col-span-5 grid grid-cols-2 lg:flex lg:flex-col items-center text-center justify-center gap-6 sm:gap-8 lg:gap-12 w-full pb-4 lg:pb-20"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center w-full select-none"
                >
                  {/* Single Unit: Icon + Counter Number */}
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                    <img
                      src={`${images}/logo/cone-bottle-outline-logo.svg`}
                      alt=""
                      aria-hidden="true"
                      className="w-6 h-6 sm:w-10 sm:h-10 lg:w-13 lg:h-13 object-contain shrink-0 -rotate-12 opacity-95"
                    />
                    <span className="heading-display font-black text-cream leading-none tracking-tight">
                      <CounterNumber rawValue={stat.number} />
                    </span>
                  </div>

                  {/* Centered Label */}
                  <span className="heading-semi-big font-black text-darkblue tracking-tight uppercase leading-[0.88] mt-1 sm:mt-1.5 text-center">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* 2. Bottle Image (Slides Up from Below on Scroll) */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex justify-center lg:justify-start items-end -mb-6 sm:-mb-10 lg:-mb-16 xl:-mb-20 -ml-0 lg:-ml-8 pointer-events-none select-none w-full overflow-hidden">
              <motion.img
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={`${images}/about-belief-img.webp`}
                alt="UniSip custom crafted bottle details"
                className="w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[840px] xl:max-w-[960px] h-auto object-contain shadow-none filter-none block"
                onError={(e) => {
                  e.currentTarget.src = '/about-bg-bottle.webp';
                }}
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}