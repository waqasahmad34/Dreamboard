import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSliderProgressOptions {
  items: { id: number | string }[];
  gap?: number;
}

interface UseSliderProgressReturn {
  visibleSlides: number[];
  navigateToSlide: (index: number) => void;
  sliderContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const useSliderProgress = ({
  items,
  gap = 20,
}: UseSliderProgressOptions): UseSliderProgressReturn => {
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([]);

  // Navigate to specific slide by index
  const navigateToSlide = useCallback(
    (index: number) => {
      if (sliderContainerRef.current) {
        const container = sliderContainerRef.current;

        // Get actual DOM element widths
        const firstSlideElement = container.children[0] as HTMLElement;
        const firstContentSlide = container.children[1] as HTMLElement;

        if (!firstSlideElement || !firstContentSlide) return;

        const firstSlideWidth = firstSlideElement.offsetWidth + gap;
        const contentSlideWidth = firstContentSlide.offsetWidth + gap;

        // Calculate target scroll position
        const targetScroll = firstSlideWidth + index * contentSlideWidth;

        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth',
        });
      }
    },
    [gap],
  );

  // Progress bar handler - calculate which slides are visible on screen
  const handleScroll = useCallback(() => {
    if (sliderContainerRef.current && items.length > 0) {
      const container = sliderContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const viewportStart = scrollLeft;
      const viewportEnd = scrollLeft + containerWidth;

      const visibleSlidesArray: number[] = [];
      let currentPosition = 0;

      // Check each slide to see if it's visible
      for (let i = 0; i < container.children.length; i++) {
        const slideElement = container.children[i] as HTMLElement;
        if (!slideElement) continue;

        const slideWidth = slideElement.offsetWidth + gap;
        const slideStart = currentPosition;
        const slideEnd = currentPosition + slideWidth;

        // Check if slide overlaps with viewport (skip the first spacer slide)
        if (i > 0 && slideStart < viewportEnd && slideEnd > viewportStart) {
          visibleSlidesArray.push(i - 1); // -1 because we skip the spacer
        }

        currentPosition += slideWidth;
      }

      setVisibleSlides(visibleSlidesArray);
    }
  }, [items.length, gap]);

  // Add scroll event listener for progress bar
  useEffect(() => {
    const container = sliderContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial calculation
      handleScroll();

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  return {
    visibleSlides,
    navigateToSlide,
    sliderContainerRef,
  };
};
