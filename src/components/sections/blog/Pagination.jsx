import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Helper to generate numbered page items with ellipsis logic
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 sm:gap-3 mt-10 sm:mt-14 mb-4 sm:mb-6 font-fira select-none" aria-label="Blog pagination">
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 ${
          currentPage === 1
            ? 'opacity-40 cursor-not-allowed bg-darkblue/10 text-darkblue'
            : 'bg-darkblue text-cream hover:bg-midblue hover:scale-105 shadow-sm'
        }`}
        aria-label="Go to previous page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span>PREV</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-1.5 font-bold text-darkblue/40 text-sm sm:text-base">
                ...
              </span>
            );
          }

          const isActive = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center ${
                isActive
                  ? 'bg-darkblue text-cream shadow-md scale-105'
                  : 'bg-darkblue/10 text-darkblue hover:bg-darkblue/20 hover:scale-105'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 ${
          currentPage === totalPages
            ? 'opacity-40 cursor-not-allowed bg-darkblue/10 text-darkblue'
            : 'bg-darkblue text-cream hover:bg-midblue hover:scale-105 shadow-sm'
        }`}
        aria-label="Go to next page"
      >
        <span>NEXT</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </nav>
  );
}