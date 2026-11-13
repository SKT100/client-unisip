import React, { useEffect, useRef, useState } from 'react';

// Generates a smooth, closed organic liquid splash hole inside a 1000x1000 viewBox
function buildLiquidCurtainPath(radius, time, wobbleAmp) {
  const outer = 'M -100 -100 H 1100 V 1100 H -100 Z';
  if (radius <= 0.5) return outer;

  const cx = 500;
  const cy = 500;
  const segments = 64;
  let inner = '';

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    // Multi-frequency harmonic waves for organic water splash tendrils
    const wave1 = Math.sin(theta * 5 + time * 0.007) * wobbleAmp;
    const wave2 = Math.cos(theta * 8 - time * 0.009) * (wobbleAmp * 0.65);
    const wave3 = Math.sin(theta * 13 + time * 0.013) * (wobbleAmp * 0.35);

    const r = Math.max(0, radius + wave1 + wave2 + wave3);
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);

    inner += i === 0 ? ` M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  return `${outer}${inner} Z`;
}

// Cubic ease-in-out helper
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Exponential ease-out for snappy splash burst
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function LiquidLoader({
  mode = 'initial', // 'initial' | 'transition'
  triggerKey = 0,
  onCovered,
  onComplete,
}) {
  const [visible, setVisible] = useState(true);

  // Direct DOM Refs for 120fps zero-re-render animation
  const darkCurtainRef = useRef(null);
  const midCurtainRef = useRef(null);
  const cyanCurtainRef = useRef(null);

  const centerStageRef = useRef(null);
  const displacementRef = useRef(null);
  const turbulenceRef = useRef(null);
  const frontWaveRef = useRef(null);
  const backWaveRef = useRef(null);
  const foamCrestRef = useRef(null);
  const percentTextRef = useRef(null);
  const splashBurstRef = useRef(null);

  // Callback refs to prevent effect restarts
  const onCoveredRef = useRef(onCovered);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCoveredRef.current = onCovered;
    onCompleteRef.current = onComplete;
  }, [onCovered, onComplete]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onCoveredRef.current?.();
      onCompleteRef.current?.();
      setVisible(false);
      return;
    }
    setVisible(true);
    document.body.style.overflow = 'hidden';

    let rafId;
    let coveredCalled = false;
    const startTime = performance.now();

    // Timings (ms): Initial load is fuller; route transitions are snappier
    const isInitial = mode === 'initial';
    const collapseDur = isInitial ? 0 : 220;     // Phase 1: Water collapses inward
    const fillDur = isInitial ? 850 : 240;      // Phase 2: TUII squiggles in & fills
    const dissolveDur = isInitial ? 500 : 350;   // Phase 3: Squiggle dissolve & splash open
    const totalDur = collapseDur + fillDur + dissolveDur;

    const maxRadius = 860; // Diagonal coverage for 1000x1000 viewBox

    const animateFrame = (now) => {
      const elapsed = now - startTime;

      // ======================================================================
      // PHASE 1: WATER COLLAPSES INWARD (Route Transition Entry)
      // ======================================================================
      if (elapsed < collapseDur) {
        const p = Math.min(1, elapsed / collapseDur);
        const eased = easeInOutCubic(p);
        const currentR = maxRadius * (1 - eased);
        // Wobble peaks mid-collapse
        const wobble = Math.sin(p * Math.PI) * 65;

        if (darkCurtainRef.current) {
          darkCurtainRef.current.setAttribute(
            'd',
            buildLiquidCurtainPath(currentR, now, wobble)
          );
        }
        if (midCurtainRef.current) {
          midCurtainRef.current.setAttribute(
            'd',
            buildLiquidCurtainPath(Math.max(0, currentR - 35 * Math.sin(p * Math.PI)), now + 150, wobble * 1.15)
          );
        }
        if (cyanCurtainRef.current) {
          cyanCurtainRef.current.setAttribute(
            'd',
            buildLiquidCurtainPath(Math.max(0, currentR - 70 * Math.sin(p * Math.PI)), now + 300, wobble * 1.3)
          );
        }

        // Keep center text hidden until water finishes collapsing to center
        if (centerStageRef.current) {
          centerStageRef.current.style.opacity = p > 0.75 ? String((p - 0.75) * 4) : '0';
          centerStageRef.current.style.transform = `scale(${0.85 + p * 0.15})`;
        }
      }

      // ======================================================================
      // PHASE 2: "TUII" CONDENSES FROM SQUIGGLE & FILLS WITH WATER
      // ======================================================================
      else if (elapsed < collapseDur + fillDur) {
        if (!coveredCalled) {
          coveredCalled = true;
          // Ensure curtains are 100% closed and trigger route swap underneath
          const closedPath = 'M -100 -100 H 1100 V 1100 H -100 Z';
          darkCurtainRef.current?.setAttribute('d', closedPath);
          midCurtainRef.current?.setAttribute('d', closedPath);
          cyanCurtainRef.current?.setAttribute('d', closedPath);
          if (onCoveredRef.current) onCoveredRef.current();
        }

        const fillElapsed = elapsed - collapseDur;
        const p = Math.min(1, fillElapsed / fillDur);

        // 1. Squiggle Condensation: Starts warped (scale 48) and settles to gentle liquid ripple (3)
        const entrySettle = Math.max(0, 1 - p * 3.2);
        const dispScale = 3 + entrySettle * 45;
        if (displacementRef.current) {
          displacementRef.current.setAttribute('scale', dispScale.toFixed(1));
        }
        if (turbulenceRef.current) {
          const freqX = (0.015 + Math.sin(now * 0.004) * 0.003).toFixed(4);
          const freqY = (0.045 + Math.cos(now * 0.005) * 0.006).toFixed(4);
          turbulenceRef.current.setAttribute('baseFrequency', `${freqX} ${freqY}`);
        }

        // 2. Center Stage Visibility
        if (centerStageRef.current) {
          centerStageRef.current.style.opacity = '1';
          centerStageRef.current.style.transform = 'scale(1)';
        }
        if (splashBurstRef.current) {
          splashBurstRef.current.style.opacity = '0';
        }

        // 3. Rising Water Wave Level inside TUII ClipPath
        // Y goes from 145 (empty bottom) to -25 (100% submerged)
        const waveY = 145 - easeInOutCubic(p) * 170;
        const waveShiftFront = -((now * 0.22) % 400);
        const waveShiftBack = -400 + ((now * 0.16) % 400);

        if (frontWaveRef.current) {
          frontWaveRef.current.setAttribute('transform', `translate(${waveShiftFront.toFixed(1)}, ${waveY.toFixed(1)})`);
        }
        if (foamCrestRef.current) {
          foamCrestRef.current.setAttribute('transform', `translate(${waveShiftFront.toFixed(1)}, ${waveY.toFixed(1)})`);
        }
        if (backWaveRef.current) {
          backWaveRef.current.setAttribute('transform', `translate(${waveShiftBack.toFixed(1)}, ${(waveY - 5).toFixed(1)})`);
        }

        // 4. Percentage Telemetry
        if (percentTextRef.current) {
          percentTextRef.current.textContent = `${String(Math.floor(p * 100)).padStart(2, '0')}%`;
        }
      }

      // ======================================================================
      // PHASE 3: SQUIGGLE DISSOLVE & SPLASH OUTWARD TO REVEAL NEXT PAGE
      // ======================================================================
      else if (elapsed < totalDur) {
        const dissolveElapsed = elapsed - (collapseDur + fillDur);
        const p = Math.min(1, dissolveElapsed / dissolveDur);
        const eased = easeOutExpo(p);

        // 1. TUII Text Squiggle Dissolve & Splash Apart
        const dissolveSquiggle = 3 + p * 95;
        if (displacementRef.current) {
          displacementRef.current.setAttribute('scale', dissolveSquiggle.toFixed(1));
        }

        if (centerStageRef.current) {
          const textOpacity = Math.max(0, 1 - p * 2.4);
          const textScale = 1 + p * 0.24;
          centerStageRef.current.style.opacity = textOpacity.toFixed(3);
          centerStageRef.current.style.transform = `scale(${textScale.toFixed(3)})`;
        }

        // 2. Splash Droplets & Squiggle Rings Burst Outward
        if (splashBurstRef.current) {
          const burstOpacity = p < 0.2 ? p * 5 : Math.max(0, 1 - (p - 0.2) * 1.4);
          const burstScale = 0.4 + eased * 2.2;
          splashBurstRef.current.style.opacity = burstOpacity.toFixed(3);
          splashBurstRef.current.style.transform = `translate(-50%, -50%) scale(${burstScale.toFixed(3)})`;
        }

        // 3. Organic Liquid Curtain Splashes Open from Center
        const currentR = maxRadius * eased;
        const wobble = Math.sin(p * Math.PI) * 80;

        if (darkCurtainRef.current) {
          darkCurtainRef.current.setAttribute(
            'd',
            buildLiquidCurtainPath(currentR, now, wobble)
          );
        }
        if (midCurtainRef.current) {
          midCurtainRef.current.setAttribute(
            'd',
            buildLiquidCurtainPath(Math.max(0, currentR - 42 * (1 - p)), now + 120, wobble * 1.2)
          );
        }
        if (cyanCurtainRef.current) {
          cyanCurtainRef.current.setAttribute(
            'd',
            buildLiquidCurtainPath(Math.max(0, currentR - 85 * (1 - p)), now + 240, wobble * 1.4)
          );
        }
      }

      // ======================================================================
      // COMPLETE & UNMOUNT
      // ======================================================================
      else {
        document.body.style.overflow = '';
        setVisible(false);
        if (onCompleteRef.current) onCompleteRef.current();
        return;
      }

      rafId = requestAnimationFrame(animateFrame);
    };

    rafId = requestAnimationFrame(animateFrame);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = '';
    };
  }, [mode, triggerKey]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none select-none font-fira overflow-hidden"
      aria-hidden="true"
    >
      {/* ====================================================================
          1. MULTI-LAYERED ORGANIC LIQUID SPLASH CURTAIN
          ==================================================================== */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Layer 1: Leading Cyan Splash Rim */}
        <path
          ref={cyanCurtainRef}
          fill="#39b8f2"
          fillRule="evenodd"
          d="M -100 -100 H 1100 V 1100 H -100 Z"
        />
        {/* Layer 2: Secondary Midblue Wave Rim */}
        <path
          ref={midCurtainRef}
          fill="#22649b"
          fillRule="evenodd"
          d="M -100 -100 H 1100 V 1100 H -100 Z"
        />
        {/* Layer 3: Main Deep Obsidian Water Body */}
        <path
          ref={darkCurtainRef}
          fill="#090F1F"
          fillRule="evenodd"
          d="M -100 -100 H 1100 V 1100 H -100 Z"
        />
      </svg>

      {/* ====================================================================
          2. RADIAL SPLASH DROPLETS & SQUIGGLE RINGS (BURSTS ON DISSOLVE)
          ==================================================================== */}
      <div
        ref={splashBurstRef}
        style={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0.4)' }}
        className="absolute left-1/2 top-1/2 w-[55vmin] h-[55vmin] pointer-events-none will-change-transform"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {/* Squiggly Splash Ring */}
          <path
            d="M 100 15 C 125 12, 148 25, 165 42 C 185 62, 190 88, 182 115 C 175 142, 158 168, 132 180 C 105 192, 75 186, 50 172 C 25 158, 12 130, 15 100 C 18 70, 35 40, 62 24 C 75 16, 88 17, 100 15 Z"
            fill="none"
            stroke="#39b8f2"
            strokeWidth="3.5"
            strokeDasharray="18 12"
          />
          {/* Splash Droplets */}
          <circle cx="100" cy="4" r="5" fill="#7ee0ff" />
          <circle cx="172" cy="30" r="6.5" fill="#39b8f2" />
          <circle cx="196" cy="100" r="4.5" fill="#f5f4ef" />
          <circle cx="168" cy="170" r="6" fill="#39b8f2" />
          <circle cx="100" cy="196" r="5" fill="#22649b" />
          <circle cx="30" cy="168" r="6.5" fill="#7ee0ff" />
          <circle cx="4" cy="100" r="5" fill="#39b8f2" />
          <circle cx="32" cy="32" r="4.5" fill="#f5f4ef" />
        </svg>
      </div>

      {/* ====================================================================
          3. CENTER STAGE: SQUIGGLE-FILTERED "TUII" WATER FILL WORDMARK
          ==================================================================== */}
      <div
        ref={centerStageRef}
        className="relative w-full h-full flex flex-col items-center justify-center will-change-transform"
      >
        <div className="relative w-[90vw] max-w-[480px] sm:max-w-[620px] lg:max-w-[760px] aspect-[800/220] flex items-center justify-center">
          <svg
            viewBox="0 0 800 220"
            className="w-full h-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* SVG Squiggle / Liquid Turbulence Filter */}
              <filter id="TUII-liquid-squiggle" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  ref={turbulenceRef}
                  type="fractalNoise"
                  baseFrequency="0.016 0.045"
                  numOctaves="2"
                  seed="8"
                  result="noise"
                />
                <feDisplacementMap
                  ref={displacementRef}
                  in="SourceGraphic"
                  in2="noise"
                  scale="25"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              {/* TUII Lettering Mask */}
              <clipPath id="TUII-letter-mask">
                <path d="M6,3 382,3 384,5 384,43 382,45 339,32 294,22 249,16 218,16 218,496 218,657 216,659 168,659 166,656 166,16 134,16 98,21 63,28 5,45 3,44 3,6ZM827,77 841,79 849,83 859,93 864,105 864,118 858,132 848,141 839,145 831,146 820,145 807,139 799,130 794,116 795,103 801,91 809,83 817,79ZM719,79 735,80 745,85 753,92 759,106 759,121 754,133 743,143 731,147 718,147 707,143 697,135 690,120 690,107 695,94 704,85ZM369,175 418,175 420,177 420,181 415,189 407,211 394,238 386,263 380,275 351,364 343,398 336,440 333,476 334,506 341,545 348,564 359,586 370,602 384,617 386,617 395,626 414,637 440,645 464,646 489,641 514,631 540,614 560,595 560,593 565,589 580,569 583,561 587,557 597,538 608,505 609,186 612,184 659,184 661,186 661,307 662,454 660,659 609,659 607,554 605,554 593,577 572,605 539,635 533,637 523,645 509,652 486,660 468,664 426,665 401,660 376,651 357,640 345,631 338,623 336,623 320,605 309,589 292,551 285,522 283,500 283,473 286,433 294,382 303,344 333,253 361,186 365,178ZM807,183 853,183 858,186 858,657 854,659 804,659 801,656 801,188ZM705,184 754,184 756,186 756,657 752,660 704,660 701,658 701,186Z" transform="translate(309 30) scale(.21)" fillRule="evenodd" />
              </clipPath>

              {/* Vibrant Hydration Gradient */}
              <linearGradient id="TUII-water-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#101a35" />
                <stop offset="40%" stopColor="#22649b" />
                <stop offset="85%" stopColor="#39b8f2" />
                <stop offset="100%" stopColor="#8ce6ff" />
              </linearGradient>
            </defs>

            {/* Filtered Group: Squiggles on Entry, Shimmers on Fill, Dissolves on Exit */}
            <g filter="url(#TUII-liquid-squiggle)">
              
              {/* Ghost Letter Outline */}
              <path d="M6,3 382,3 384,5 384,43 382,45 339,32 294,22 249,16 218,16 218,496 218,657 216,659 168,659 166,656 166,16 134,16 98,21 63,28 5,45 3,44 3,6ZM827,77 841,79 849,83 859,93 864,105 864,118 858,132 848,141 839,145 831,146 820,145 807,139 799,130 794,116 795,103 801,91 809,83 817,79ZM719,79 735,80 745,85 753,92 759,106 759,121 754,133 743,143 731,147 718,147 707,143 697,135 690,120 690,107 695,94 704,85ZM369,175 418,175 420,177 420,181 415,189 407,211 394,238 386,263 380,275 351,364 343,398 336,440 333,476 334,506 341,545 348,564 359,586 370,602 384,617 386,617 395,626 414,637 440,645 464,646 489,641 514,631 540,614 560,595 560,593 565,589 580,569 583,561 587,557 597,538 608,505 609,186 612,184 659,184 661,186 661,307 662,454 660,659 609,659 607,554 605,554 593,577 572,605 539,635 533,637 523,645 509,652 486,660 468,664 426,665 401,660 376,651 357,640 345,631 338,623 336,623 320,605 309,589 292,551 285,522 283,500 283,473 286,433 294,382 303,344 333,253 361,186 365,178ZM807,183 853,183 858,186 858,657 854,659 804,659 801,656 801,188ZM705,184 754,184 756,186 756,657 752,660 704,660 701,658 701,186Z" transform="translate(309 30) scale(.21)" fill="rgba(245,244,239,0.08)" stroke="rgba(245,244,239,0.28)" strokeWidth="2.5" fillRule="evenodd" />

              {/* Rising Water Waves Clipped Inside "TUII" */}
              <g clipPath="url(#TUII-letter-mask)">
                {/* Back Deep Wave */}
                <path
                  ref={backWaveRef}
                  d="M 0 0 Q 100 24, 200 0 T 400 0 T 600 0 T 800 0 T 1000 0 T 1200 0 V 320 H 0 Z"
                  fill="#22649b"
                  opacity="0.65"
                  transform="translate(0, 145)"
                />

                {/* Front Cyan Liquid Wave */}
                <path
                  ref={frontWaveRef}
                  d="M 0 0 Q 100 -24, 200 0 T 400 0 T 600 0 T 800 0 T 1000 0 T 1200 0 V 320 H 0 Z"
                  fill="url(#TUII-water-grad)"
                  transform="translate(0, 145)"
                />

                {/* White Water Crest Foam */}
                <path
                  ref={foamCrestRef}
                  d="M 0 0 Q 100 -24, 200 0 T 400 0 T 600 0 T 800 0 T 1000 0 T 1200 0"
                  fill="none"
                  stroke="#f5f4ef"
                  strokeWidth="4"
                  strokeOpacity="0.85"
                  transform="translate(0, 145)"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* Bottom Telemetry Bar */}
        <div className="flex items-center justify-between w-[88vw] max-w-[460px] sm:max-w-[580px] lg:max-w-[700px] px-2 mt-2 sm:mt-4 text-cream/75 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
          <span className="text-cyanglow tracking-[0.24em]">
            #BOTTLEYOURBRAND
          </span>
          <span ref={percentTextRef} className="tabular-nums text-cream font-black">
            00%
          </span>
        </div>
      </div>
    </div>
  );
}