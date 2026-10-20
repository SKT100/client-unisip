import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PillButton from '../components/ui/PillButton';

const images = '/images';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-cream text-darkblue font-fira selection:bg-cyanglow selection:text-darkblue">
      <Navbar />

      {/* Main Content with Universal Top & Bottom Clearance */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-24 lg:pb-32 text-center my-auto">
        
        {/* 404 Water Droplet Graphic */}
        <div 
          className="flex items-center justify-center gap-1 sm:gap-3 md:gap-5 font-fira font-black text-darkblue text-[100px] sm:text-[150px] md:text-[200px] lg:text-[240px] leading-none select-none tracking-tighter" 
          aria-label="404 Error - Page Not Found"
        >
          <span>4</span>
          <img
            alt="Unisip Logo"
            src={`${images}/logo/unisip-logo.svg`}
            className="h-[0.82em] w-auto object-contain shrink-0 mx-1 sm:mx-2"
          />
          <span>4</span>
        </div>

        {/* Subtitle using pre-built typography */}
        <p className="heading-small text-darkblue/80 max-w-sm sm:max-w-xl mt-3 sm:mt-6 tracking-wide normal-case font-normal">
          This page has run dry.
          <br />
          Please go back to Unisip Home Page.
        </p>

        {/* Home CTA Button */}
        <div className="mt-8 sm:mt-12">
          <PillButton 
            to="/" 
            variant="dark" 
            size="lg"
            logo={`${images}/logo/back-logo.svg`}
            iconSize={32}
            className="!px-8 !py-3.5"
          >
            BACK HOME
          </PillButton>
        </div>

      </main>

      <Footer />
    </div>
  );
}