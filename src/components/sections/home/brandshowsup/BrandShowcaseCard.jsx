import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fallbackImage = '/images/hand-bottle-about.webp';

export default function BrandShowcaseCard({
  image,
  title,
  subtitle,
  aspectClass = 'aspect-[4/3]',
  className = '',
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden select-none font-fira group shadow-md hover:shadow-xl bg-cream/70 transition-shadow duration-300 ${aspectClass} ${className}`}
    >
      <img
        src={image}
        alt={title || 'Brand Showcase'}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
        }}
      />

      {/* Specular Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 hidden md:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 244, 239, 0.22), transparent 75%)`,
        }}
      />

      {(title || subtitle) && (
        <div className="absolute inset-0 bg-gradient-to-t from-darkblue/80 via-darkblue/15 to-transparent flex flex-col justify-end p-5 sm:p-7 z-10 text-left">
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
  );
}