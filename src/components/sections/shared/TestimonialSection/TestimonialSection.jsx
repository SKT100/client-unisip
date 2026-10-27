import React, { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplitReveal from '../../../ui/SplitReveal';
import TestimonialCard from './TestimonialCard';

const images = '/images';

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'MONOJIT',
    role: 'GM · Rumors Bar',
    quote: '"Elevated our bar experience instantly with bespoke hydration."',
    image: `${images}/rumors.webp`,
    avatar: `${images}/monojit.webp`,
    rating: 5,
    initialX: -45,
    initialY: 20,
    initialRotate: -8,
    bgColor: 'bg-[#669eff]',
    textColor: 'text-[#101a35]',
    starColor: 'text-[#f5f4ef]',
    authorBgColor: 'bg-[#f5f4ef]',
    authorTextColor: 'text-[#101a35]',
  },
  {
    id: 2,
    name: 'ASHFAQ',
    role: 'GM · Myx & Hammer',
    quote: '"Clean design, premium build, and incredible brand recall."',
    image: `${images}/hammer.webp`,
    avatar: `${images}/asfaq.webp`,
    rating: 5,
    initialX: 45,
    initialY: -20,
    initialRotate: 7,
    bgColor: 'bg-[#39b8f2]',
    textColor: 'text-[#101a35]',
    starColor: 'text-[#2d468a]',
    authorBgColor: 'bg-[#101a35]',
    authorTextColor: 'text-[#f5f4ef]',
  },
  {
    id: 3,
    name: 'SUMAN',
    role: 'GM · Xrong Place & Wilson Hotel',
    quote: '"Our guests love the custom bottle details and high-end feel."',
    image: `${images}/wilson.webp`,
    avatar: `${images}/suman.webp`,
    rating: 5,
    initialX: -16,
    initialY: -10,
    initialRotate: -3,
    bgColor: 'bg-[#f5f4ef]',
    textColor: 'text-[#101a35]',
    starColor: 'text-[#2d468a]',
    authorBgColor: 'bg-[#101a35]',
    authorTextColor: 'text-[#f5f4ef]',
  },
  {
    id: 4,
    name: 'SHRUTI',
    role: 'Owner · Pipal Tree Hotel',
    quote: '"Seamless execution and unmatched presentation for our property."',
    image: `${images}/pipal.webp`,
    avatar: `${images}/shruti.webp`,
    rating: 5,
    initialX: 18,
    initialY: 14,
    initialRotate: 4,
    bgColor: 'bg-[#2d468a]',
    textColor: 'text-[#f5f4ef]',
    starColor: 'text-[#39b8f2]',
    authorBgColor: 'bg-[#f5f4ef]',
    authorTextColor: 'text-[#101a35]',
  },
];

