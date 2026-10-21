import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import PillTag from '../../../ui/PillTag';
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

  // Real-time Motion Value tracking carousel position
  const x = useMotionValue(0);

  // Directly bind carousel drag position (x) to thumb translation percentage
  // Track = 100%, Thumb = 35%, Max travel offset = 65% of track (185.714% of thumb width)
  const thumbX = useTransform(
    x,
    [dragBounds.left < 0 ? dragBounds.left : -1, 0],
    ['185.714%', '0%']
  );

  // Recalculate drag boundaries dynamically on window resize
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
      
      {/* ========================================================================
          1. SECTION HEADER STACK
          ======================================================================== */}
      <div className="flex flex-col items-start text-left mb-10 sm:mb-14">
        
        {tagText && (
          <div className="mb-3 sm:mb-4">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              {tagText}
            </PillTag>
          </div>
        )}

        <h2 className="m-0 font-fira font-extrabold uppercase tracking-tight leading-[0.82] text-darkblue text-[44px] sm:text-[76px] lg:text-[104px] xl:text-[128px]">
          {titleLine1 && <span className="block">{titleLine1}</span>}
          <span className="flex items-center gap-3 sm:gap-5 flex-wrap -mt-1 sm:-mt-3">
            {titleLine2Prefix && <span>{titleLine2Prefix}</span>}
            {titleLine2Outlined && (
              <span
                className="select-none"
                style={{
                  WebkitTextStroke: '3px #101A35',
                  color: 'transparent',
                }}
              >
                {titleLine2Outlined}
              </span>
            )}
          </span>
        </h2>

      </div>

      {/* ========================================================================
          2. DRAGGABLE CAROUSEL CANVAS (Framer Motion Drag)
          ======================================================================== */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none py-2"
      >
        <motion.div
          ref={dragWrapperRef}
          drag="x"
          dragConstraints={dragBounds}
          dragElastic={0.08}
          dragTransition={{ power: 0.2, timeConstant: 200 }}
          style={{ x }}
          className="flex flex-nowrap items-stretch w-max"
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

      {/* ========================================================================
          3. REAL-TIME SYNCHRONIZED PROGRESS SCROLLBAR TRACK
          ======================================================================== */}
      <div className="flex justify-center mt-8 sm:mt-12">
        <div className="w-40 sm:w-56 h-2 bg-[#93B5F6]/30 backdrop-blur-sm rounded-full relative overflow-hidden border border-darkblue/10">
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