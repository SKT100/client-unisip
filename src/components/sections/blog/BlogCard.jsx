import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard({ post, className = '' }) {
  const { title, category, tags = [], publishDate, readTime, image, slug, excerpt } = post;

  // Combine category and tags into a single clean array of pill labels
  const allTags = [category, ...tags.filter((t) => t.toUpperCase() !== category.toUpperCase())];

  return (
    <article className={`group relative flex flex-col justify-between bg-lightblue p-4 sm:p-5 rounded-[28px] sm:rounded-[32px] transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl ${className}`}>
      <Link to={slug ? `/blog/${slug}` : '#'} className="flex flex-col h-full" aria-label={title}>
        
        {/* Image Container */}
        <div className="relative w-full aspect-[16/10] bg-cream rounded-[20px] sm:rounded-[24px] overflow-hidden mb-4 shrink-0">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-cream/90 flex flex-col items-center justify-center text-darkblue/30 text-micro p-4 text-center">
              <span>UNISIP INSIGHTS</span>
            </div>
          )}
        </div>

        {/* Article Metadata Row */}
        <div className="flex items-center gap-2 text-small text-darkblue/75 mb-2 font-bold">
          <span>{publishDate}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>

        {/* Article Title */}
        <h3 className="heading-mid text-darkblue line-clamp-2 mb-2 group-hover:text-darkblue/80 transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-general text-darkblue/85 line-clamp-2 mb-4">
            {excerpt}
          </p>
        )}

        {/* Bottom Pill Badges */}
        <div className="mt-auto pt-3 border-t border-darkblue/15 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <span 
              key={tag} 
              className="inline-block bg-darkblue text-cream text-micro px-3 py-1 rounded-full shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

      </Link>
    </article>
  );
}