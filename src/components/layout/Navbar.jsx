import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import PillButton from '../ui/PillButton';

const images = '/images';
const ease = [0.22, 1, 0.36, 1];

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Work', path: '/work' },
  { name: 'Blog', path: '/blog' },
];

const drawerVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.35, ease },
      opacity: { duration: 0.15 },
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.45, ease },
      opacity: { duration: 0.25 },
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 14, transition: { duration: 0.15 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Optimized scroll listener with state equality check
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPastThreshold = window.scrollY > 20;
          setScrolled((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => e.matches && setIsOpen(false);

    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-darkblue/50 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.875rem,env(safe-area-inset-top))] sm:px-6 sm:pt-4 lg:px-8 font-fira">
        <div
          className={`pointer-events-auto mx-auto w-full max-w-[1280px] overflow-hidden rounded-[28px] sm:rounded-[32px] border border-cream/15 bg-darkblue text-cream transition-shadow duration-300 ${
            scrolled ? 'shadow-[0_12px_32px_rgba(16,26,53,0.35)]' : 'shadow-none'
          }`}
        >
          <div className="flex h-14 w-full items-center justify-between px-4 sm:h-16 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
            
            {/* Logo & Brand Wordmark */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              aria-label="Unisip Home"
              className="group inline-flex items-center gap-2.5 justify-self-start rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyanglow"
            >
              <img
                src={`${images}/logo/unisip-logo.svg`}
                alt="Unisip Logo"
                width={36}
                height={36}
                className="h-8 w-auto shrink-0 object-contain sm:h-9"
              />
              <span className="font-fira text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-cream group-hover:text-cyanglow transition-colors duration-200">
                UNISIP
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Primary">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`select-none rounded-full px-4 py-1.5 font-fira text-lg lg:text-xl uppercase tracking-wider transition-colors duration-200 ${
                      isActive
                        ? 'bg-cream/10 font-bold text-cyanglow'
                        : 'text-cream font-medium hover:bg-cream/5 hover:text-cyanglow'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Area */}
            <div className="hidden items-center justify-self-end gap-4 md:flex lg:gap-6">
              <span className="hidden font-fira text-sm lg:text-base font-extrabold uppercase tracking-widest text-cyanglow xl:inline-block select-none">
                #BOTTLEYOURBRAND
              </span>
              <PillButton 
                to="/contact" 
                size="sm"
                logo={`${images}/logo/bottle-logo-mini.svg`}
                className="!px-5 !py-2.5 !text-sm sm:!text-base font-extrabold uppercase tracking-wide hover:scale-105 transition-transform"
              >
                Contact Us
              </PillButton>
            </div>

            {/* Mobile Toggle Button (Expanded to 48x48px for WCAG compliance) */}
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="-mr-2 flex h-12 w-12 items-center justify-center text-cream transition-colors active:text-cyanglow focus-visible:outline-2 focus-visible:outline-cyanglow md:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <span className="relative flex h-4 w-5 flex-col items-center justify-between">
                <span className={`h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-300 ease-out ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
                <span className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-300 ease-out ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
              </span>
            </button>

          </div>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                key="drawer"
                initial="closed"
                animate="open"
                exit="closed"
                variants={drawerVariants}
                className="overflow-hidden md:hidden"
              >
                <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-cream/10 px-5 pb-6 pt-3">
                  <nav className="flex flex-col gap-2" aria-label="Mobile">
                    {navLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <motion.div key={link.name} variants={itemVariants}>
                          <Link
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            aria-current={isActive ? 'page' : undefined}
                            className={`block py-1.5 font-fira text-2xl font-bold uppercase tracking-wider transition-colors active:text-cyanglow ${
                              isActive ? 'text-cyanglow' : 'text-cream'
                            }`}
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <motion.div variants={itemVariants} className="mt-4 flex flex-col gap-4 border-t border-cream/10 pt-4">
                    <span className="font-fira text-sm font-extrabold text-cyanglow uppercase tracking-widest">
                      #BOTTLEYOURBRAND
                    </span>
                    <PillButton 
                      to="/contact" 
                      size="lg" 
                      iconSize={40} 
                      logo={`${images}/logo/bottle-logo-mini.svg`}
                      fullWidth
                      onClick={() => setIsOpen(false)}
                      className="!text-base font-extrabold uppercase tracking-wider"
                    >
                      Contact Us
                    </PillButton>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>
    </MotionConfig>
  );
}