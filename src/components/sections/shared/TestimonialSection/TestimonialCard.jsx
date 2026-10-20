import React from 'react';
import { motion } from 'framer-motion';

const fallbackAvatar = '/images/unisip-bottle-hero.webp';
const fallbackImage = '/images/hand-bottle-about.webp';

/**
 * Individual Testimonial Card Component
 * Formatted with longer vertical dimensions, configurable card background colors,
 * customizable star states (dark cream, mid blue, etc.), and drag controls.
 */
export default function TestimonialCard({
  quote = '"They took our idea and turned it into something that actually feels like our brand."',
  name = 'ANANYA SEN',
  role = 'Brand Manager · Hospitality',
  avatar = fallbackAvatar,
  image = fallbackImage,
  rating = 5,
  initialX = 0,
  initialY = 0,
  initialRotate = 0,
  dragConstraintsRef,
  // Color Customization Props
  bgColor = 'bg-[#669eff]',
  textColor = 'text-[#101a35]',
  starColor = 'text-[#f5f4ef]', // Can be 'text-[#f5f4ef]' (dark cream) or 'text-[#2d468a]' (mid blue)
  authorBgColor = 'bg-[#f5f4ef]',
  authorTextColor = 'text-[#101a35]',
  className = '',
}) {
  return (
    <motion.div
      drag
      dragConstraints={dragConstraintsRef}
      dragElastic={0.15}
      whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 50 }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, x: -250, rotate: initialRotate - 10 }}
      whileInView={{ opacity: 1, x: initialX, y: initialY, rotate: initialRotate }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 18,
        mass: 0.8,
      }}
      className={`absolute w-[310px] sm:w-[410px] lg:w-[460px] ${bgColor} ${textColor} rounded-[32px] sm:rounded-[42px] p-5 sm:p-7 shadow-2xl cursor-grab select-none font-fira border border-white/20 touch-none ${className}`}
    >
      {/* 1. Taller Photo Preview Visual */}
      <div className="w-full h-[200px] sm:h-[260px] lg:h-[290px] bg-[#d9d9d9] rounded-[24px] sm:rounded-[28px] overflow-hidden mb-5 relative">
        <img
          src={image}
          alt={`${name} Showcase`}
          className="w-full h-full object-cover pointer-events-none select-none"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      {/* 2. Star Rating Row (Customizable Star Colors) */}
      <div className={`flex items-center gap-1.5 mb-4 ${starColor}`}>
        {Array.from({ length: rating }).map((_, i) => (
          <svg
            key={i}
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current drop-shadow-sm"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* 3. Main Testimonial Quote */}
      <p className="font-fira font-extrabold text-base sm:text-2xl lg:text-[24px] leading-[1.08] tracking-tight uppercase mb-6 text-left">
        {quote}
      </p>

      {/* 4. Bottom Author Info Badge */}
      <div className={`w-full ${authorBgColor} ${authorTextColor} rounded-[22px] sm:rounded-[26px] p-3 sm:p-4 flex items-center gap-4 shadow-md border border-black/5 text-left`}>
        {/* Avatar Circle */}
        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#d9d9d9] overflow-hidden shrink-0 border border-current/10">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover pointer-events-none"
            onError={(e) => {
              e.currentTarget.src = fallbackAvatar;
            }}
          />
        </div>

        {/* Name & Role */}
        <div className="flex flex-col min-w-0">
          <h4 className="font-fira font-extrabold text-base sm:text-lg leading-none tracking-tight uppercase truncate m-0">
            {name}
          </h4>
          <span className="font-fira font-medium text-xs sm:text-sm leading-tight tracking-tight opacity-75 truncate mt-1">
            {role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}