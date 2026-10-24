import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PillTag from '../../ui/PillTag';
import PillButton from '../../ui/PillButton';

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
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className={`w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 font-fira relative ${className}`}>
      
      {/* ========================================================================
          MOBILE-ONLY HEADER STACK
          ======================================================================== */}
      <div className="flex flex-col items-start text-left lg:hidden mb-8 sm:mb-10">
        {tagText && (
          <div className="mb-3 sm:mb-4">
            <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
              {tagText}
            </PillTag>
          </div>
        )}

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

        {subtitle && (
          <p className="max-w-xs sm:max-w-md font-fira font-normal text-darkblue/90 text-base sm:text-xl leading-snug tracking-tight m-0 mb-6 sm:mb-8">
            {subtitle}
          </p>
        )}

        {contactLink && (
          <div>
            <PillButton to={contactLink} variant="dark" size="lg">
              {contactText}
            </PillButton>
          </div>
        )}
      </div>

      {/* ========================================================================
          DESKTOP GRID & ACCORDION CARDS LAYOUT
          ======================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column (Sticky Desktop) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col items-start justify-between h-full lg:sticky lg:top-28">
          <div className="flex flex-col items-start text-left">
            {tagText && (
              <div className="mb-4 sm:mb-6">
                <PillTag variant="dark" size="md" rotate="-rotate-[3deg]">
                  {tagText}
                </PillTag>
              </div>
            )}

            {subtitle && (
              <p className="max-w-xs font-fira font-normal text-darkblue/90 text-lg sm:text-xl lg:text-[22px] leading-snug tracking-tight m-0">
                {subtitle}
              </p>
            )}
          </div>

          {contactLink && (
            <div className="mt-10 sm:mt-16 lg:mt-32">
              <PillButton to={contactLink} variant="dark" size="lg">
                {contactText}
              </PillButton>
            </div>
          )}
        </div>

        {/* Right Column: Restored Initial Stacked Heading & Cards */}
        <div className="lg:col-span-8 flex flex-col items-start text-left w-full">
          
          {/* Main Title Stack (Desktop) */}
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
                  className="w-full bg-[#93B5F6] text-darkblue rounded-[20px] sm:rounded-[24px] overflow-hidden border border-darkblue/10"
                >
                  {/* Card Header Button (No hover color shifting) */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-fira font-extrabold text-darkblue text-lg sm:text-xl lg:text-[22px] leading-tight uppercase tracking-tight">
                      {faq.question}
                    </span>

                    {/* Prominent Circular Toggle with Enlarged SVG Symbol */}
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#101a35] text-[#f5f4ef] flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 stroke-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      >
                        {/* Horizontal Bar */}
                        <line x1="4" y1="12" x2="20" y2="12" />
                        
                        {/* Vertical Bar (Morphs cleanly into minus) */}
                        <motion.line
                          x1="12"
                          y1="4"
                          x2="12"
                          y2="20"
                          initial={false}
                          animate={{
                            scaleY: isOpen ? 0 : 1,
                            opacity: isOpen ? 0 : 1,
                          }}
                          transition={{
                            duration: 0.22,
                            ease: 'easeInOut',
                          }}
                          style={{ originX: '12px', originY: '12px' }}
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Smooth Accordion Body (Zero-Jitter Container) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.22, delay: 0.08, ease: 'easeOut' },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.26, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.14, ease: 'easeIn' },
                          },
                        }}
                        className="overflow-hidden"
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