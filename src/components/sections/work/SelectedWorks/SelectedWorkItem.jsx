import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Magnetic from '../../../ui/Magnetic';

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
  totalCount = 4,
}) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const itemContainerRef = useRef(null);
  const cardRef = useRef(null);

  const youtubeId = mediaType === 'youtube' ? getYouTubeId(mediaSrc) : null;
  const isNativeVideo = mediaType === 'video' || mediaSrc?.endsWith('.mp4') || mediaSrc?.endsWith('.webm');

  // ============================================================================
  // 1. FOCAL SPOTLIGHT SCROLL PIPELINE: ENTER -> FOCUS -> FADE OUT
  // ============================================================================
  const { scrollYProgress } = useScroll({
    target: itemContainerRef,
    offset: ['start 90%', 'center 50%', 'end 20%'],
  });

  // Smooth opacity: Rises to 1.0 at viewport center, fades to 0.15 as next card arrives
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0.15]);
  
  // Smooth scale: Expands from 0.92 to 1.0 at center, then shrinks subtly to 0.94
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.94]);
  
  // Cinematic vertical translation
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [70, 0, 0, -45]);

  // Subtle Parallax on the Background Watermark Number
  const watermarkY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // ============================================================================
  // 2. 3D SPECULAR SHEEN & TILT
  // ============================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 22 });

  const sheenX = useTransform(mouseX, [-0.5, 0.5], ['-10%', '110%']);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ['-10%', '110%']);

  const handlePointerMove = (e) => {
    if (!cardRef.current || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const formattedIndex = String(index + 1).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  return (
    <div
      ref={itemContainerRef}
      className="w-full relative py-12 sm:py-20 lg:py-28 font-fira select-none"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full will-change-transform"
      >
        <div className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Background Watermark Index with Subtle Parallax */}
          <motion.div
            style={{ y: watermarkY }}
            className={`pointer-events-none absolute -top-8 sm:-top-14 lg:-top-20 text-[100px] xs:text-[130px] sm:text-[180px] lg:text-[240px] font-black text-darkblue/[0.04] leading-none select-none z-0 ${
              isReversed ? 'right-4 md:right-8' : 'left-4 md:left-8'
            }`}
            aria-hidden="true"
          >
            {formattedIndex}
          </motion.div>

          {/* 3D Oval Media Capsule Column */}
          <div
            style={{ perspective: 1000 }}
            className={`md:col-span-6 lg:col-span-6 flex justify-center z-10 ${
              isReversed ? 'md:order-2' : 'md:order-1'
            }`}
          >
            <motion.div
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              whileHover={{ scale: 1.025 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[3/4] rounded-[140px] sm:rounded-[180px] lg:rounded-[220px] overflow-hidden bg-cream/80 shadow-[0_24px_50px_rgba(16,26,53,0.18)] border-4 border-midblue/20 group cursor-pointer will-change-transform"
            >
              {/* Specular Radial Glare Overlay */}
              <motion.div
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 65%)',
                  left: sheenX,
                  top: sheenY,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute w-[460px] h-[460px] pointer-events-none z-30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {youtubeId ? (
                isPlayingVideo ? (
                  <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                      title={title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                    />

                    {/* Magnetic Frosted Play Disc */}
                    <Magnetic pullStrength={0.45} radius={35} className="z-20">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cream/90 backdrop-blur-md text-darkblue flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </Magnetic>
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
                  className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              )}

              {/* Ambient Bottom Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-darkblue/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
            </motion.div>
          </div>

          {/* Text & Metadata Column */}
          <div
            className={`md:col-span-6 lg:col-span-6 flex flex-col items-start z-10 ${
              isReversed
                ? 'md:order-1 md:items-end md:text-right'
                : 'md:order-2 md:items-start md:text-left'
            }`}
          >
            {/* Step Counter & Category Pill */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="font-fira font-extrabold text-[11px] sm:text-xs text-darkblue/50 tracking-widest uppercase">
                [ {formattedIndex} / {formattedTotal} ]
              </span>
              {category && (
                <span className="inline-flex items-center gap-1.5 font-fira font-black text-darkblue text-[10px] sm:text-xs tracking-wider uppercase px-3 py-1 bg-cyanglow rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-darkblue" />
                  {category}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="heading-semi-big text-darkblue leading-[0.88] m-0">
              {title}
            </h3>

            {/* Subtitle Statement */}
            {subtitle && (
              <p className="mt-3 sm:mt-5 max-w-md text-general font-normal text-darkblue/80 leading-snug tracking-tight m-0">
                {subtitle}
              </p>
            )}

            {/* Interactive Explore Link */}
            <div className="mt-6 sm:mt-8">
              <a
                href={mediaSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-fira font-black text-xs sm:text-sm uppercase tracking-widest text-darkblue hover:text-cyanglow transition-colors duration-200"
              >
                <span>EXPLORE PROJECT</span>
                <svg
                  className="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}