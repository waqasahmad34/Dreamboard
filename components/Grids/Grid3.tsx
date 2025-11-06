import Image from 'next/image';
import { useEffect, useState } from 'react';
import cn from '@/utils/cn';

type TComponentProps = {
  data: {
    room_style_string: string;
    swatch_url: string;
    swatch_filename_string: string;
    final_room_url: string;
    styled_product_url: string;
    portrait: string;
    product_filename_string: string;
    colorPalette?: string[];
    colorPalleteFirstItem?: string;
    mood_board_url: string;
    sofa_type: string;
  };
};

const Grid3 = ({ data }: TComponentProps) => {
  // console.log(data);
  const final_room_url = data?.final_room_url;
  const styled_product_url = data?.styled_product_url;
  const mood_board_url = data?.mood_board_url;

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Base dimensions for the popup (what it should be at 100% scale)
        const baseWidth = 1350; // Adjusted base popup width for narrower side panel
        const baseHeight = 640;  // Base popup height
        
        // Calculate scale factors for both width and height
        const scaleX = Math.min(1, (viewportWidth * 0.9) / baseWidth);
        const scaleY = Math.min(1, (viewportHeight * 0.85) / baseHeight);
        
        // Use the smaller scale to ensure popup fits in both dimensions
        const finalScale = Math.min(scaleX, scaleY, 1);
        
        setScale(finalScale);
      } else {
        setScale(1); // No scaling on mobile
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return (
    <div
      className={cn(
        'Grid3',
        'bg-white/10 backdrop-blur-[16px]',
        'p-[20px]',
        'rounded-[16px]',
        'flex flex-col lg:flex-row',
        'gap-[20px]',
        // Mobile: full width
        'w-full',
        // Desktop: adjusted width for narrower side panel
        'lg:w-[1350px] lg:h-[640px]',
        'lg:origin-center', // Scale from center
      )}
      style={{
        // Apply proportional scaling on desktop only
        transform: typeof window !== 'undefined' && window.innerWidth >= 1024 
          ? `scale(${scale})` 
          : 'none',
        transformOrigin: 'center center',
      }}
    >
      {/* Main room image - maintains aspect ratio */}
      <div
        className={cn(
          'rounded-[16px]',
          'overflow-hidden',
          // Mobile: maintain aspect ratio (don't change)
          'w-full aspect-[1536/1024]',
          // Desktop: optimized size within the scaled container
          'lg:aspect-[1536/1024] lg:w-[900px] lg:h-[580px]',
          'lg:flex-shrink-0',
        )}
      >
        <Image
          src={final_room_url}
          alt="Final Room"
          className="w-full h-full object-contain"
          width={1536}
          height={1024}
        />
      </div>

      {/* Side panel with mood board and styled product */}
      <div
        className={cn(
          'flex flex-row lg:flex-col',
          'gap-[20px]',
          // Mobile: full width (don't change)
          'w-full',
          // Desktop: narrower width to properly contain images
          'lg:w-[235px] lg:h-[580px] lg:flex-shrink-0',
        )}
      >
        {/* Mood board - portrait orientation */}
        <div
          className={cn(
            'flex-1',
            'rounded-[16px]',
            'overflow-hidden',
            'bg-white', // White background for mobile
            // Mobile: maintain aspect ratio (don't change)
            'aspect-[1024/1536]',
            // Desktop: reduced mood board size to make room for product image
            'lg:w-full lg:h-[350px] lg:flex-none',
          )}
        >
          <Image
            src={mood_board_url}
            alt="Mood Board"
            className="w-full h-full object-contain" // Always use object-contain to prevent cutoff
            width={1024}
            height={1536}
          />
        </div>

        {/* Styled product - landscape orientation */}
        <div
          className={cn(
            'flex-1',
            'rounded-[16px]',
            'overflow-hidden',
            'bg-white', // White background fills remaining space
            // Mobile: maintain aspect ratio and center image
            'aspect-[1536/1024]',
            'flex items-center justify-center', // Center image on both mobile and desktop
            // Desktop: fixed size for product image with white space
            'lg:w-full lg:h-[210px] lg:flex-none',
          )}
        >
          <Image
            src={styled_product_url}
            alt="Styled Product"
            className="object-contain max-w-[80%] max-h-[80%]" // Shrink image on both mobile and desktop
            width={1536}
            height={1024}
          />
        </div>
      </div>
    </div>
  );
};

export default Grid3;
