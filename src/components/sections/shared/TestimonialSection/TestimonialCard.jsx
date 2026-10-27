import React from 'react';
import { motion } from 'framer-motion';

const fallbackAvatar = '/images/unisip-bottle-hero.webp';
const fallbackImage = '/images/hand-bottle-about.webp';

export default function TestimonialCard({
  id,
  quote,
  name,
  role,
  avatar = fallbackAvatar,
  image = fallbackImage,
  rating = 5,
  initialX = 0,
  initialY = 0,
  initialRotate = 0,
  dragConstraintsRef,
  zIndex = 10,
  onBringToFront,
  isDraggable = true,
  bgColor = 'bg-[#669eff]',
  textColor = 'text-[#101a35]',
  starColor = 'text-[#f5f4ef]',
  authorBgColor = 'bg-[#f5f4ef]',
  authorTextColor = 'text-[#101a35]',
  className = '',
}) {
  const cardContent = (
    <div
      className={`w-[88vw] max-w-[310px] xs:max-w-[330px] sm:max-w-[380px] md:w-[410px] lg:w-[440px] ${bgColor} ${textColor} rounded-[26px] sm:rounded-[36px] lg:rounded-[42px] p-3.5 xs:p-4 sm:p-6 lg:p-7 shadow-xl select-none font-fira border border-white/20 will-change-transform ${className}`}
    >
      {/* 1. Photo Preview Visual */}
      <div className="w-full h-[135px] xs:h-[155px] sm:h-[200px] lg:h-[235px] bg-black/10 rounded-[18px] sm:rounded-[24px] overflow-hidden mb-2.5 xs:mb-3 sm:mb-4 relative">
        <img
          src={image}
          alt={`${name} Showcase`}
          loading="lazy"
          decoding="async"
          width="400"
          height="235"
          className="w-full h-full object-cover pointer-events-none select-none"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      {/* 2. Star Rating Row */}
      <div className={`flex items-center gap-1 sm:gap-1.5 mb-1.5 xs:mb-2 sm:mb-3 ${starColor}`}>
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current drop-shadow-sm" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* 3. Testimonial Quote */}
      <p className="font-fira font-extrabold text-xs xs:text-sm sm:text-lg lg:text-[21px] leading-[1.15] tracking-tight uppercase mb-2.5 xs:mb-3.5 sm:mb-5 text-left line-clamp-3 sm:line-clamp-none">
        {quote}
      </p>

      {/* 4. Bottom Author Info Badge */}
      <div className={`w-full ${authorBgColor} ${authorTextColor} rounded-[16px] sm:rounded-[22px] p-2 xs:p-2.5 sm:p-3.5 flex items-center gap-2.5 xs:gap-3 shadow-sm border border-black/5 text-left`}>
        <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-full bg-black/10 overflow-hidden shrink-0 border border-current/10">
          <img
            src={avatar}
            alt={name}
            loading="lazy"
            decoding="async"
            width="44"
            height="44"
            className="w-full h-full object-cover pointer-events-none"
            onError={(e) => {
              e.currentTarget.src = fallbackAvatar;
            }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h4 className="font-fira font-extrabold text-xs sm:text-sm lg:text-base leading-none tracking-tight uppercase truncate m-0">
            {name}
          </h4>
          <span className="font-fira font-medium text-[10px] sm:text-xs leading-tight tracking-tight opacity-75 truncate mt-0.5 sm:mt-1">
            {role}
          </span>
        </div>
      </div>
    </div>
  );

  if (isDraggable) {
    return (
      <motion.div
        drag
        dragConstraints={dragConstraintsRef}
        dragElastic={0.15}
        whileDrag={{ scale: 1.03, cursor: 'grabbing', zIndex: 80 }}
        whileHover={{ scale: 1.015 }}
        onPointerDown={() => onBringToFront && onBringToFront(id)}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          x: initialX,
          y: initialY,
          rotate: initialRotate,
          transition: { type: 'spring', stiffness: 140, damping: 18 },
        }}
        viewport={{ once: true }}
        style={{ zIndex }}
        className="absolute cursor-grab touch-pan-y will-change-transform"
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}