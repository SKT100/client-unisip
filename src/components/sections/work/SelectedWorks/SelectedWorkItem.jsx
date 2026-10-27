import React, { useState, useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
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
  index = 0,
  progress,
}) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const cardRef = useRef(null);

  const youtubeId = mediaType === 'youtube' ? getYouTubeId(mediaSrc) : null;
  const isNativeVideo = mediaType === 'video' || mediaSrc?.endsWith('.mp4') || mediaSrc?.endsWith('.webm');

  // ============================================================================
  // FOCAL SCROLL RANGES (Card 0 -> Card 1 -> Card 2 -> Card 3)
  // Each card appears, holds focus in the center, and fades away for the next.
  // ============================================================================
  let inputRanges = [0, 0.18, 0.25];
  let opacityRange = [1, 1, 0];
  let scaleRange = [1, 1, 0.94];
  let yRange = [0, 0, -30];
  let activeCheck = (v) => v <= 0.25;

  if (index === 0) {
    inputRanges = [0, 0.18, 0.25];
    opacityRange = [1, 1, 0];
    scaleRange = [1, 1, 0.94];
    yRange = [0, 0, -30];
    activeCheck = (v) => v <= 0.25;
  } else if (index === 1) {
    inputRanges = [0.21, 0.28, 0.44, 0.51];
    opacityRange = [0, 1, 1, 0];
    scaleRange = [0.94, 1, 1, 0.94];
    yRange = [35, 0, 0, -30];
    activeCheck = (v) => v >= 0.24 && v <= 0.51;
  } else if (index === 2) {
    inputRanges = [0.47, 0.54, 0.70, 0.77];
    opacityRange = [0, 1, 1, 0];
    scaleRange = [0.94, 1, 1, 0.94];
    yRange = [35, 0, 0, -30];
    activeCheck = (v) => v >= 0.50 && v <= 0.77;
  } else if (index === 3) {
    inputRanges = [0.73, 0.81, 1.0];
    opacityRange = [0, 1, 1];
    scaleRange = [0.94, 1, 1];
    yRange = [35, 0, 0];
    activeCheck = (v) => v >= 0.76;
  }

  const opacity = useTransform(progress, inputRanges, opacityRange);
  const scale = useTransform(progress, inputRanges, scaleRange);
  const y = useTransform(progress, inputRanges, yRange);
  const pointerEvents = useTransform(progress, (v) => (activeCheck(v) ? 'auto' : 'none'));

  // ============================================================================
  // 3D CURSOR-TRACKED PERSPECTIVE & SPECULAR SHEEN
  // ============================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 220, damping: 22 });

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

  return (
    <motion.div
      style={{ opacity, scale, y, pointerEvents }}
      className="absolute inset-0 w-full h-full flex items-center will-change-transform select-none"
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">

        {/* Media Capsule Frame (Prominent Left/Center of Right Stage) */}
        <div
          style={{ perspective: 1000 }}
          className="sm:col-span-6 flex justify-center sm:justify-start"
        >
          <motion.div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-[220px] xs:max-w-[250px] sm:max-w-[280px] lg:max-w-[340px] xl:max-w-[360px] aspect-[3/4] rounded-[110px] sm:rounded-[150px] lg:rounded-[190px] overflow-hidden bg-cream/90 shadow-[0_24px_50px_rgba(16,26,53,0.16)] border-4 border-midblue/20 group cursor-pointer will-change-transform"
          >
            {/* Specular Radial Sheen */}
            <motion.div
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 65%)',
                left: sheenX,
                top: sheenY,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute w-[440px] h-[440px] pointer-events-none z-30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* YouTube Facade (Project 4: Xavrang only) */}
            {youtubeId ? (
              isPlayingVideo ? (
                <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={title || 'Project Video'}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPlayingVideo(true)}
                  aria-label={`Play ${title || 'video'}`}
                  className="absolute inset-0 w-full h-full p-0 border-0 bg-darkblue cursor-pointer group flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                    alt={title || 'Project Video Poster'}
                    loading="lazy"
                    decoding="async"
                    width="480"
                    height="360"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                  />

                  {/* Magnetic Frosted Play Button */}
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
                src={mediaSrc || fallbackImage}
                alt={title || 'Project Showcase'}
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

            <div className="absolute inset-0 bg-gradient-to-t from-darkblue/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
          </motion.div>
        </div>

        {/* Project Description Column (Clean Editorial Focus) */}
        <div className="sm:col-span-6 flex flex-col items-center sm:items-start text-center sm:text-left">
          {category && (
            <span className="font-fira font-extrabold text-cyanglow uppercase text-xs sm:text-sm tracking-[0.22em] mb-2 sm:mb-3 block">
              {category}
            </span>
          )}

          {title ? (
            <h3 className="heading-semi-big text-darkblue leading-[0.88] m-0">
              {title}
            </h3>
          ) : (
            <div className="h-10 sm:h-12 w-48 sm:w-60 bg-darkblue/10 rounded-xl" aria-hidden="true" />
          )}

          {subtitle ? (
            <p className="mt-3 sm:mt-5 max-w-sm sm:max-w-md text-general font-normal text-darkblue/80 leading-snug tracking-tight m-0">
              {subtitle}
            </p>
          ) : (
            <div className="h-4 w-40 sm:w-52 bg-darkblue/5 rounded-md mt-4" aria-hidden="true" />
          )}
        </div>

      </div>
    </motion.div>
  );
}