import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary'
  icon,
  href,
  className = '',
  ...props
}) {
  const baseStyles =
    "min-h-[48px] px-7 inline-flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm focus-visible:outline-2 focus-visible:outline-[#39B8F2] cursor-pointer";

  const variants = {
    primary:
      "text-white bg-[#101A35] hover:bg-[#173B8F]",
    secondary:
      "text-[#111827] bg-transparent border border-[rgba(16,26,53,0.32)] hover:border-[#111827] hover:bg-[rgba(16,26,53,0.04)]",
  };

  const iconCircleStyles = {
    primary:
      "w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] text-white shrink-0",
    secondary:
      "w-5 h-5 rounded-full bg-[#101A35]/10 flex items-center justify-center text-[10px] text-[#101A35] shrink-0",
  };

  const defaultIcon = variant === 'primary' ? '➔' : '↓';
  const displayIcon = icon !== undefined ? icon : defaultIcon;

  const content = (
    <>
      <span>{children}</span>
      {displayIcon && (
        <span className={iconCircleStyles[variant] || iconCircleStyles.primary}>
          {displayIcon}
        </span>
      )}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        to={href}
        className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}