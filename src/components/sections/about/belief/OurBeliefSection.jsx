import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import PillTag from '../../../ui/PillTag';
import BeliefCard from './BeliefCard';

const images = '/images';

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
        ease: [0.16, 1, 0.3, 1],
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
      rotate: '-rotate-[4deg]',
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
      rotate: '-rotate-[4deg]',
    },
  ];

  const stats = [
    { number: '100+', label: 'CUSTOM LABELS' },
    { number: '4', label: 'BOTTLE FORMATS' },
    { number: '3', label: 'BOTTLE MATERIALS' },
    { number: '4', label: 'WATER TYPES' },
  ];

  return (
    <section className="w-full mx-auto font-fira relative">
      <div className="w-full bg-darkblue text-cream rounded-[32px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] xl:rounded-[130px] p-6 sm:p-10 lg:p-16 xl:p-20 relative overflow-hidden shadow-2xl">
        
        {/* Subtle Water Texture Overlay */}
        <img
          src={`${images}/logo/water-texture.svg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none select-none z-0"
        />

        {/* ========================================================================
            1. TOP SECTION: OUR BELIEF & 3 PILLAR CARDS
            ======================================================================== */}
        <div className="flex flex-col items-center text-center relative z-10">
          
          <div className="mb-3 sm:mb-4">
            <PillTag variant="cyan" size="md" rotate="-rotate-[3deg]">
              OUR BELIEF
            </PillTag>
          </div>

          <h2 className="m-0 heading-display text-center leading-[0.85]">
            <span className="block text-cream">
              MORE THAN A BOTTLE.
            </span>
            <span className="block text-cyanglow -mt-1 sm:-mt-3">
              IT'S PART OF YOUR BRAND.
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-general font-normal text-cream/80 leading-snug tracking-tight m-0">
            Every bottle has a job beyond holding water. It represents the business behind it,
            its identity, its attention to detail and the experience it wants people to remember.
          </p>

          {/* 3 Pillar Cards Grid (Tighter mobile gaps) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-8 xl:gap-10 mt-10 sm:mt-16 lg:mt-20 text-left"
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
        <div className="w-full my-10 sm:my-14 lg:my-18 relative z-10">
          <svg
            className="w-full h-1 text-cream/20"
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
            2. BOTTOM SECTION: FROM BRAND TO BOTTLE
            ======================================================================== */}
        <div className="flex flex-col items-center text-center relative z-10">
          
          <h2 className="heading-display text-center leading-[0.83] m-0">
            <span className="text-cream block">FROM BRAND</span>
            <span className="text-cream">TO </span>
            <span className="text-cyanglow">BOTTLE.</span>
          </h2>

          <div className="mt-8 sm:mt-12 w-full max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-end">
            
            {/* Stats Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="order-1 lg:order-2 lg:col-span-5 grid grid-cols-2 lg:flex lg:flex-col items-center text-center justify-center gap-6 sm:gap-8 lg:gap-12 w-full pb-2 lg:pb-16"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center w-full select-none"
                >
                  <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                    <img
                      src={`${images}/logo/cone-bottle-outline-logo.svg`}
                      alt=""
                      aria-hidden="true"
                      className="w-5 h-5 sm:w-8 sm:h-8 lg:w-11 lg:h-11 object-contain shrink-0 -rotate-12 opacity-95"
                    />
                    <span className="heading-display font-black text-cream leading-none tracking-tight">
                      <CounterNumber rawValue={stat.number} />
                    </span>
                  </div>

                  <span className="heading-mid text-cyanglow tracking-tight uppercase leading-[0.88] mt-1 sm:mt-1.5 text-center">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottle Image */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex justify-center lg:justify-start items-end -mb-6 sm:-mb-10 lg:-mb-16 xl:-mb-20 -ml-0 lg:-ml-8 pointer-events-none select-none w-full overflow-hidden">
              <motion.img
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={`${images}/about-belief-img.webp`}
                alt="UniSip custom crafted bottle details"
                loading="lazy"
                decoding="async"
                className="w-full max-w-[320px] sm:max-w-[460px] lg:max-w-[800px] xl:max-w-[920px] h-auto object-contain block"
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