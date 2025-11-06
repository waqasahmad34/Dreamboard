'use client';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type TSlide = {
  id: string | number;
  title: string;
  [key: string]: unknown;
};

type TComponentProps = {
  className?: string;
  slides: TSlide[];
  autoplay?: number;
  showBreadcrumbs?: boolean;
};

export default function CarouselEmblaExtended({
  className,
  slides,
  autoplay = 0,
  showBreadcrumbs = false,
}: TComponentProps) {
  const plugins =
    autoplay > 0
      ? [
          Autoplay({
            delay: autoplay,
            stopOnInteraction: true,
          }),
        ]
      : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    plugins,
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn('CarouselEmblaExtended', 'relative', className)}>
      {/* SLIDES */}
      <div className={cn('h-full overflow-hidden')} ref={emblaRef}>
        <div className="flex h-full w-full">
          {slides?.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex items-center justify-center',
                'shrink-0 grow-0',
                'min-h-[500px]',
                'h-full w-full',
              )}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      {/* BREADCRUMBS */}
      {showBreadcrumbs && slides && slides.length > 1 && (
        <div
          className={cn(
            'absolute',
            'bottom-4',
            'left-1/2',
            'transform',
            '-translate-x-1/2',
          )}
        >
          <div className="flex space-x-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollTo(index)}
                className={cn(
                  'h-3 w-3 rounded-full transition-all duration-200',
                  selectedIndex === index
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/75',
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
