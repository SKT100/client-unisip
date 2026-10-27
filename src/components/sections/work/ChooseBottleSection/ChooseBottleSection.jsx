import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import ChooseBottleCard from './ChooseBottleCard';

const images = '/images';

const DEFAULT_BOTTLES = [
  { id: 'glacier', title: 'Unisip Glacier', volume: '250ml / 500ml', image: `${images}/unisip-glacier.webp`, rotate: '-rotate-3' },
  { id: 'evolve',  title: 'Unisip Evolve',  volume: '500 ml',       image: `${images}/unisip-evolve.webp`,    rotate: 'rotate-2' },
  { id: 'cascade', title: 'Unisip Cascade', volume: '1L',           image: `${images}/unisip-cascade.webp`,  rotate: '-rotate-2' },
  { id: 'dehaexa', title: 'Unisip Dehaexa', volume: '1L',           image: `${images}/unisip-dehexa.webp`,   rotate: 'rotate-3' },
  { id: 'decone',  title: 'Unisip Decone',  volume: '1L',           image: `${images}/unisip-decone.webp`,   rotate: '-rotate-1' },
  { id: 'onyx',    title: 'Unisip Onyx',    volume: '750 ml',       image: `${images}/unisip-onyx.webp`,    rotate: 'rotate-2' },
  { id: 'nira',    title: 'Unisip Nira',    volume: '750 ml',       image: `${images}/unisip-nira.webp`,    rotate: '-rotate-2' },
];

/**
 * Interactive Infinite Marquee:
 * - Auto-scrolls smoothly at 50px/sec
 * - Pauses on hover so bottles stay steady under the cursor
 * - Draggable with mouse or touch (pointer capture)
 * - Trackpad horizontal scroll scrub enabled
 * - Seamless bidirectional infinite wrap
 */
function Marquee({ items, renderItem, reverse = false, speed = 45 }) {
  const wrapRef = useRef(null);
  const groupRef = useRef(null);
  const [repeats, setRepeats] = useState(1);
  const [groupWidth, setGroupWidth] = useState(0);

  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);

  const x = useMotionValue(0);

  // Measure group width to configure seamless infinite wrap points
  useLayoutEffect(() => {
    const measure = () => {
      if (!wrapRef.current || !groupRef.current) return;
      const setWidth = groupRef.current.scrollWidth / repeats;
      if (!setWidth) return;
      const needed = Math.max(1, Math.ceil(wrapRef.current.offsetWidth / setWidth));
      setRepeats(needed);
      const totalWidth = setWidth * needed;
      setGroupWidth(totalWidth);
      
      // Initialize view in the center set (Set B)
      if (x.get() === 0 && totalWidth > 0) {
        x.set(-totalWidth);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapRef.current);
    ro.observe(groupRef.current);
    return () => ro.disconnect();
  }, [repeats, items]);

  // Infinite wrapping math: maintains x in range [-2 * groupWidth, -groupWidth]
  const wrapX = (val) => {
    if (!groupWidth) return val;
    let current = val;
    while (current <= -groupWidth * 2) current += groupWidth;
    while (current > -groupWidth) current -= groupWidth;
    return current;
  };

  // Continuous auto-scroll (active only when not hovered or dragged)
  useAnimationFrame((time, delta) => {
    if (!groupWidth || isHovered || isDragging.current) return;
    const moveBy = (speed * (delta / 1000)) * (reverse ? 1 : -1);
    x.set(wrapX(x.get() + moveBy));
  });

  // Pointer drag events (mouse & touch)
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartVal.current = x.get();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    x.set(wrapX(dragStartVal.current + deltaX));
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  // Horizontal trackpad and Shift+wheel scrubbing
  const handleWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (delta !== 0) {
      x.set(wrapX(x.get() - delta));
    }
  };

  const group = Array.from({ length: repeats }).flatMap((_, r) =>
    items.map((item, i) => (
      <div key={`${r}-${item.id}-${i}`} className="shrink-0 pr-6 sm:pr-8">
        {renderItem(item)}
      </div>
    ))
  );

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      className="w-full overflow-hidden py-8 sm:py-10 lg:py-12 select-none cursor-grab active:cursor-grabbing touch-pan-y"
    >
      <motion.div
        style={{ x }}
        className="flex w-max will-change-transform"
      >
        {/* 3 identical sets ensure infinite scroll and drag in both directions */}
        <div ref={groupRef} className="flex shrink-0">{group}</div>
        <div className="flex shrink-0" aria-hidden="true">{group}</div>
        <div className="flex shrink-0" aria-hidden="true">{group}</div>
      </motion.div>
    </div>
  );
}

export default function ChooseBottleSection({
  titleOutlined = 'CHOOSE YOUR',
  titleSolid = 'BOTTLE.',
  subtitle = 'Different shapes · Different materials · One bottle for your brand.',
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
    <section className={`w-full overflow-hidden bg-cream py-4 sm:py-6 font-fira relative ${className}`}>

      {/* Top Carousel: scrolls left, draggable */}
      <Marquee items={bottles} renderItem={renderCard} speed={45} />

      {/* Central Headline */}
      <div className="flex flex-col items-center text-center my-4 sm:my-6 lg:my-8 px-4 z-10 relative max-w-[1400px] mx-auto">
        <h2 className="m-0 font-fira font-extrabold uppercase tracking-tight leading-[0.83] text-center">
          {titleOutlined && (
            <span
              className="block text-[44px] sm:text-[76px] lg:text-[104px] xl:text-[120px] select-none"
              style={{ WebkitTextStroke: '2.5px var(--color-darkblue)', color: 'transparent' }}
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
          <p className="mt-3 sm:mt-5 font-fira font-bold text-darkblue/90 text-sm sm:text-lg lg:text-xl leading-snug tracking-tight m-0 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom Carousel: scrolls right, draggable */}
      <Marquee items={bottles} renderItem={renderCard} reverse speed={45} />

    </section>
  );
}