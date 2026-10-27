import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import ProcessStepCard from './ProcessStepCard';

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

function AnimatedProcessCard({ step, idx, progress }) {
  // Stagger card appearances along the progress curve
  const start = 0.08 + idx * 0.22;
  const end = Math.min(start + 0.16, 0.98);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [36, 0]);
  const scale = useTransform(progress, [start, end], [0.92, 1]);

  const isOddColumn = idx % 2 === 1;

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={isOddColumn ? 'md:mt-20 lg:mt-32' : ''}
    >
      <ProcessStepCard
        stepNumber={step.stepNumber}
        badgeText={step.badgeText}
        title={step.title}
        description={step.description}
        image={step.image}
      />
    </motion.div>
  );
}

export default function ProcessSection({
  titleLine1 = 'FROM IDEA',
  titleLine2 = 'TO YOUR BOTTLE.',
  subtitle = 'From your brand identity to the finished bottle, we make custom hydration simple.',
  steps = DEFAULT_PROCESS_STEPS,
  className = '',
}) {
  const sectionRef = useRef(null);

  // Reactive scroll tracking that handles dynamic page height changes
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 85%'],
  });

  // Physical spring interpolation for smooth scrolling in both directions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section ref={sectionRef} className={`w-full mx-auto font-fira relative ${className}`}>
      <div className="w-full bg-cyanglow text-darkblue rounded-[32px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[110px] xl:rounded-[130px] p-5 sm:p-10 lg:p-16 xl:p-20 overflow-hidden relative shadow-xl">
        
        {/* Background Water Texture Overlay */}
        <img
          src={`${images}/logo/water-texture.svg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay pointer-events-none select-none z-0"
        />

        {/* Desktop-Only SVG Flow Curve: Broader 24px stroke with Framer Motion pathLength */}
        <svg
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1000 1800"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M -20 280 
               C 120 220, 280 260, 240 420 
               C 200 580, 620 400, 780 580 
               C 920 740, 300 780, 220 980 
               C 140 1180, 600 1100, 760 1340 
               C 880 1520, 480 1620, 500 1800"
            stroke="var(--color-cream)"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            style={{ pathLength: smoothProgress }}
          />
        </svg>

        {/* 1. Header Stack */}
        <div className="flex flex-col items-center text-center z-10 relative mb-8 sm:mb-14 lg:mb-20">
          <h2 className="m-0 heading-display text-center leading-[0.83]">
            <span className="block text-cream">
              {titleLine1}
            </span>
            <span className="block text-darkblue -mt-1 sm:-mt-3">
              {titleLine2}
            </span>
          </h2>

          <p className="mt-3 sm:mt-5 max-w-md sm:max-w-xl lg:max-w-2xl text-general font-normal text-darkblue/90 leading-snug tracking-tight m-0">
            {subtitle}
          </p>
        </div>

        {/* 2. 2x2 Grid with Bi-directional Scroll-synced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 z-10 relative max-w-5xl mx-auto pb-8 sm:pb-16">
          {steps.map((step, idx) => (
            <AnimatedProcessCard
              key={step.stepNumber || idx}
              step={step}
              idx={idx}
              progress={smoothProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}