'use client';

import { useEffect, useState } from 'react';

interface DisplayState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

const useDisplay = (): DisplayState => {
  const [displayState, setDisplayState] = useState<DisplayState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDisplayState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setDisplayState({
        isMobile: width < 768, // Tailwind's md breakpoint
        isTablet: width >= 768 && width < 1024, // Tailwind's md to lg
        isDesktop: width >= 1024, // Tailwind's lg breakpoint and above
        width,
        height,
      });
    };

    // Set initial state
    updateDisplayState();

    // Add event listener
    window.addEventListener('resize', updateDisplayState);

    // Cleanup
    return () => window.removeEventListener('resize', updateDisplayState);
  }, []);

  return displayState;
};

export default useDisplay;
