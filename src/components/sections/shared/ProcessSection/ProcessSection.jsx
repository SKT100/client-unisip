import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProcessStepCard from './ProcessStepCard';

gsap.registerPlugin(ScrollTrigger);

const images = '/images';

const DEFAULT_PROCESS_STEPS = [
  {
    stepNumber: '01',
    badgeText: 'TELL US YOUR BRAND..',
    title: "Tell us what you're building.",
    description: 'Share your vision, brand assets, and requirements so we can tailor the right hydration solution.',
    image: `${images}/step-1.webp`,
  },
  {
    stepNumber: '02',
    badgeText: 'DESIGN YOUR BOTTLE',
    title: 'We develop the label and visual direction.',
    description: 'Our design team crafts high-fidelity label mockups aligned with your brand identity.',
    image: `${images}/step-2.webp`,
  },
  {
    stepNumber: '03',
    badgeText: 'PRODUCE',
    title: 'Your branded bottles are produced and prepared.',
    description: 'We oversee precision bottling, premium printing, and thorough quality inspection.',
    image: `${images}/step-3.webp`,
  },
  {
    stepNumber: '04',
    badgeText: 'DELIVER',
    title: 'Ready-to-use hydration, delivered to you.',
    description: 'Hassle-free doorstep delivery managed end-to-end for your launch, venue, or event.',
    image: `${images}/step-4.webp`,
  },
];

export default function ProcessSection({
  titleLine1 = 'FROM IDEA',
  titleLine2 = 'TO YOUR BOTTLE.',
  subtitle = 'From your brand identity to the finished bottle, we make custom hydration simple.',
  steps = DEFAULT_PROCESS_STEPS,
  className = '',
}) {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      // 1. Prepare SVG Path Length for Continuous Line Draw
      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // 2. Hide all cards initially for synchronized timeline trigger
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.set(card, { opacity: 0, scale: 0.8, y: 40 });
        }
      });

      // 3. Single Scrubbed Timeline synchronized perfectly with scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'bottom 85%',
          scrub: 1.2, // Smooth spring scrub speed
        },
      });

      // Draw SVG path across timeline duration
      tl.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        duration: 4,
      });

      // Timed Card Reveals as path reaches each step position
      // Step 01 Reveal
      if (cardsRef.current[0]) {
        tl.to(
          cardsRef.current[0],
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' },
          0.4
        );
      }

      // Step 02 Reveal
      if (cardsRef.current[1]) {
        tl.to(
          cardsRef.current[1],
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' },
          1.3
        );
      }

      // Step 03 Reveal
      if (cardsRef.current[2]) {
        tl.to(
          cardsRef.current[2],
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' },
          2.3
        );
      }

      // Step 04 Reveal
      if (cardsRef.current[3]) {
        tl.to(
          cardsRef.current[3],
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' },
          3.2
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`w-full mx-auto font-fira relative ${className}`}>
      
      {/* Outer Container with Generous Padding */}
      <div className="w-full bg-[#39B8F2] text-[#101A35] rounded-[32px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] xl:rounded-[130px] p-5 sm:p-10 lg:p-16 xl:p-20 overflow-hidden relative">
        
        {/* Background Water Texture Overlay */}
        <img
          src={`${images}/logo/water-texture.svg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay pointer-events-none select-none z-0"
        />

        {/* ========================================================================
            BACKGROUND SVG MOTION PATH (Organic, Curly & Sweeping Line)
            ======================================================================== */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1000 1800"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M -20 280 
               C 120 220, 280 260, 240 420 
               C 200 580, 620 400, 780 580 
               C 920 740, 300 780, 220 980 
               C 140 1180, 600 1100, 760 1340 
               C 880 1520, 480 1620, 500 1800"
            stroke="#F5F4EF"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_8px_16px_rgba(16,26,53,0.18)]"
          />
        </svg>

        {/* ========================================================================
            1. SECTION HEADER STACK
            ======================================================================== */}
        <div className="flex flex-col items-center text-center z-10 relative mb-8 sm:mb-14 lg:mb-20">
          <h2 className="m-0 font-fira font-extrabold uppercase tracking-tight leading-[0.83] text-center">
            {/* White Top Line */}
            <span className="block text-[#F5F4EF] text-[40px] sm:text-[76px] lg:text-[108px] xl:text-[128px]">
              {titleLine1}
            </span>
            {/* Dark Navy Bottom Line */}
            <span className="block text-[#101A35] text-[40px] sm:text-[76px] lg:text-[108px] xl:text-[128px] -mt-1 sm:-mt-3">
              {titleLine2}
            </span>
          </h2>

          {/* Subtitle Statement */}
          <p className="mt-4 sm:mt-6 max-w-md sm:max-w-xl lg:max-w-2xl font-fira font-normal text-[#101A35]/90 text-sm sm:text-lg lg:text-xl leading-snug tracking-tight m-0">
            {subtitle}
          </p>
        </div>

        {/* ========================================================================
            2. EXPANDED 2x2 GRID WITH SPACIOUS BREATHING ROOM
            ======================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-20 lg:gap-28 z-10 relative max-w-6xl mx-auto pb-12 sm:pb-20">
          {steps.map((step, idx) => {
            const isOddColumn = idx % 2 === 1;

            return (
              <div
                key={step.stepNumber || idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={isOddColumn ? 'md:mt-24 lg:mt-36' : ''}
              >
                <ProcessStepCard
                  stepNumber={step.stepNumber}
                  badgeText={step.badgeText}
                  title={step.title}
                  description={step.description}
                  image={step.image}
                />
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}