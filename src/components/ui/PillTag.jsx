import React from 'react';

/**
 * Reusable UniSip Pill Tag / Badge Component
 * 
 * @param {React.ReactNode} children - Text or content inside the pill
 * @param {'dark'|'light'|'blue'|'cyan'} variant - Preset background & text colors
 * @param {'sm'|'md'|'lg'} size - Font & padding scale presets
 * @param {string} rotate - Tailwind rotation class (e.g. '-rotate-[3deg]', 'rotate-0')
 * @param {string} className - Additional custom Tailwind classes
 */
export default function PillTag({
  children,
  variant = 'dark',
  size = 'md',
  rotate = '-rotate-[3deg]',
  className = '',
}) {
  const variantStyles = {
    dark: 'bg-darkblue text-cream',
    light: 'bg-cream text-darkblue border border-darkblue/20',
    blue: 'bg-[#2D468A] text-cream',
    cyan: 'bg-cyanglow text-darkblue',
  };

  const sizeStyles = {
    sm: 'text-xs sm:text-sm px-3.5 py-1',
    md: 'text-base sm:text-xl lg:text-2xl px-5 py-1 sm:px-6 sm:py-1.5',
    lg: 'text-xl sm:text-2xl lg:text-3xl px-6 py-1.5 sm:px-8 sm:py-2',
  };

  return (
    <span
      className={`inline-block font-fira font-extrabold uppercase tracking-wide rounded-full shadow-none select-none ${
        variantStyles[variant] || variantStyles.dark
      } ${sizeStyles[size] || sizeStyles.md} ${rotate} ${className}`}
    >
      {children}
    </span>
  );
}