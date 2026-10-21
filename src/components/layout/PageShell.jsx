import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PageShell({
  children,
  showFooter = true,
  maxWidth = 'max-w-[1380px]' // Default expanded max-width for modern wide displays
}) {
  return (
    <div className="min-h-screen bg-cream text-darkblue flex flex-col justify-between selection:bg-lightblue selection:text-white">
      <Navbar />

      {/* Universal Page Container with Dynamic Max-Width */}
      <main
        id="main-content"
        className={`flex-grow pt-20 sm:pt-24 lg:pt-28 pb-0 px-4 sm:px-6 lg:px-8 relative ${maxWidth} mx-auto w-full`}
      >
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}