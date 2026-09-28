import { useState, useEffect, useRef } from 'react';

interface CinemaFrameOptions {
  aspectRatio?: number; // 16/9 by default = 1.7777777777777777
  reservedTop?: number; // e.g. 56px for TopNav
  reservedBottom?: number; // e.g. 64px for bottom delegation drawer & iPad home bar
  horizontalPadding?: number; // e.g. 16px
  verticalPadding?: number; // e.g. 12px
}

export function useCinemaFrame(options: CinemaFrameOptions = {}) {
  const {
    aspectRatio = 16 / 9,
    reservedTop = 56,
    reservedBottom = 64,
    horizontalPadding = 16,
    verticalPadding = 12,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 960,
    height: 540,
    isReady: false,
    isPortrait: false,
  });

  useEffect(() => {
    const updateSize = () => {
      // Get actual viewport window size
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const isPortrait = winH > winW;

      // Available space taking navbar, bottom drawer, and safe areas into account
      const availableW = Math.max(280, winW - horizontalPadding * 2);
      const availableH = Math.max(180, winH - reservedTop - reservedBottom - verticalPadding * 2);

      let w = availableW;
      let h = w / aspectRatio;

      // If calculated height exceeds available height, scale by height instead
      if (h > availableH) {
        h = availableH;
        w = h * aspectRatio;
      }

      setDimensions({
        width: Math.floor(w),
        height: Math.floor(h),
        isReady: true,
        isPortrait,
      });
    };

    updateSize();

    // Listen to resize, orientation change and visualViewport changes (for iOS/iPad dynamic bars)
    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', updateSize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateSize);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('orientationchange', updateSize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateSize);
      }
    };
  }, [aspectRatio, reservedTop, reservedBottom, horizontalPadding, verticalPadding]);

  return { containerRef, dimensions };
}
