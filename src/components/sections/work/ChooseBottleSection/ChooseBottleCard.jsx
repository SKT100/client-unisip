import React from 'react';
import { motion } from 'framer-motion';

const fallbackImage = '/images/unisip-bottle-hero.webp';

/**
 * Polaroid-Style Bottle Showcase Card Component
 * Updated with portrait aspect ratio (3:4) and top alignment to prevent image cropping.
 */
export default function ChooseBottleCard({
  title = 'Unisip DE Glacier',
  volume = '500 ml',
  image = fallbackImage,
  rotate = 'rotate-0',
  className = '',
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`shrink-0 w-[220px] sm:w-[260px] lg:w-[290px] bg-midblue text-cream rounded-[24px] sm:rounded-[28px] p-3 sm:p-4 select-none font-fira flex flex-col justify-between ${rotate} ${className}`}
    >
      {/* Upper Portrait Image Slot (3:4 aspect ratio with top alignment) */}
      <div className="w-full aspect-[3/4] rounded-[16px] sm:rounded-[20px] overflow-hidden flex items-center justify-center relative bg-midblue">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top pointer-events-none transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      {/* Bottom Product Info Label Stack */}
      <div className="pt-3 pb-1 px-1 text-left flex flex-col justify-end">
        <h4 className="font-fira font-bold text-cream text-base sm:text-lg leading-tight uppercase tracking-tight m-0">
          {title}
        </h4>
        <span className="font-fira font-normal text-cream/80 text-xs sm:text-sm leading-tight tracking-tight mt-0.5">
          {volume}
        </span>
      </div>
    </motion.div>
  );
}