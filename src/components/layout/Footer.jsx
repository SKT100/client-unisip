import React from 'react';
import { Link } from 'react-router-dom';
import PillButton from '../ui/PillButton';

const images = '/images';

function DashedDivider() {
  return (
    <div className="w-full my-6 sm:my-10">
      <svg
        className="w-full h-1 text-white/40"
        viewBox="0 0 1200 4"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="2"
          x2="1200"
          y2="2"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="12 8"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mx-3 mb-3 mt-8 sm:mx-6 sm:mb-6 sm:mt-12 lg:mx-8 lg:mb-8 lg:mt-16 bg-darkblue text-cream rounded-[32px] sm:rounded-[56px] lg:rounded-[80px] p-3 sm:p-6 lg:p-8 overflow-hidden font-fira">
      
      {/* Hero CTA Container */}
      <section className="relative w-full min-h-[360px] sm:min-h-[460px] lg:min-h-[540px] rounded-[24px] sm:rounded-[40px] lg:rounded-[60px] overflow-hidden flex flex-col items-center justify-center text-center">
        
        {/* Background Image */}
        <img
          src={`${images}/footer-img-unisip.webp`}
          alt="Custom branded bottles"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `${images}/Unisip Logo.png`;
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#101522]/85" />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-8 pb-10 sm:pt-12 sm:pb-14">
          
          {/* Main Hero Header using display typography */}
          <h2 className="heading-display text-white m-0">
            YOUR BRAND.
            <br />
            YOUR BOTTLE.
          </h2>

          {/* Slanted Rectangle Badge */}
          <div className="-mt-2 lg:-mt-1 mb-6 sm:mb-10 inline-block bg-cream text-darkblue heading-big px-5 py-1.5 sm:px-8 sm:py-2.5 -rotate-[2.5deg] shadow-2xl whitespace-nowrap">
            MAKE IT YOURS.
          </div>

          {/* CTA Pill Button */}
          <PillButton
            href="/contact"
            variant="light"
            logo={`${images}/logo/bottle-logo-mini.svg`}
            iconSize={32}
            className="!min-h-[52px] sm:!min-h-[68px] xl:!min-h-[78px] !px-8 sm:!px-10 xl:!px-12 heading-small !leading-[82.3%]"
          >
            START YOUR PROJECT
          </PillButton>
        </div>
      </section>

      {/* Main Footer Body */}
      <div className="px-3 sm:px-8 lg:px-12 pt-8 pb-6 sm:pt-12 sm:pb-8">
        
        {/* Brand Header & Contact Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          
          {/* Scaled UNISIP Logo & Wordmark */}
          <Link to="/" className="inline-flex items-center gap-3 sm:gap-5 group" aria-label="Unisip Home">
            <img
              alt="Unisip Logo"
              src={`${images}/logo/unisip-logo-white.svg`}
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `${images}/Unisip Logo.png`;
              }}
            />
            <div className="flex flex-col">
              <strong className="font-fira font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] text-white group-hover:text-cyanglow transition-colors duration-200">
                UNISIP
              </strong>
              <span className="font-fira font-bold text-xs sm:text-base md:text-lg lg:text-xl text-cyanglow tracking-wider mt-1 sm:mt-2">
                #BOTTLE YOUR BRAND
              </span>
            </div>
          </Link>

          {/* Contact Details */}
          <div className="flex flex-col text-left">
            <h3 className="heading-small text-white mb-1.5 sm:mb-3">
              LET'S TALK
            </h3>
            <a href="mailto:enquiry.unisip@gmail.com" className="text-general font-medium text-white/90 hover:text-cyanglow transition-colors duration-200 flex items-center gap-2.5 group">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyanglow shrink-0 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              enquiry.unisip@gmail.com
            </a>
            <a href="tel:+918585034143" className="text-general font-medium text-white/90 hover:text-cyanglow transition-colors duration-200 flex items-center gap-2.5 mt-1.5 group">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyanglow shrink-0 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +91 8585034143
            </a>
          </div>
        </div>

        {/* Thick Dashed Divider */}
        <DashedDivider />

        {/* Navigation Grid for Main Links, Company, Legal & Address */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          
          {/* Socials Column (Instagram & YouTube) */}
          <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
            <h3 className="text-micro text-white/60 tracking-wider">
              Socials
            </h3>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/unisip.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @unisip.in"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-darkblue flex items-center justify-center hover:bg-cyanglow transition-colors duration-200 shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-darkblue" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@unisip_in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube @unisip_in"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-darkblue flex items-center justify-center hover:bg-cyanglow transition-colors duration-200 shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-darkblue" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Section (Main Pages) */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-micro text-white/60 tracking-wider mb-1">Explore</h3>
            <Link to="/" className="text-general font-bold text-white hover:text-cyanglow transition-colors duration-200">Home</Link>
            <Link to="/about" className="text-general font-bold text-white hover:text-cyanglow transition-colors duration-200">About</Link>
            <Link to="/work" className="text-general font-bold text-white hover:text-cyanglow transition-colors duration-200">Work</Link>
            <Link to="/blog" className="text-general font-bold text-white hover:text-cyanglow transition-colors duration-200">Blog</Link>
          </div>

          {/* Company & Legal Section */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-micro text-white/60 tracking-wider mb-1">Company</h3>
            <Link to="/404" className="text-general font-bold text-white hover:text-cyanglow transition-colors duration-200">Not Found (404)</Link>
            <Link to="/contact" className="text-general font-bold text-white hover:text-cyanglow transition-colors duration-200">Contact Us</Link>
          </div>

          {/* Address Section */}
          <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
            <h3 className="text-micro text-white/60 tracking-wider mb-1">Address</h3>
            <strong className="text-general font-bold text-white">Liluah, Howrah</strong>
            <p className="text-small font-normal text-white/80 leading-relaxed">
              3/7 Girish Ghosh Road P.O Belurmath, nr.
              <br />
              Rangoli Mall
              <br />
              West Bengal 711202
            </p>
          </div>

        </div>

        {/* Thick Dashed Divider */}
        <DashedDivider />

        {/* Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-small text-white/80">
          <p className="m-0 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3">
            <span className="font-bold text-white">© 2026 UNISIP</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-micro tracking-wider text-white/60">YOUR CUSTOMIZED HYDRATION PARTNER.</span>
          </p>
          <a href="#top" onClick={scrollToTop} className="font-bold uppercase text-white hover:text-cyanglow transition-colors duration-200">
            BACK TO TOP ↑
          </a>
        </div>

      </div>
    </footer>
  );
}