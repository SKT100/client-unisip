import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const fallbackImage = '/images/hand-bottle-about.webp';

export default function BrandShowcaseCard({
  image,
  title,
  subtitle,
  alt = 'UniSip Brand Showcase',
  aspectClass = 'aspect-[4/3]',
  className = '',
}) {
  const cardRef = useRef(null);

  // Normalized cursor displacement (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Amplified, tactile 3D rotation (±13° range) with snappy spring recovery
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12.5, -12.5]), {
    stiffness: 280,
    damping: 18,
    mass: 0.1,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-13.5, 13.5]), {
    stiffness: 280,
    damping: 18,
    mass: 0.1,
  });

  // Specular sheen tracking coordinates
  const sheenX = useTransform(x, [-0.5, 0.5], ['-10%', '110%']);
  const sheenY = useTransform(y, [-0.5, 0.5], ['-10%', '110%']);

  const handlePointerMove = (e) => {
    // Disable on touch devices to preserve native scroll performance
    if (!cardRef.current || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 850 }} className="w-full h-full select-none">
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.008 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden font-fira group shadow-md hover:shadow-2xl bg-cream/70 border border-darkblue/10 will-change-transform cursor-pointer transition-shadow duration-300 ${aspectClass} ${className}`}
      >
        {/* Specular Radial Glare Overlay */}
        <motion.div
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 65%)',
            left: sheenX,
            top: sheenY,
            transform: 'translate(-50%, -50%)',
          }}
          className="pointer-events-none absolute w-[480px] h-[480px] z-20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Photography Layer (Subdued zoom so 3D tilt is the hero) */}
        <img
          src={image}
          alt={alt || title || 'Brand Showcase'}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover scale-[1.01] transition-transform duration-700 ease-out pointer-events-none"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />

        {/* Ambient Dark Bottom Vignette */}
        {(title || subtitle) && (
          <div 
            style={{ transform: 'translateZ(20px)' }}
            className="absolute inset-0 bg-gradient-to-t from-darkblue/85 via-darkblue/20 to-transparent flex flex-col justify-end p-5 sm:p-7 z-10 text-left pointer-events-none"
          >
            {title && (
              <h3 className="heading-mid text-cream mb-1">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-small text-cream/80 font-normal m-0 leading-snug">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}