import React from 'react';
import { motion } from 'framer-motion';

const fallbackImage = '/images/hand-bottle-about.webp';

/**
 * Individual Showcase Card for the Bento Grid Layout
 */
export default function BrandShowcaseCard({
  image,
  title,
  subtitle,
  aspectClass = 'aspect-[4/3]',
  className = '',
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden select-none font-fira group shadow-lg bg-[#E5E5E0] ${aspectClass} ${className}`}
    >
      {/* Background Showcase Image */}
      <img
        src={image}
        alt={title || 'Brand Showcase'}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
        }}
      />

      {/* Subtle Overlay Gradient & Optional Caption */}
      {(title || subtitle) && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#101A35]/70 via-[#101A35]/10 to-transparent flex flex-col justify-end p-6 sm:p-8 z-10 text-left">
          {title && (
            <h3 className="font-fira font-extrabold text-[#F5F4EF] text-xl sm:text-2xl uppercase tracking-tight leading-tight m-0">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="font-fira font-normal text-[#F5F4EF]/80 text-xs sm:text-sm leading-snug tracking-tight mt-1 m-0">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}