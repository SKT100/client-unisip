import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PillTag from '../../ui/PillTag';
import PillButton from '../../ui/PillButton';

// Default FAQ Items matching reference image
const DEFAULT_FAQS = [
  {
    id: 1,
    question: 'What kind of bottles can I customise?',
    answer:
      'We offer multiple bottle formats, finishes, labels and customisation options depending on your requirement.',
  },
  {
    id: 2,
    question: 'Can I use my own logo and artwork?',
    answer:
      'Yes! You can provide your existing vector brand assets, or work directly with our design team to adapt your branding onto the label.',
  },
  {
    id: 3,
    question: "What's the minimum order quantity?",
    answer:
      'Minimum order quantities depend on the bottle material and format chosen. Get in touch with us for specific batch details.',
  },
  {
    id: 4,
    question: 'Can you help with bottle and label design?',
    answer:
      'Absolutely. Our team provides end-to-end label design assistance to ensure your bottle perfectly matches your brand guidelines.',
  },
  {
    id: 5,
    question: 'Do you deliver across India?',
    answer:
      'Yes, we manage logistics and door-step delivery across all major cities and states in India.',
  },
];

/**
 * Reusable FAQSection Component
 * Configured with mobile-first stacked header layout matching image_82ff3e
 */
export default function FAQSection({
  tagText = 'FAQs',
  subtitle = 'Everything you need to know before bringing your brand to the bottle.',
  contactText = 'Contact Us',
  contactLink = '/contact',
  titleRow1 = 'QUESTIONS?',
  titleRow2 = "WE'VE GOT",
  titleOutlined = 'BOTTLES.',
  faqs = DEFAULT_FAQS,
  className = '',
}) {
  // State to track open accordion index (defaults to 0 open)
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className={`w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 font-fira relative ${className}`}>
      
      {/* ========================================================================
          MOBILE-ONLY HEADER STACK (Tag -> Title -> Subtitle -> Contact Button)
          ======================================================================== */}
      <div className="flex flex-col items-start text-left lg:hidden mb-8 sm:mb-10">
        
        {/* 1. Slanted "FAQs" Tag Badge */}
        {tagText && (
          <div className="mb-3 sm:mb-4">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              {tagText}
            </PillTag>
          </div>
        )}

        {/* 2. Main Title Stack */}
        <h2 className="m-0 flex flex-col items-start font-fira font-extrabold uppercase tracking-tight leading-[0.82] mb-4 sm:mb-6">
          {titleRow1 && (
            <span className="text-darkblue text-[44px] sm:text-[72px]">
              {titleRow1}
            </span>
          )}
          {titleRow2 && (
            <span className="text-darkblue text-[44px] sm:text-[72px] -mt-1">
              {titleRow2}
            </span>
          )}
          {titleOutlined && (
            <span
              className="text-[44px] sm:text-[72px] -mt-1 select-none"
              style={{
                WebkitTextStroke: '3px #101A35',
                color: 'transparent',
              }}
            >
              {titleOutlined}
            </span>
          )}
        </h2>

        {/* 3. Subtitle Text */}
        {subtitle && (
          <p className="max-w-xs sm:max-w-md font-fira font-normal text-darkblue/90 text-base sm:text-xl leading-snug tracking-tight m-0 mb-6 sm:mb-8">
            {subtitle}
          </p>
        )}

        {/* 4. Contact Us PillButton */}
        {contactLink && (
          <div>
            <PillButton
              to={contactLink}
              variant="dark"
              size="lg"
            >
              {contactText}
            </PillButton>
          </div>
        )}

      </div>

      {/* ========================================================================
          DESKTOP GRID & ACCORDION CARDS LAYOUT
          ======================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* LEFT COLUMN (DESKTOP ONLY): TAG, SUBTITLE & CONTACT US PILL BUTTON */}
        <div className="hidden lg:flex lg:col-span-4 flex-col items-start justify-between h-full lg:sticky lg:top-28">
          
          <div className="flex flex-col items-start text-left">
            {/* Slanted "FAQs" Tag Badge */}
            {tagText && (
              <div className="mb-4 sm:mb-6">
                <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
                  {tagText}
                </PillTag>
              </div>
            )}

            {/* Left Subtitle Text */}
            {subtitle && (
              <p className="max-w-xs font-fira font-normal text-darkblue/90 text-lg sm:text-xl lg:text-[22px] leading-snug tracking-tight m-0">
                {subtitle}
              </p>
            )}
          </div>

          {/* Contact Us PillButton */}
          {contactLink && (
            <div className="mt-10 sm:mt-16 lg:mt-32">
              <PillButton
                to={contactLink}
                variant="dark"
                size="lg"
              >
                {contactText}
              </PillButton>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: DISPLAY TITLE (DESKTOP ONLY) & ACCORDION CARDS */}
        <div className="lg:col-span-8 flex flex-col items-start text-left w-full">
          
          {/* Main Title Stack (Desktop Only) */}
          <h2 className="hidden lg:flex m-0 flex-col items-start font-fira font-extrabold uppercase tracking-tight leading-[0.82] mb-10 sm:mb-14">
            {titleRow1 && (
              <span className="text-darkblue text-[52px] sm:text-[84px] lg:text-[112px] xl:text-[128px]">
                {titleRow1}
              </span>
            )}
            {titleRow2 && (
              <span className="text-darkblue text-[52px] sm:text-[84px] lg:text-[112px] xl:text-[128px] -mt-1 sm:-mt-2">
                {titleRow2}
              </span>
            )}
            {titleOutlined && (
              <span
                className="text-[52px] sm:text-[84px] lg:text-[112px] xl:text-[128px] -mt-1 sm:-mt-2 select-none"
                style={{
                  WebkitTextStroke: '3.5px #101A35',
                  color: 'transparent',
                }}
              >
                {titleOutlined}
              </span>
            )}
          </h2>

          {/* Accordion Cards Stack */}
          <div className="w-full flex flex-col gap-3.5 sm:gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.id || idx}
                  className="w-full bg-[#93B5F6] text-darkblue rounded-[20px] sm:rounded-[24px] overflow-hidden transition-all duration-300 border border-darkblue/10"
                >
                  {/* Card Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-fira font-extrabold text-darkblue text-lg sm:text-xl lg:text-[22px] leading-tight uppercase tracking-tight">
                      {faq.question}
                    </span>

                    {/* Plus / Minus Circular Toggle Icon */}
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-darkblue text-cream flex items-center justify-center shrink-0 text-sm font-bold transition-transform duration-200">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Expanded Accordion Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                          <p className="font-fira font-normal text-darkblue/90 text-sm sm:text-base lg:text-lg leading-snug tracking-tight m-0">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}