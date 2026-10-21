import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PillTag from '../../ui/PillTag';
import PillButton from '../../ui/PillButton';
import { BLOG_POSTS } from '../../../data/blogs';

const fallbackImage = '/images/hand-bottle-about.webp';

// Default blog posts dynamically sourced from the first 3 posts in blogs.js
const DEFAULT_POSTS = BLOG_POSTS.slice(0, 3).map((post, idx) => ({
  id: post.id,
  category: post.category,
  title: post.title,
  image: post.image,
  link: `/blog/${post.slug}`,
  offset: idx === 1,
}));

/**
 * Reusable BlogSection Component
 * Uses PillTag for static section badges and PillButton for CTAs.
 */
export default function BlogSection({
  tagText = 'BLOG',
  titleMain = 'BRAND,',
  titleOutlined = 'STORIES',
  titleSub = '& MORE',
  subtitle = 'Ideas, inspiration and stories from the world of custom hydration.',
  viewAllLink = '/blog',
  viewAllText = 'VIEW ALL',
  posts = DEFAULT_POSTS,
  enableOffset = true,
  className = '',
}) {
  return (
    <section className={`w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 font-fira relative ${className}`}>
      
      {/* ========================================================================
          HEADER STACK
          ======================================================================== */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
        
        {/* Top Slanted Section Tag */}
        {tagText && (
          <div className="mb-3 sm:mb-4">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              {tagText}
            </PillTag>
          </div>
        )}

        {/* Display Headline Stack */}
        <h2 className="m-0 flex flex-col items-center font-fira font-extrabold uppercase tracking-tight leading-[0.82]">
          {/* Top Row */}
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
            {titleMain && (
              <span className="text-darkblue text-[48px] sm:text-[82px] lg:text-[110px] xl:text-[128px]">
                {titleMain}
              </span>
            )}
            {titleOutlined && (
              <span
                className="text-[48px] sm:text-[82px] lg:text-[110px] xl:text-[128px] select-none"
                style={{
                  WebkitTextStroke: '3px #101A35',
                  color: 'transparent',
                }}
              >
                {titleOutlined}
              </span>
            )}
          </div>

          {/* Bottom Line */}
          {titleSub && (
            <span className="text-darkblue text-[52px] sm:text-[88px] lg:text-[118px] xl:text-[136px] -mt-1 sm:-mt-3">
              {titleSub}
            </span>
          )}
        </h2>

        {/* Subtitle Paragraph */}
        {subtitle && (
          <p className="mt-4 sm:mt-6 max-w-xl mx-auto text-general font-normal text-darkblue/80 leading-snug tracking-tight">
            {subtitle}
          </p>
        )}

      </div>

      {/* ========================================================================
          VIEW ALL CTA (Using PillButton Component)
          ======================================================================== */}
      {viewAllLink && (
        <div className="flex justify-end mb-6 sm:mb-8 pr-2">
          <PillButton
            to={viewAllLink}
            variant="dark"
            size="md"
          >
            {viewAllText}
          </PillButton>
        </div>
      )}

      {/* ========================================================================
          BLOG CARDS GRID
          ======================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8 items-start">
        {posts.map((post, idx) => {
          const isMiddleOffset = enableOffset && (post.offset || idx === 1);
          const postLink = post.link || (post.slug ? `/blog/${post.slug}` : '#');

          return (
            <motion.div
              key={post.id || idx}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`flex flex-col bg-[#93B5F6] text-darkblue rounded-[28px] sm:rounded-[36px] p-4 sm:p-5 shadow-lg border border-darkblue/10 overflow-hidden text-left group ${
                isMiddleOffset ? 'lg:translate-y-8' : ''
              }`}
            >
              <Link to={postLink} className="flex flex-col h-full">
                {/* Image Container */}
                <div className="w-full h-[240px] sm:h-[280px] lg:h-[300px] rounded-[20px] sm:rounded-[26px] overflow-hidden bg-cream/50 mb-4 sm:mb-5 relative">
                  <img
                    src={post.image || fallbackImage}
                    alt={post.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>

                {/* Category Pill Badge */}
                <div className="mb-2 sm:mb-3">
                  <span className="inline-block bg-darkblue text-cream px-3.5 py-1 rounded-full font-fira font-extrabold text-xs sm:text-sm tracking-wider uppercase">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-fira font-extrabold text-darkblue text-xl sm:text-2xl lg:text-[26px] leading-[0.95] tracking-tight uppercase mb-2 group-hover:text-midblue transition-colors">
                  {post.title}
                </h3>
              </Link>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}