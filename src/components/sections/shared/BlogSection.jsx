import React from 'react';
import { Link } from 'react-router-dom';
import PillTag from '../../ui/PillTag';
import PillButton from '../../ui/PillButton';
import SplitReveal from '../../ui/SplitReveal';
import { BLOG_POSTS } from '../../../data/blogs';

const fallbackImage = '/images/hand-bottle-about.webp';

const DEFAULT_POSTS = BLOG_POSTS.slice(0, 3).map((post, idx) => ({
  id: post.id,
  category: post.category,
  title: post.title,
  image: post.image,
  link: `/blog/${post.slug}`,
  offset: idx === 1,
}));

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
      
      {/* 1. Header Stack */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
        {tagText && (
          <div className="mb-3 sm:mb-4">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              {tagText}
            </PillTag>
          </div>
        )}

        <h2 className="m-0 heading-display text-darkblue text-center leading-[0.82]">
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
            {titleMain && (
              <SplitReveal delay={0.05}>
                {titleMain}
              </SplitReveal>
            )}
            {titleOutlined && (
              <SplitReveal
                delay={0.18}
                charStyle={{
                  WebkitTextStroke: '3px var(--color-darkblue)',
                  color: 'transparent',
                }}
              >
                {titleOutlined}
              </SplitReveal>
            )}
          </div>

          {titleSub && (
            <span className="block text-darkblue -mt-1 sm:-mt-3">
              <SplitReveal delay={0.28}>
                {titleSub}
              </SplitReveal>
            </span>
          )}
        </h2>

        {subtitle && (
          <p className="mt-4 sm:mt-6 max-w-xl mx-auto text-general font-normal text-darkblue/80 leading-snug tracking-tight">
            {subtitle}
          </p>
        )}
      </div>

      {/* 2. Responsive View All Button */}
      {viewAllLink && (
        <div className="flex justify-center sm:justify-end mb-6 sm:mb-8 pr-0 sm:pr-2">
          <PillButton to={viewAllLink} variant="dark" size="md">
            {viewAllText}
          </PillButton>
        </div>
      )}

      {/* 3. Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8 items-start">
        {posts.map((post, idx) => {
          const isMiddleOffset = enableOffset && (post.offset || idx === 1);
          const postLink = post.link || (post.slug ? `/blog/${post.slug}` : '#');

          return (
            <div
              key={post.id || idx}
              className={`flex flex-col bg-lightblue text-darkblue rounded-[28px] sm:rounded-[36px] p-4 sm:p-5 shadow-lg border border-darkblue/10 overflow-hidden text-left group transition-transform duration-300 ease-out hover:-translate-y-2 will-change-transform ${
                isMiddleOffset ? 'lg:translate-y-8' : ''
              }`}
            >
              <Link 
                to={postLink} 
                className="flex flex-col h-full focus:outline-none"
                aria-label={post.title}
              >
                <div className="w-full h-[240px] sm:h-[280px] lg:h-[300px] rounded-[20px] sm:rounded-[26px] overflow-hidden bg-cream/50 mb-4 sm:mb-5 relative">
                  <img
                    src={post.image || fallbackImage}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>

                <div className="mb-2.5 sm:mb-3">
                  <span className="inline-block bg-darkblue text-cream px-3.5 py-1 rounded-full font-fira font-extrabold text-micro uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <h3 className="heading-mid text-darkblue mb-2 group-hover:text-midblue transition-colors duration-200">
                  {post.title}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>

    </section>
  );
}