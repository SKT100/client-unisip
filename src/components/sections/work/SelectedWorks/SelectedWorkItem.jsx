import React from 'react';
import { motion } from 'framer-motion';

const fallbackImage = '/images/hand-bottle-about.webp';

/**
 * Extracts YouTube video ID from standard or shortened YouTube URLs
 */
function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

/**
 * Individual Selected Work Item Row
 * Supports alternating layout (media left/right), YouTube embeds, native videos, and images.
 */
export default function SelectedWorkItem({
  title,
  subtitle,
  category,
  mediaSrc,
  mediaType = 'image', // 'youtube' | 'video' | 'image'
  isReversed = false, // false = media on left, true = media on right
  index = 0,
}) {
  const youtubeId = mediaType === 'youtube' ? getYouTubeId(mediaSrc) : null;
  const isNativeVideo = mediaType === 'video' || mediaSrc?.endsWith('.mp4') || mediaSrc?.endsWith('.webm');

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.75,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center my-12 sm:my-16 lg:my-24 font-fira ${
        isReversed ? 'md:direction-reverse' : ''
      }`}
    >
      {/* ========================================================================
          MEDIA COLUMN (OVAL / PILL SHAPED FRAME WITH FILL FORMAT)
          ======================================================================== */}
      <div
        className={`md:col-span-6 lg:col-span-6 flex justify-center ${
          isReversed ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[3/4] rounded-[140px] sm:rounded-[180px] lg:rounded-[220px] overflow-hidden bg-[#E5E5E0] shadow-2xl border-4 border-midblue/10 group cursor-pointer"
        >
          {youtubeId ? (
            /* YouTube Autoplay Loop Fill Container */
            <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1`}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture"
                className="w-[300%] h-[170%] min-w-full min-h-full object-cover pointer-events-none select-none scale-125 transition-transform duration-700 ease-out group-hover:scale-135"
              />
            </div>
          ) : isNativeVideo ? (
            /* Native MP4 / WebM Autoplay Video */
            <video
              src={mediaSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            /* Standard Showcase Image */
            <img
              src={mediaSrc}
              alt={title}
              className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
          )}

          {/* Invisible Overlay for Smooth Hover Catching */}
          <div className="absolute inset-0 bg-transparent z-10 pointer-events-auto" />

          {/* Subtle Hover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-darkblue/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />
        </motion.div>
      </div>

      {/* ========================================================================
          TEXT COLUMN (TITLE & CATEGORY)
          ======================================================================== */}
      <div
        className={`md:col-span-6 lg:col-span-6 flex flex-col items-start ${
          isReversed
            ? 'md:order-1 md:items-end md:text-right'
            : 'md:order-2 md:items-start md:text-left'
        }`}
      >
        {category && (
          <span className="font-fira font-extrabold text-cyanglow uppercase text-xs sm:text-sm tracking-widest mb-2 px-3 py-1 bg-darkblue rounded-full">
            {category}
          </span>
        )}

        <h3 className="font-fira font-extrabold text-darkblue uppercase tracking-tight text-[36px] sm:text-[52px] lg:text-[68px] xl:text-[76px] leading-[0.9] m-0">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-3 sm:mt-4 max-w-md font-fira font-normal text-darkblue/80 text-sm sm:text-lg lg:text-xl leading-snug tracking-tight m-0">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}