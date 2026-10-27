import React, { useState, useMemo, useEffect } from 'react';
import PageShell from '../components/layout/PageShell';
import BlogCard from '../components/sections/blog/BlogCard';
import BlogSearchFilter from '../components/sections/blog/BlogSearchFilter';
import Pagination from '../components/sections/blog/Pagination';
import PillTag from '../components/ui/PillTag';
import { BLOG_POSTS } from '../data/blogs';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'ALL' || post.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 260, behavior: 'smooth' });
  };

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-fira">
        
        <header className="flex flex-col items-center text-center pt-2 pb-8 sm:pb-10">
          <div className="mb-1.5 sm:mb-3">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              Blog
            </PillTag>
          </div>

          <h1 className="heading-display text-midblue max-w-4xl text-center leading-[0.85]">
            BOTTLES, BRANDS &amp; EVERYTHING IN BETWEEN
          </h1>
        </header>

        <BlogSearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {paginatedPosts.length > 0 ? (
          <main className="pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {paginatedPosts.map((post, idx) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  isPriority={idx === 0 && currentPage === 1}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        ) : (
          <div className="bg-lightblue/20 rounded-[32px] p-12 text-center text-darkblue my-8">
            <h3 className="heading-mid mb-2">No Articles Found</h3>
            <p className="text-general text-darkblue/80 mb-6">
              We couldn't find anything matching "{searchQuery}". Try searching for another keyword or topic.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="bg-darkblue text-cream text-micro px-6 py-3 rounded-full hover:bg-midblue transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </PageShell>
  );
}