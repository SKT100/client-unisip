import React, { useRef } from 'react';
import TestimonialCard from './TestimonialCard';

const images = '/images';

// Minimal Testimonials Data featuring Hospitality & Nightlife Partners
const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'MONOJIT',
    role: 'GM · Rumors Bar',
    quote: '"Elevated our bar experience instantly with bespoke hydration."',
    image: `${images}/rumors.webp`,
    avatar: `${images}/monojit.webp`,
    rating: 5,
    initialX: -30,
    initialY: 20,
    initialRotate: -7,
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
    initialX: 30,
    initialY: -20,
    initialRotate: 6,
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
    initialX: -12,
    initialY: -10,
    initialRotate: -2,
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
    initialX: 12,
    initialY: 12,
    initialRotate: 3,
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

  return (
    <section className={`w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-10 font-fira relative ${className}`}>
      
      {/* Outer Container */}
      <div
        ref={containerRef}
        className="w-full bg-[#101a35] text-[#f5f4ef] rounded-[32px] sm:rounded-[60px] md:rounded-[90px] lg:rounded-[130px] p-6 sm:p-12 lg:p-16 overflow-hidden relative shadow-2xl flex flex-col items-center justify-between min-h-[1100px] sm:min-h-[1350px] lg:min-h-[1480px]"
      >
        {/* Background Water Texture Overlay */}
        <img
          src={`${images}/logo/water-texture.svg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay pointer-events-none select-none z-0"
        />

        {/* ========================================================================
            1. TOP HEADER STACK
            ======================================================================== */}
        <div className="flex flex-col items-center text-center z-10 relative mb-8 sm:mb-12">
          
          {/* Slanted Pill Badge */}
          {tagText && (
            <div className="mb-3 sm:mb-4 -rotate-[3deg]">
              <span className="inline-block bg-[#f5f4ef] text-[#101a35] font-fira font-extrabold text-sm sm:text-base lg:text-lg uppercase tracking-tight px-4 sm:px-5 py-1.5 rounded-full shadow-md">
                {tagText}
              </span>
            </div>
          )}

          {/* Main Headline Stack */}
          <h2 className="m-0 font-fira font-extrabold uppercase tracking-tight leading-[0.83] text-center">
            {/* White Line 1 */}
            <span className="block text-[#f5f4ef] text-[40px] sm:text-[72px] lg:text-[96px] xl:text-[112px]">
              {titleLine1}
            </span>
            {/* Cyan Line 2 */}
            <span className="block text-[#39b8f2] text-[40px] sm:text-[72px] lg:text-[96px] xl:text-[112px] -mt-1 sm:-mt-3">
              {titleLine2}
            </span>
          </h2>

          {/* Subtitle Statement */}
          <p className="mt-4 sm:mt-6 max-w-xs sm:max-w-md lg:max-w-lg font-fira font-normal text-[#f5f4ef]/80 text-xs sm:text-base lg:text-lg leading-snug tracking-tight m-0">
            {subtitle}
          </p>
        </div>

        {/* ========================================================================
            2. FAN-STACKED DRAGGABLE CARDS AREA
            ======================================================================== */}
        <div className="relative w-full max-w-2xl h-[580px] sm:h-[700px] lg:h-[760px] flex items-center justify-center z-20 my-auto">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.id}
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
              bgColor={item.bgColor}
              textColor={item.textColor}
              starColor={item.starColor}
              authorBgColor={item.authorBgColor}
              authorTextColor={item.authorTextColor}
            />
          ))}
        </div>

        {/* ========================================================================
            3. FOOTER STATEMENT
            ======================================================================== */}
        <div className="z-10 relative mt-8 sm:mt-12 text-center">
          <p className="font-fira font-extrabold text-[#f5f4ef] text-sm sm:text-xl lg:text-2xl leading-none tracking-wider uppercase m-0 opacity-90">
            {footerText}
          </p>
        </div>

      </div>

    </section>
  );
}