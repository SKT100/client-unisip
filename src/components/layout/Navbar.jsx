import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

const images = '/images';
const ease = [0.22, 1, 0.36, 1];

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Work', path: '/work' },
  { name: 'Blog', path: '/blog' },
];

function WhatsAppIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
            className="fixed inset-0 z-40 bg-darkblue/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.875rem,env(safe-area-inset-top))] sm:px-6 sm:pt-4 lg:px-8">
        <div
          className={`pointer-events-auto mx-auto w-full max-w-[1280px] overflow-hidden rounded-[32px] border border-white/15 bg-darkblue text-white transition-shadow duration-300 ${
            scrolled ? 'shadow-[0_10px_30px_rgba(16,26,53,0.28)]' : 'shadow-none'
          }`}
        >
          <div className="flex h-14 w-full items-center justify-between px-4 sm:h-16 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
            
            {/* Logo + UNISIP Brand Header */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              aria-label="Unisip Home"
              className="group inline-flex items-center gap-2.5 justify-self-start rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyanglow"
            >
              <img
                src={`${images}/logo/unisip-logo.svg`}
                alt="Unisip Logo"
                width={40}
                height={40}
                className="h-8 w-auto shrink-0 object-contain sm:h-9"
              />
              <span className="font-fira text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
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
                        ? 'bg-white/10 font-bold text-cyanglow'
                        : 'text-cream font-medium hover:bg-white/5 hover:text-cyanglow'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Area: Hashtag + Expanded WhatsApp Button going to /contact */}
            <div className="hidden items-center justify-self-end gap-3 lg:gap-4 md:flex">
              <span className="hidden font-fira text-xs lg:text-sm font-extrabold uppercase tracking-widest text-cyanglow xl:inline-block">
                #BOTTLEYOURBRAND
              </span>

              <Link
                to="/contact"
                aria-label="Contact UniSip"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-cream text-darkblue px-5 py-2.5 lg:px-6 font-fira text-sm lg:text-base font-extrabold uppercase tracking-wider transition-all duration-300 hover:bg-[#25D366] hover:text-white active:bg-[#1EBE5D] hover:scale-[1.03] active:scale-[0.97] shadow-md hover:shadow-lg cursor-pointer shrink-0"
              >
                <WhatsAppIcon className="h-5 w-5 lg:h-6 lg:w-6 fill-current shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span>Chat on WhatsApp</span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-white transition-colors active:text-cyanglow focus-visible:outline-2 focus-visible:outline-cyanglow md:hidden"
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

          {/* Mobile Drawer */}
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
                <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-white/10 px-5 pb-6 pt-3">
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
                              isActive ? 'text-cyanglow' : 'text-white'
                            }`}
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* Mobile CTAs */}
                  <motion.div variants={itemVariants} className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
                    <span className="font-fira text-xs font-extrabold text-cyanglow uppercase tracking-widest">
                      #BOTTLEYOURBRAND
                    </span>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-cream py-3.5 px-6 font-fira text-base font-extrabold uppercase tracking-wider text-darkblue transition-all duration-300 hover:bg-[#25D366] hover:text-white active:bg-[#1EBE5D] active:text-white shadow-md active:scale-98"
                    >
                      <WhatsAppIcon className="h-6 w-6 fill-current shrink-0" />
                      <span>Chat on WhatsApp</span>
                    </Link>
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