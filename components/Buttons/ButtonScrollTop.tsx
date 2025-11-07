'use client';

import { ChevronUpIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import cn from '@/utils/cn';

const ButtonScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          type="button"
          className={cn(
            'ButtonScrollTop',
            'fixed z-50',
            'right-[15px]',
            'lg:right-[20px]',
            'bottom-[125px] lg:bottom-[100px]',
            'flex items-center justify-center',
            'h-[30px] w-[30px] lg:h-[45px] lg:w-[45px]',
            'bg-[#50c9ce] shadow-lg transition-all duration-300 hover:scale-110',
            'p-1 lg:p-3',
            // 'rounded-full',
            'rounded-[5px]',
            'text-white',
            'cursor-pointer',
          )}
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="h-[20px] w-[20px] lg:h-[25px] lg:w-[25px]" />
        </button>
      )}
    </>
  );
};

export default ButtonScrollTop;
