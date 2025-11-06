'use client';

import { useEffect, useState } from 'react';
import ButtonChat from '@/components/Buttons/ButtonChat';
import ListSwatches from '@/components/Lists/ListSwatches';
import cn from '@/utils/cn';

interface StickyBarWithScrollDetectionProps {
  swatches: Array<{ id: string; url: string }>;
  triggerId: string;
}

export default function StickyBarWithScrollDetection({
  swatches,
  triggerId,
}: StickyBarWithScrollDetectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const targetSection = document.getElementById(triggerId);
      if (targetSection) {
        const rect = targetSection.getBoundingClientRect();
        // Show sticky bar when the section comes into view (when top of section reaches top of viewport)
        const shouldShow = rect.top <= 0;
        setIsVisible(shouldShow);
      }
    };

    // Check initial position
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerId]);

  return (
    <div
      className={cn(
        'StickyBarWithScrollDetection',
        'py-[20px]',
        'transition-opacity duration-300',
        'bg-white/50 backdrop-blur-[5px]',
        'fixed z-[100]',
        'bottom-[0] lg:top-[0] lg:bottom-auto',
        'w-full',
        'shadow-xl',
        'max-w-100vw',

        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div className="container">
        <div className={cn('flex items-center justify-between')}>
          <div
            className={cn(
              'scrollbar-hide flex grow-0 items-center justify-between overflow-x-auto',
              'w-[50%] lg:w-[50%]',
            )}
          >
            <ListSwatches
              swatches={swatches}
              className={cn(
                '[&_img]:mb-[0px] [&_img]:size-[50px] [&_span]:hidden',
                '[&_li]:shadow-none',
                'gap-[15px] lg:gap-[30px]',
              )}
            />
          </div>
          <a
            // type="button"
            className={cn(
              'bg-[#333333]',
              'text-white',
              'text-[10px] lg:text-[16px]',
              'uppercase',
              'px-[10px] py-[10px] lg:px-[20px] lg:py-[10px]',
              'rounded-[10px]',
              'cursor-pointer',
              'mr-[10px] ml-auto lg:mr-[30px]',
            )}
            href="https://www.dreamsofa.com/book-an-appointment/#visitus"
          >
            Designer call
          </a>
          {/* <ButtonChat className="static" /> */}
        </div>
      </div>
    </div>
  );
}
