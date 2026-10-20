import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const images = '/images';

const VARIANTS = {
  light: {
    base: 'bg-[#F5F4EF] border-[#101A35]/10',
    fill: 'bg-[#101A35]',
    text: 'text-[#101A35] group-hover:text-[#F5F4EF]',
    icon: 'bg-[#101A35] group-hover:bg-[#39B8F2]',
    iconImg: 'group-hover:brightness-0',
  },
  dark: {
    base: 'bg-[#101A35] border-white/10',
    fill: 'bg-[#39B8F2]',
    text: 'text-[#F5F4EF] group-hover:text-[#101A35]',
    icon: 'bg-[#F5F4EF] group-hover:bg-[#101A35]',
    iconImg: 'brightness-0 group-hover:invert', // Fixes white-on-white SVG blending
  },
  cyan: {
    base: 'bg-[#39B8F2] border-[#101A35]/10',
    fill: 'bg-[#101A35]',
    text: 'text-[#101A35] group-hover:text-[#F5F4EF]',
    icon: 'bg-[#101A35] group-hover:bg-[#F5F4EF]',
    iconImg: 'group-hover:brightness-0',
  },
  outline: {
    base: 'bg-transparent border-[#101A35]/30',
    fill: 'bg-[#101A35]',
    text: 'text-[#101A35] group-hover:text-[#F5F4EF]',
    icon: 'bg-[#101A35] group-hover:bg-[#39B8F2]',
    iconImg: 'group-hover:brightness-0',
  },
};

const ALIASES = { navbar: 'light', primary: 'dark' };

const SIZES = {
  sm: { box: 'min-h-[38px] px-4 text-xs gap-2', iconPx: 20 },
  md: { box: 'min-h-[44px] px-5 text-xs sm:text-sm gap-2.5', iconPx: 24 },
  lg: { box: 'min-h-[56px] px-7 text-base gap-3', iconPx: 32 },
};

function PillButton({
  children,
  onClick,
  className = '',
  variant = 'light',
  size = 'md',
  fullWidth = false,
  logo,
  icon,
  iconSize,
  iconClassName = '',
  showIcon = true,
  href,
  to,
  target,
  rel,
  type = 'button',
  ...props
}) {
  const v = VARIANTS[ALIASES[variant] ?? variant] ?? VARIANTS.light;
  const s = SIZES[size] ?? SIZES.md;
  const iconPx = iconSize ?? s.iconPx;

  // Uses correct public path fallback
  const activeLogo = logo ?? icon ?? `${images}/logo/bottle-logo-mini.svg`;
  const isImageIcon = typeof activeLogo === 'string' && (activeLogo.includes('/') || activeLogo.includes('.'));

  const classes = [
    'group relative isolate inline-flex items-center justify-center overflow-hidden whitespace-nowrap',
    'rounded-full border font-fira font-bold uppercase leading-none tracking-wider no-underline',
    'cursor-pointer select-none shadow-sm transition-[transform,box-shadow] duration-300',
    'hover:scale-[1.02] hover:shadow-md active:scale-[0.98] motion-reduce:transition-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39B8F2]',
    s.box,
    v.base,
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-100 motion-reduce:transition-none ${v.fill}`}
      />
      <span className={`inline-flex items-center justify-center gap-[inherit] transition-colors duration-300 ${v.text}`}>
        <span>{children}</span>
        {showIcon && activeLogo && (
          <span
            aria-hidden="true"
            style={{ width: iconPx, height: iconPx, padding: Math.round(iconPx * 0.2) }}
            className={`flex shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${v.icon}${iconClassName}`}
          >
            {isImageIcon ? (
              <img
                src={activeLogo}
                alt=""
                className={`h-full w-full object-contain transition-[filter] duration-300 ${v.iconImg}`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/logo/bottle-logo-mini.svg';
                }}
              />
            ) : (
              activeLogo
            )}
          </span>
        )}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...props}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {inner}
    </button>
  );
}

export default memo(PillButton);