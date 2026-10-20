import React from 'react';
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandX,
  IconShare,
} from '@tabler/icons-react';

// Tabler Icon Mapping Helper
function CardIcon({ type, className = 'w-6 h-6' }) {
  switch (type) {
    case 'x':
    case 'twitter':
      return <IconBrandX className={className} stroke={1.8} />;
    case 'instagram':
      return <IconBrandInstagram className={className} stroke={1.8} />;
    case 'facebook':
      return <IconBrandFacebook className={className} stroke={1.8} />;
    case 'email':
    case 'mail':
      return <IconMail className={className} stroke={1.8} />;
    case 'phone':
      return <IconPhone className={className} stroke={1.8} />;
    case 'address':
    case 'location':
      return <IconMapPin className={className} stroke={1.8} />;
    default:
      return <IconShare className={className} stroke={1.8} />;
  }
}

export default function ActionCard({
  title = '',
  variant = 'light', // 'light' (Blog Share) | 'dark' (Contact Sidebar)
  badgeHeader = false,
  items = [],
  className = '',
}) {
  const isLight = variant === 'light';

  // Stacked header format for "LET'S MAKE IT HAPPEN"
  const formattedTitle =
    title === "LET'S MAKE IT HAPPEN" ? (
      <>
        LET'S MAKE IT
        <br />
        HAPPEN
      </>
    ) : (
      title
    );

  return (
    <div
      className={`rounded-[32px] sm:rounded-[40px] p-6 sm:p-8 flex flex-col items-center font-fira transition-all duration-300 ${
        isLight
          ? 'bg-cream/80 border border-darkblue/10 text-darkblue shadow-sm'
          : 'bg-midblue text-cream shadow-2xl'
      } ${className}`}
    >
      {/* Title Header */}
      {title && (
        <div className="mb-7 w-full flex justify-center">
          {badgeHeader ? (
            /* Dark Navy Badge Container */
            <div className="w-full bg-darkblue text-cream rounded-[24px] sm:rounded-[28px] py-4 px-6 text-center ">
              <h3 className="font-fira font-extrabold text-2xl sm:text-3xl lg:text-[32px] leading-[0.9] uppercase tracking-tight m-0 text-white">
                {formattedTitle}
              </h3>
            </div>
          ) : (
            <h3 className="font-fira font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-darkblue m-0">
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Items List */}
      <div className="w-full flex flex-col gap-5">
        {items.map((item, index) => {
          const isLink = Boolean(item.href);
          const Component = isLink ? 'a' : 'div';

          return (
            <React.Fragment key={index}>
              {isLight ? (
                /* Share Post Variant: Full-width Cream Pill Buttons */
                <Component
                  href={item.href}
                  target={isLink && item.href.startsWith('http') ? '_blank' : undefined}
                  rel={isLink && item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-full bg-cream hover:bg-darkblue hover:text-cream text-darkblue font-fira font-bold text-base sm:text-lg py-3.5 px-6 rounded-full flex items-center justify-center gap-3 transition-colors duration-200 shadow-sm group select-none cursor-pointer"
                >
                  {item.icon && (
                    <CardIcon
                      type={item.icon}
                      className="w-5 h-5 text-darkblue group-hover:text-cream transition-colors shrink-0"
                    />
                  )}
                  <span>{item.label}</span>
                </Component>
              ) : (
                /* Contact Sidebar Variant: Solid Light Circle + Tabler Icons */
                <Component
                  href={item.href}
                  className={`flex items-start gap-4 text-left p-1 transition-colors ${
                    isLink ? 'hover:text-cyanglow cursor-pointer' : ''
                  }`}
                >
                  {item.icon && (
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#E2E8F0] text-[#101A35] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <CardIcon type={item.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-[#101A35]" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-fira font-bold text-xl sm:text-2xl lg:text-[25px] leading-tight text-white tracking-wide">
                      {item.label}
                    </span>
                    {item.subtext && (
                      <span className="font-fira font-medium text-lg sm:text-xl lg:text-[22px] leading-snug text-white/95 mt-0.5 tracking-wide whitespace-pre-line">
                        {item.subtext}
                      </span>
                    )}
                  </div>
                </Component>
              )}

              {/* Dashed Separator */}
              {item.dividerAfter && (
                <div className="w-full my-1">
                  <svg
                    className="w-full h-1 text-white/40"
                    viewBox="0 0 400 4"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <line
                      x1="0"
                      y1="2"
                      x2="400"
                      y2="2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}