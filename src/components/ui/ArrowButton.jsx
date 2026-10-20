import React from 'react';

const assets = "/assets";

export default function ArrowButton({
  children,
  href,
  dark = false,
  large = false,
}) {
  return (
    <a
      className={`arrow-button ${dark ? "arrow-button--dark" : ""} ${
        large ? "arrow-button--large" : ""
      }`}
      href={href}
    >
      <span>{children}</span>
      <img
        alt=""
        src={`${assets}/${large ? "c762b.svg" : "6614c.svg"}`}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </a>
  );
}