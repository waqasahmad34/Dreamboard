'use client';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import ImageMissing from '@/components/ImageMissing';
import { cn } from '@/lib/utils';

type TComponentProps = {
  className?: string;
  slides: Array<{
    id: string | number;
    title: React.ReactNode;
    imageSrc: string;
    [key: string]: unknown;
  }>;
  autoplay?: number;
  autoplayStopOnInteraction?: boolean;
};

export default function CarouselEmblaBasic({
  className,
  slides,
  autoplay = 3000,
  autoplayStopOnInteraction = true,
}: TComponentProps) {
  const plugins =
    autoplay > 0
      ? [
          Autoplay({
            delay: autoplay,
            stopOnInteraction: autoplayStopOnInteraction,
          }),
        ]
      : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (emblaApi) {
      onSelect(emblaApi);
      emblaApi.on('reInit', onSelect);
      emblaApi.on('select', onSelect);
    }
  }, [emblaApi, onSelect]);

  return (
    <div
      className={cn(
        'CarouselEmblaBasic',
        'overflow-hidden',
        'h-full w-full',
        'relative',
        className,
      )}
    >
      <div className="h-full w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full w-full">
          {slides?.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex items-center justify-center',
                'shrink-0 grow-0',
                'min-h-[500px]',
                'h-full w-full',
                'relative',
              )}
            >
              {/* {item.title} */}
              {item.imageSrc ? (
                <Image
                  src={item.imageSrc}
                  alt={`final_room_url`}
                  fill
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <ImageMissing
                  className="h-full w-full"
                  title={`Image missing: final_room_url / item.imageSrc`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className={cn(
          '-translate-y-1/2 absolute top-1/2 left-4 z-10',
          'flex items-center justify-center',
          'h-10 w-10 rounded-full',
          'bg-white/80 hover:bg-white',
          'shadow-lg transition-all duration-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'focus:outline-none focus:ring-2 focus:ring-white/50',
          'cursor-pointer',
        )}
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        aria-label="Previous slide"
        type="button"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        className={cn(
          '-translate-y-1/2 absolute top-1/2 right-4 z-10',
          'flex items-center justify-center',
          'h-10 w-10 rounded-full',
          'bg-white/80 hover:bg-white',
          'shadow-lg transition-all duration-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'focus:outline-none focus:ring-2 focus:ring-white/50',
          'cursor-pointer',
        )}
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        aria-label="Next slide"
        type="button"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
}
