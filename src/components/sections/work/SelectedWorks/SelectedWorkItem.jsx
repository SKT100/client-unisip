import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fallbackImage = '/images/hand-bottle-about.webp';

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

export default function SelectedWorkItem({
  title,
  subtitle,
  category,
  mediaSrc,
  mediaType = 'image',
  isReversed = false,
  index = 0,
}) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const youtubeId = mediaType === 'youtube' ? getYouTubeId(mediaSrc) : null;
  const isNativeVideo = mediaType === 'video' || mediaSrc?.endsWith('.mp4') || mediaSrc?.endsWith('.webm');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center my-10 sm:my-14 lg:my-20 font-fira ${
        isReversed ? 'md:direction-reverse' : ''
      }`}
    >
      {/* Media Column */}
      <div className={`md:col-span-6 lg:col-span-6 flex justify-center ${isReversed ? 'md:order-2' : 'md:order-1'}`}>
        <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[3/4] rounded-[140px] sm:rounded-[180px] lg:rounded-[220px] overflow-hidden bg-cream/80 shadow-xl border-4 border-midblue/15 group">
          
          {youtubeId ? (
            isPlayingVideo ? (
              /* Mounted only after user taps/clicks */
              <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              /* Zero-JS Facade: Fast YouTube WebP Poster + Play Button */
              <button
                type="button"
                onClick={() => setIsPlayingVideo(true)}
                aria-label={`Play ${title} video`}
                className="absolute inset-0 w-full h-full p-0 border-0 bg-darkblue cursor-pointer group flex items-center justify-center overflow-hidden"
              >
                <img
                  src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  width="480"
                  height="360"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Frosted Play Disc */}
                <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cream/90 backdrop-blur-md text-darkblue flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )
          ) : isNativeVideo ? (
            <video
              src={mediaSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <img
              src={mediaSrc}
              alt={title}
              loading="lazy"
              decoding="async"
              width="420"
              height="560"
              className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500 ease-out"
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-darkblue/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      {/* Text Column */}
      <div
        className={`md:col-span-6 lg:col-span-6 flex flex-col items-start ${
          isReversed
            ? 'md:order-1 md:items-end md:text-right'
            : 'md:order-2 md:items-start md:text-left'
        }`}
      >
        {category && (
          <span className="font-fira font-extrabold text-cyanglow uppercase text-xs sm:text-sm tracking-widest mb-2 px-3.5 py-1 bg-darkblue rounded-full">
            {category}
          </span>
        )}

        <h3 className="heading-semi-big text-darkblue text-left leading-[0.9] m-0">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-3 sm:mt-4 max-w-md text-general font-normal text-darkblue/80 leading-snug tracking-tight m-0">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}