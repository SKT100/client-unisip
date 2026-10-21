import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ChooseBottleCard from './ChooseBottleCard';

const images = '/images';

const DEFAULT_BOTTLES = [
  { id: 'glacier', title: 'Unisip Glacier', volume: '250ml / 500ml', image: `${images}/unisip-glacier.webp`, rotate: '-rotate-3' },
  { id: 'evolve',  title: 'Unisip Evolve',  volume: '500 ml',       image: `${images}/unisip-evolve.webp`,    rotate: 'rotate-2' },
  { id: 'cascade', title: 'Unisip Cascade', volume: '1L',           image: `${images}/unisip-cascade.webp`,  rotate: '-rotate-2' },
  { id: 'dehaexa', title: 'Unisip Dehaexa', volume: '1L',           image: `${images}/unisip-dehexa.webp`,   rotate: 'rotate-3' },
  { id: 'decone',  title: 'Unisip Decone',  volume: '1L',           image: `${images}/unisip-decone.webp`, rotate: '-rotate-1' },
  { id: 'onyx',    title: 'Unisip Onyx',    volume: '750 ml',       image: `${images}/unisip-onyx.webp`,    rotate: 'rotate-2' },
  { id: 'nira',    title: 'Unisip Nira',    volume: '750 ml',       image: `${images}/unisip-nira.webp`,  rotate: '-rotate-2' },
];

/**
 * Endless marquee for any number of items.
 * - Repeats the set enough times to cover the container (group >= container width)
 * - Renders 2 identical groups and moves exactly one group width -> seamless loop
 * - speed = pixels per second, so every row moves at the same pace
 */
function Marquee({ items, renderItem, reverse = false, speed = 60 }) {
  const wrapRef = useRef(null);
  const groupRef = useRef(null);
  const [repeats, setRepeats] = useState(1);
  const [groupWidth, setGroupWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!wrapRef.current || !groupRef.current) return;
      const setWidth = groupRef.current.scrollWidth / repeats; // width of ONE set
      if (!setWidth) return;
      const needed = Math.max(1, Math.ceil(wrapRef.current.offsetWidth / setWidth));
      setRepeats(needed);
      setGroupWidth(setWidth * needed);
    };

    measure();
    const ro = new ResizeObserver(measure); // re-runs on resize and when images load
    ro.observe(wrapRef.current);
    ro.observe(groupRef.current);
    return () => ro.disconnect();
  }, [repeats, items]);

  const group = Array.from({ length: repeats }).flatMap((_, r) =>
    items.map((item, i) => (
      // spacing is INSIDE each item, so both groups are exactly the same width
      <div key={`${r}-${item.id}-${i}`} className="shrink-0 pr-6 sm:pr-8">
        {renderItem(item)}
      </div>
    ))
  );

  const duration = groupWidth ? groupWidth / speed : 40;

  return (
    <div ref={wrapRef} className="w-full overflow-hidden py-4 select-none">
      <motion.div
        key={Math.round(groupWidth)}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="flex w-max"
      >
        <div ref={groupRef} className="flex shrink-0">{group}</div>
        <div className="flex shrink-0" aria-hidden="true">{group}</div>
      </motion.div>
    </div>
  );
}

export default function ChooseBottleSection({
  titleOutlined = 'CHOOSE YOUR',
  titleSolid = 'BOTTLE.',
  subtitle = 'Different shapes # Different materials # One bottle for your brand.',
  bottles = DEFAULT_BOTTLES,
  className = '',
}) {
  const renderCard = (item) => (
    <ChooseBottleCard
      title={item.title}
      volume={item.volume}
      image={item.image}
      rotate={item.rotate}
    />
  );

  return (
    <section className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] font-fira overflow-hidden bg-cream ${className}`}>

      {/* Top row: scrolls left */}
      <Marquee items={bottles} renderItem={renderCard} speed={60} />

      {/* Headline */}
      <div className="flex flex-col items-center text-center my-8 sm:my-12 lg:my-16 px-4 z-10 relative max-w-[1400px] mx-auto">
        <h2 className="m-0 font-fira font-extrabold uppercase tracking-tight leading-[0.83] text-center">
          {titleOutlined && (
            <span
              className="block text-[44px] sm:text-[76px] lg:text-[104px] xl:text-[120px] select-none"
              style={{ WebkitTextStroke: '2.5px #101A35', color: 'transparent' }}
            >
              {titleOutlined}
            </span>
          )}
          {titleSolid && (
            <span className="block text-darkblue text-[44px] sm:text-[76px] lg:text-[104px] xl:text-[120px] -mt-1 sm:-mt-3">
              {titleSolid}
            </span>
          )}
        </h2>

        {subtitle && (
          <p className="mt-4 sm:mt-6 font-fira font-bold text-darkblue/90 text-sm sm:text-lg lg:text-xl leading-snug tracking-tight m-0 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom row: scrolls right */}
      <Marquee items={bottles} renderItem={renderCard} reverse speed={60} />

    </section>
  );
}