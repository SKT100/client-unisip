import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ShowcaseCard({
  image,
  alt = 'UniSip Bottle Showcase',
  badgeText = 'LIMITED DROP',
  title = 'CUSTOM EDITION',
  className = '',
}) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth rotation angles derived from pointer position
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  // Specular sheen coordinates
  const sheenX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const sheenY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
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
    <div
      style={{ perspective: 1000 }}
      className={`inline-block select-none ${className}`}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.25 }}
        className="relative w-[280px] sm:w-[320px] aspect-[3/4] rounded-[32px] bg-darkblue p-5 flex flex-col justify-between overflow-hidden shadow-2xl border border-white/10 cursor-pointer will-change-transform"
      >
        {/* Specular Radial Gradient Reflection */}
        <motion.div
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%)',
            left: sheenX,
            top: sheenY,
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute w-[400px] h-[400px] pointer-events-none z-20 mix-blend-overlay"
        />

        {/* Top Floating Badge */}
        <div style={{ transform: 'translateZ(30px)' }} className="z-10">
          <span className="inline-block bg-cyanglow text-darkblue font-fira font-black text-micro px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            {badgeText}
          </span>
        </div>

        {/* Floating Bottle Layer with Elevated Parallax */}
        <div 
          style={{ transform: 'translateZ(50px)' }}
          className="relative w-full h-[62%] flex items-center justify-center my-auto pointer-events-none"
        >
          <img
            src={image}
            alt={alt}
            width="320"
            height="400"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Bottom Label Stack */}
        <div style={{ transform: 'translateZ(25px)' }} className="z-10 text-left">
          <h4 className="heading-small text-cream m-0 leading-tight">
            {title}
          </h4>
        </div>
      </motion.div>
    </div>
  );
}