export default function TestimonialSection({
  tagText = 'Testimonials',
  titleLine1 = 'BRANDS TALK.',
  titleLine2 = 'WE LISTEN.',
  subtitle = "From first concept to the finished bottle, here's what our partners say about bringing their brand to life.",
  footerText = 'BUILT FOR BRANDS THAT WANT TO BE REMEMBERED.',
  testimonials = DEFAULT_TESTIMONIALS,
  className = '',
}) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  const [zOrder, setZOrder] = useState(() =>
    testimonials.reduce((acc, t, idx) => ({ ...acc, [t.id]: idx + 10 }), {})
  );

  useEffect(() => {
    let ticking = false;
    const checkViewport = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsMobile(window.innerWidth < 768);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const bringToFront = useCallback((id) => {
    setZOrder((prev) => {
      const highestZ = Math.max(...Object.values(prev), 10);
      return { ...prev, [id]: highestZ + 1 };
    });
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  return (
    <section className={`w-full max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8 font-fira relative ${className}`}>
      <div
        ref={containerRef}
        className="w-full bg-[#101a35] text-[#f5f4ef] rounded-[28px] sm:rounded-[60px] md:rounded-[90px] lg:rounded-[130px] p-4 sm:p-10 lg:p-16 overflow-hidden relative shadow-2xl flex flex-col items-center justify-between min-h-[660px] xs:min-h-[700px] sm:min-h-[740px] lg:min-h-[1050px]"
      >
        {/* Ambient Subtle Texture */}
        <img
          src={`${images}/logo/water-texture.svg`}
          alt=""
          aria-hidden="true"
          width="1200"
          height="800"
          className="absolute inset-0 w-full h-full object-cover opacity-8 pointer-events-none select-none z-0"
        />

        {/* 1. HEADER */}
        <div className="flex flex-col items-center text-center z-10 relative mb-3 sm:mb-8 pt-1 sm:pt-0">
          {tagText && (
            <div className="mb-2 sm:mb-3 -rotate-[3deg]">
              <span className="inline-block bg-[#f5f4ef] text-[#101a35] font-fira font-extrabold text-xs sm:text-base uppercase tracking-tight px-3.5 py-1 sm:px-5 sm:py-1.5 rounded-full shadow-md">
                {tagText}
              </span>
            </div>
          )}

          <h2 className="m-0 font-fira font-extrabold uppercase tracking-tight leading-[0.83] text-center">
            <span className="block text-[#f5f4ef] text-[34px] xs:text-[38px] sm:text-[68px] lg:text-[96px] xl:text-[112px]">
              <SplitReveal delay={0.05}>{titleLine1}</SplitReveal>
            </span>
            <span className="block text-[#39b8f2] text-[34px] xs:text-[38px] sm:text-[68px] lg:text-[96px] xl:text-[112px] -mt-1 sm:-mt-2">
              <SplitReveal delay={0.16}>{titleLine2}</SplitReveal>
            </span>
          </h2>

          <p className="mt-2 sm:mt-4 max-w-xs sm:max-w-md lg:max-w-lg font-fira font-normal text-[#f5f4ef]/80 text-xs sm:text-sm lg:text-base leading-snug tracking-tight m-0">
            {subtitle}
          </p>

          <div className="hidden md:inline-flex items-center gap-2 mt-5 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-[#f5f4ef]/70 font-fira text-xs font-bold tracking-widest uppercase select-none pointer-events-none">
            <svg className="w-3.5 h-3.5 text-[#39b8f2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            <span>DRAG CARDS TO EXPLORE</span>
          </div>
        </div>

        {/* 2. CARD DISPLAY STAGE */}
        {isMobile ? (
          <div className="relative w-full max-w-[340px] min-h-[380px] xs:min-h-[410px] flex items-center justify-center z-20 my-auto py-2">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={testimonials[activeIndex].id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) handleNext();
                  if (info.offset.x > 40) handlePrev();
                }}
                className="w-full flex justify-center touch-pan-y will-change-transform"
              >
                <TestimonialCard
                  id={testimonials[activeIndex].id}
                  quote={testimonials[activeIndex].quote}
                  name={testimonials[activeIndex].name}
                  role={testimonials[activeIndex].role}
                  avatar={testimonials[activeIndex].avatar}
                  image={testimonials[activeIndex].image}
                  rating={testimonials[activeIndex].rating}
                  isDraggable={false}
                  bgColor={testimonials[activeIndex].bgColor}
                  textColor={testimonials[activeIndex].textColor}
                  starColor={testimonials[activeIndex].starColor}
                  authorBgColor={testimonials[activeIndex].authorBgColor}
                  authorTextColor={testimonials[activeIndex].authorTextColor}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="relative w-full max-w-3xl h-[620px] flex items-center justify-center z-20 my-auto">
            {testimonials.map((item) => (
              <TestimonialCard
                key={item.id}
                id={item.id}
                quote={item.quote}
                name={item.name}
                role={item.role}
                avatar={item.avatar}
                image={item.image}
                rating={item.rating}
                initialX={item.initialX}
                initialY={item.initialY}
                initialRotate={item.initialRotate}
                dragConstraintsRef={containerRef}
                zIndex={zOrder[item.id] || 10}
                isDraggable={true}
                onBringToFront={() => bringToFront(item.id)}
                bgColor={item.bgColor}
                textColor={item.textColor}
                starColor={item.starColor}
                authorBgColor={item.authorBgColor}
                authorTextColor={item.authorTextColor}
              />
            ))}
          </div>
        )}

        {/* 3. MOBILE PAGINATION & BUTTON CONTROLS */}
        <div className="flex md:hidden items-center justify-center gap-3 z-30 my-2.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full bg-white/10 active:bg-white/25 text-white flex items-center justify-center text-sm font-bold transition-colors cursor-pointer select-none"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  activeIndex === i ? 'w-6 bg-[#39b8f2]' : 'w-2.5 bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full bg-white/10 active:bg-white/25 text-white flex items-center justify-center text-sm font-bold transition-colors cursor-pointer select-none"
          >
            →
          </button>
        </div>

        {/* 4. FOOTER STATEMENT */}
        <div className="z-10 relative mt-2 sm:mt-6 text-center pb-1 sm:pb-0">
          <p className="font-fira font-extrabold text-[#f5f4ef] text-xs sm:text-base leading-none tracking-wider uppercase m-0 opacity-80">
            {footerText}
          </p>
        </div>
      </div>
    </section>
  );
}