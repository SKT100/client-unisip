import React from 'react';
import { BLOG_CATEGORIES } from '../../../data/blogs.js';

export default function BlogSearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="w-full bg-lightblue text-cream rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 lg:p-8 mb-10 sm:mb-14 shadow-xl font-fira">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/20">
        <h2 className="heading-small text-white">
          EXPLORE OUR LATEST HYDRATION INSIGHTS &amp; STORIES
        </h2>

        {/* Search Field */}
        <div className="relative w-full md:w-80 lg:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles, tags, topics..."
            className="w-full bg-cream text-darkblue placeholder-darkblue/50 text-small rounded-full pl-11 pr-10 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-darkblue transition-all shadow-inner font-semibold"
          />
          <svg
            className="w-5 h-5 text-darkblue/60 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-darkblue/50 hover:text-darkblue p-1 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="pt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
        {BLOG_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`text-micro px-4 py-2 rounded-full transition-all duration-200 select-none shadow-sm ${
                isActive
                  ? 'bg-cream text-darkblue shadow-md scale-105'
                  : 'bg-darkblue text-white hover:bg-darkblue/80'
              }`}
            >
              {cat === 'ALL' ? 'ALL INSIGHTS' : cat}
            </button>
          );
        })}
      </div>

    </div>
  );
}