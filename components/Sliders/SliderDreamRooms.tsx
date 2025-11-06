import Image from 'next/image';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import DialogRadix from '@/components/DialogRadix';
import ListColorsAndSwatches from '@/components/Lists/ListColorsAndSwatches';
import ListShareSocial from '@/components/Lists/ListShareSocial';
import { useSliderProgress } from '@/components/Sliders/SliderProgressBar/hooks/useSliderProgress';
import SliderProgressBar from '@/components/Sliders/SliderProgressBar/SliderProgressBar';
import type { ColorPaletteItem } from '@/types/ICombinationMetadata';
import cn from '@/utils/cn';
import removeCharsFromString from '@/utils/removeCharsFromString';
import TitleGold from '../Titles/TitleGold';

type TComponentProps = {
  className?: string;
  items: {
    id: number | string;
    roomUrl: string;
    productUrl: string;
    swatchUrl: string;
    style?: string;
    colorPalette?: ColorPaletteItem[];
  }[];
};

const SliderDreamRooms = ({ className, items }: TComponentProps) => {
  // console.log('SliderDreamRooms -> items:', items);

  // State for managing favorites
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set());

  // Use the reusable slider progress hook
  const { visibleSlides, navigateToSlide, sliderContainerRef } =
    useSliderProgress({ items });

  // HANDLERS
  const handleToggleFavorite = (itemId: string | number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const handleScrollLeft = () => {
    if (sliderContainerRef.current) {
      const container = sliderContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of container width
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  const handleScrollRight = () => {
    if (sliderContainerRef.current) {
      const container = sliderContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of container width
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="container">
        {/* <TitleBigWithSubtitle subTitle="explore your" title="Dreamrooms." /> */}
        {/* <TitleGold
						title="explore your Dreamrooms."
						subtitle="5 Steps to Your Signature Sanctuary"
						text="From Room to Revolution: Design your Ultimate Modular Sectional"
						className="mb-[20px]"
					/> */}
        {/* <TitleClippedText
						imageUrl={originalRoom}
						subtitle="DIVE IN & EXPLORE YOUR"
						title="DREAMrooms"
						text="From Room to Revolution: Design your Ultimate Modular Sectional"
						className="mb-[30px]"
					/> */}
        <TitleGold
          title="DREAMrooms"
          subtitle="DIVE IN & EXPLORE YOUR"
          text="From Room to Revolution: Design your Ultimate Modular Sectional"
          className="mb-[30px]"
        />
      </div>

      <div className="flex flex-col gap-[20px]" id="dreamrooms">
        <div
          ref={sliderContainerRef}
          className={cn(
            'SliderDreamRooms',
            // 'grid grid-flow-col gap-[20px]',
            // 'auto-cols-[calc((80%-1*20px)/1)] sm:auto-cols-[calc((80%-1*20px)/2)] lg:auto-cols-[calc((80%-3*20px)/1)]',

            // 'auto-cols-[calc((80%-1*20px)/2)] lg:auto-cols-[calc((80%-2*20px)/1)]',
            'flex items-stretch gap-[20px]',
            'py-[20px]',
            'scrollbar-x-thin',
            'overflow-x-auto overflow-y-hidden',
            // 'aspect-3/2',
            'scrollbar-hide',
            className,
          )}
        >
          {/* FIRST DUMMY SLIDE */}
          <div
            className={cn(
              'SliderItem',
              'cursor-pointer',
              'overflow-hidden',
              'aspect-[3/2]',
              // 'sm:w-[calc((100vw-640px)/2+0px)]',
              // 'md:w-[calc((100vw-768px)/2+0px)]',
              'sm:w-[calc((100vw-600px)/2+0px)]',
              'lg:w-[calc((100vw-1100px)/2+0px)]',
              'xl:w-[calc((100vw-1100px)/2+0px)]',
              '2xl:w-[calc((100vw-1100px)/2+0px)]',
              'shrink-0',
            )}
            key={'first-slide-dreamrooms'}
          />

          {/* SLIDES */}
          {items.map((item) => (
            <div
              className={cn(
                'SliderItem',
                'relative',
                'cursor-pointer',
                'transition-all duration-300',
                'hover:shadow-md',
                'rounded-[16px]',
                'group',
                'overflow-hidden',
                // 'aspect-[2/3]',
                'aspect-[3/2]',
                'w-[300px] md:w-[400px] lg:w-[800px]',
                'shrink-0',
                '[&_.ListShareSocial]:hidden',
                // 'hover:aspect-[16/9]',
                // 'aspect-[16/9]',
              )}
              key={item.id}
            >
              {/* GRADIENT OVERLAY */}
              <div
                className={cn(
                  'absolute inset-0 z-10',
                  'bg-gradient-to-t from-black/60 via-black/20 to-transparent',
                  'transition-opacity duration-300',
                  'pointer-events-none rounded-[16px] opacity-0',
                  'group-hover:opacity-100',
                )}
              />

              <DialogRadix
                className={cn('aspect-[2.90/2]', 'max-h-[100vh]')}
                trigger={
                  <Image
                    className={cn(
                      'SliderImage',
                      'object-cover',
                      'h-full w-full',
                      'rounded-[16px]',
                      'transition-all duration-600',
                      'group-hover:scale-[1.1]',
                      //
                    )}
                    src={item.roomUrl}
                    alt={`item`}
                    width={450}
                    height={300}
                  />
                }
                content={
                  <div
                    className={cn(
                      'relative',
                      'flex items-center justify-center',
                      'sm:min-w-auto',
                      'aspect-[3/2]',
                      'w-[calc(100vw-60px)] md:w-[500px] lg:w-[900px]',
                      'max-h-[calc(100vh-60px)]',
                      'rounded-[16px]',
                      'overflow-hidden',
                    )}
                  >
                    <Image
                      className={cn(
                        'object-contain',
                        'h-full max-h-full',
                        'w-full max-w-full',
                      )}
                      src={item.roomUrl}
                      alt={`item`}
                      // fill
                      width={1000}
                      height={650}
                    />
                    <ListShareSocial
                      className={cn(
                        'absolute right-1/2 z-[10] translate-x-1/2',
                        'bottom-[0px] sm:bottom-[10px]',
                      )}
                      withMobileClasses={false}
                      media={item.roomUrl}
                    />
                  </div>
                }
              />

              {/* STYLE */}
              <div
                className={cn(
                  'absolute top-[20px] left-[20px]',
                  'flex flex-col items-start justify-start',
                  'pointer-events-none',
                )}
              >
                <span className="font-semibold text-[15px] text-white uppercase">
                  {removeCharsFromString(item?.style || '')}
                </span>
                <ListColorsAndSwatches
                  className=""
                  items={item?.colorPalette
                    ?.map((color) => ({ color: color.hex }))
                    ?.slice(0, 3)}
                />
              </div>

              {/* BUTTON FAVORITE */}
              <button
                className={cn(
                  'ButtonFavorite',
                  'absolute z-[20]',
                  'top-[20px] right-[20px] text-white hover:text-red-500',
                  'cursor-pointer',
                  'transition-colors duration-200',
                  favorites.has(item.id) ? 'text-red-500' : 'text-white',
                )}
                type="button"
                onClick={() => handleToggleFavorite(item.id)}
              >
                {favorites.has(item.id) ? (
                  <FaHeart className="text-[20px] lg:text-[30px]" />
                ) : (
                  <FaRegHeart className="text-[20px] lg:text-[30px]" />
                )}
              </button>

              {/* IMAGES : PRODUCT AND SWATCH */}
              <div
                className={cn(
                  'absolute',
                  'z-[10]',
                  'bottom-[-80px] left-[0px]',
                  'w-full',
                  'flex items-center justify-between',
                  'px-[20px]',
                  'transition-transform duration-300',
                  'group-hover:-translate-y-[100px]',
                  'pointer-events-none',
                )}
              >
                {item.productUrl && (
                  <Image
                    src={item.productUrl}
                    alt={`item`}
                    width={80}
                    height={80}
                    className="h-[40px] w-[40px] rounded-[8px] lg:h-[80px] lg:w-[80px]"
                  />
                )}
                {item.swatchUrl && (
                  <Image
                    src={item.swatchUrl}
                    alt={`item`}
                    width={80}
                    height={80}
                    className="h-[40px] w-[40px] rounded-[8px] lg:h-[80px] lg:w-[80px]"
                  />
                )}
              </div>

              {/* <Logo
								className={cn(
									'absolute bottom-[20px]',
									'w-[100px] lg:w-[200px]',
									'-translate-x-1/2 left-1/2',
								)}
							/> */}
            </div>
          ))}
        </div>

        {/* VISUAL PROGRESS BAR */}
        <div className="container">
          <SliderProgressBar
            className="mb-[20px]"
            items={items}
            visibleSlides={visibleSlides}
            onNavigateToSlide={navigateToSlide}
          />
          <div
            className={cn(
              'SliderControls',
              'flex justify-end',
              'gap-[20px]',
              'pr-[50px]',
              // 'hide-scrollbar overflow-x-auto',
            )}
            role="presentation"
            aria-label={'Tab navigation'}
          >
            <button
              type="button"
              onClick={handleScrollLeft}
              className={cn('cursor-pointer')}
            >
              <FaCircleChevronLeft
                className={cn(
                  'text-[30px] lg:text-[50px]',
                  'text-[#333333] transition-all duration-300 hover:text-[#333333]/80',
                )}
              />
            </button>
            <button
              type="button"
              onClick={handleScrollRight}
              className={cn('cursor-pointer')}
            >
              <FaCircleChevronRight
                className={cn(
                  'text-[30px] lg:text-[50px]',
                  'text-[#333333] transition-all duration-300 hover:text-[#333333]/80',
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderDreamRooms;
