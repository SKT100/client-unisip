import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import PillTag from '../../../ui/PillTag';
import SplitReveal from '../../../ui/SplitReveal';
import BottleTypeCard from './BottleTypeCard';

const images = '/images';

const DEFAULT_BOTTLE_TYPES = [
  {
    id: 'custom-bottles',
    title: 'CUSTOM\nBOTTLES',
    subtitle: 'Your brand, your bottle, your identity.',
    image: `${images}/brand-bottle-1.webp`,
  },
  {
    id: 'private-label',
    title: 'PRIVATE\nLABEL',
    subtitle: 'Create a hydration product designed around your business.',
    image: `${images}/brand-bottle-2.webp`,
  },
  {
    id: 'event-corporate',
    title: 'EVENT &\nCORPORATE',
    subtitle: 'Branded hydration for events, offices and campaigns.',
    image: `${images}/brand-bottle-3.webp`,
  },
  {
    id: 'retail-hospitality',
    title: 'RETAIL &\nHOSPITALITY',
    subtitle: 'Water that becomes part of the customer experience.',
    image: `${images}/brand-bottle-4.webp`,
  },
];

export default function BottleTypesCarousel({
  tagText = 'WORK',
  titleLine1 = 'BUILT AROUND',
  titleLine2Prefix = 'YOUR',
  titleLine2Outlined = 'BRAND',
  items = DEFAULT_BOTTLE_TYPES,
  className = '',
}) {
  const containerRef = useRef(null);
  const dragWrapperRef = useRef(null);
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0 });

  const x = useMotionValue(0);

  const thumbX = useTransform(
    x,
    [dragBounds.left < 0 ? dragBounds.left : -1, 0],
    ['185.714%', '0%']
  );

  useEffect(() => {
    const calculateBounds = () => {
      if (containerRef.current && dragWrapperRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const totalContentWidth = dragWrapperRef.current.scrollWidth;
        const maxDrag = Math.min(0, containerWidth - totalContentWidth);
        setDragBounds({ left: maxDrag, right: 0 });
      }
    };

    calculateBounds();
    window.addEventListener('resize', calculateBounds);
    return () => window.removeEventListener('resize', calculateBounds);
  }, [items]);

  return (
    <section className={`w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 font-fira relative overflow-hidden ${className}`}>
      
      {/* 1. Header Stack */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-12">
        <div className="flex flex-col items-start text-left">
          {tagText && (
            <div className="mb-2.5 sm:mb-4">
              <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
                {tagText}
              </PillTag>
            </div>
          )}

          <h2 className="m-0 heading-display text-darkblue leading-[0.82]">
            {titleLine1 && (
              <span className="block">
                <SplitReveal delay={0.06}>
                  {titleLine1}
                </SplitReveal>
              </span>
            )}
            <span className="flex items-center gap-3 sm:gap-5 flex-wrap -mt-1 sm:-mt-3">
              {titleLine2Prefix && (
                <SplitReveal delay={0.2}>
                  {titleLine2Prefix}
                </SplitReveal>
              )}
              {titleLine2Outlined && (
                <SplitReveal
                  delay={0.28}
                  charStyle={{
                    WebkitTextStroke: '3px var(--color-darkblue)',
                    color: 'transparent',
                  }}
                >
                  {titleLine2Outlined}
                </SplitReveal>
              )}
            </span>
          </h2>
        </div>

        {/* Minimal Glass Drag Indicator */}
        <div className="inline-flex items-center gap-2 self-start sm:self-end px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-darkblue/10 shadow-sm pointer-events-none select-none">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/75 backdrop-blur-md border border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] flex items-center justify-center text-darkblue">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h18" />
            </svg>
          </div>
          <span className="font-fira font-bold text-[10px] sm:text-[11px] tracking-widest text-darkblue/75 uppercase pr-1">
            DRAG TO EXPLORE
          </span>
        </div>
      </div>

      {/* 2. Draggable Track */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none py-2 touch-pan-y"
      >
        <motion.div
          ref={dragWrapperRef}
          drag="x"
          dragDirectionLock
          dragConstraints={dragBounds}
          dragElastic={0.08}
          dragTransition={{ power: 0.25, timeConstant: 220 }}
          style={{ x }}
          className="flex flex-nowrap items-stretch w-max touch-pan-y"
        >
          {items.map((card, idx) => (
            <BottleTypeCard
              key={card.id || idx}
              title={card.title}
              subtitle={card.subtitle}
              image={card.image}
              isLast={idx === items.length - 1}
            />
          ))}
        </motion.div>
      </div>

      {/* 3. Progress Track */}
      <div className="flex justify-center mt-6 sm:mt-10">
        <div className="w-36 sm:w-52 h-1.5 sm:h-2 bg-cyanglow/30 backdrop-blur-sm rounded-full relative overflow-hidden border border-darkblue/10">
          <motion.div
            className="h-full bg-darkblue rounded-full"
            style={{
              width: '35%',
              x: thumbX,
            }}
          />
        </div>
      </div>

    </section>
  );
}