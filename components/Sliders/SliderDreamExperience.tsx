'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import DialogRadix from '@/components/DialogRadix';
import ListShareSocial from '@/components/Lists/ListShareSocial';
import { useSliderProgress } from '@/components/Sliders/SliderProgressBar/hooks/useSliderProgress';
import SliderProgressBar from '@/components/Sliders/SliderProgressBar/SliderProgressBar';

import slide1 from '@/public/images/sliders/experience/slide1.jpg';
import slide2 from '@/public/images/sliders/experience/slide2.jpg';
import slide3 from '@/public/images/sliders/experience/slide3.jpg';
import slide4 from '@/public/images/sliders/experience/slide4.jpg';
import slide5 from '@/public/images/sliders/experience/slide5.jpg';
import slide6 from '@/public/images/sliders/experience/slide6.jpg';
import slide7 from '@/public/images/sliders/experience/slide7.jpg';
import slide8 from '@/public/images/sliders/experience/slide8.jpg';
import cn from '@/utils/cn';

type TComponentProps = {
  className?: string;
  items?: {
    id: number | string;
    imageUrl: string;
    title: React.ReactNode;
    content: React.ReactNode;
  }[];
};

const dreamExperienceArr = [
  {
    id: 'dream-experience-1',
    imageUrl: slide1.src,
    title: (
      <h3 className="cursor-pointer break-words text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] transition-all duration-[0.4s] selection:bg-[#F97352] selection:text-white">
        Lifetime
        <br />
        <span className="mx-0 mt-[3px] mb-0 inline-block cursor-pointer p-0 text-center align-baseline font-extrabold text-white text-xs uppercase leading-none tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
          Warranty
        </span>
      </h3>
    ),
    content: (
      <div className="absolute inset-x-0 bottom-5 mx-auto my-0 w-[85%] cursor-pointer rounded-2xl bg-[0_0] bg-[rgba(169,141,110,0.6)] bg-auto bg-none bg-scroll bg-clip-border bg-repeat bg-origin-padding p-2.5 align-baseline text-[100%] leading-[initial] opacity-100 backdrop-blur-[5px] transition-all duration-[1s] selection:bg-[#F97352] selection:text-white">
        <h4 className="my-2.5 cursor-pointer break-words text-center font-semibold text-sm text-white uppercase leading-[1.3em] tracking-widest selection:bg-[#F97352] selection:text-white">
          Coverage That Lasts
        </h4>
        <p className="mx-auto w-[90%] cursor-pointer break-words p-0 text-center align-baseline font-light text-[15px] text-white leading-[1.2] selection:bg-[#F97352] selection:text-white">
          Our warranty goes further - covering frames, mechanisms, cushions, and
          springs for life, so you can lounge without worry for years to come.
        </p>
      </div>
    ),
  },
  {
    id: 'dream-experience-2',
    imageUrl: slide2.src,
    title: (
      <h3 className="cursor-pointer break-words text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] transition-all duration-[0.4s] selection:bg-[#F97352] selection:text-white">
        Washable
        <br className="cursor-pointer text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] selection:bg-[#F97352] selection:text-white" />
        <span className="mx-0 mt-[3px] mb-0 inline-block cursor-pointer p-0 text-center align-baseline font-extrabold text-white text-xs uppercase leading-none tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
          Covers
        </span>
      </h3>
    ),
    content: (
      <div className="custom-styles-1 absolute inset-x-0 bottom-5 mx-auto my-0 w-[85%] cursor-pointer rounded-2xl bg-[0_0] bg-[rgba(169,141,110,0.6)] bg-auto bg-none bg-scroll bg-clip-border bg-repeat bg-origin-padding p-2.5 align-baseline font-normal text-[100%] text-black leading-[1.5em] opacity-100 backdrop-blur-[5px] transition-all duration-[1s] selection:bg-[#F97352] selection:text-white">
        <h4 className="custom-styles-2 my-2.5 cursor-pointer break-words text-center font-semibold text-sm text-white uppercase leading-[1.3em] tracking-widest selection:bg-[#F97352] selection:text-white">
          Beauty Made Practical
        </h4>
        <p className="custom-styles-3 mx-auto w-[90%] cursor-pointer break-words p-0 text-center align-baseline font-light text-[15px] text-white leading-[1.2] selection:bg-[#F97352] selection:text-white">
          Life happens. That’s why our tailored covers are fully removable and
          machine washable, making cleanup easy without compromising on style.
        </p>
      </div>
    ),
  },
  {
    id: 'dream-experience-3',
    imageUrl: slide3.src,
    title: (
      <h3 className="cursor-pointer break-words text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] transition-all duration-[0.4s] selection:bg-[#F97352] selection:text-white">
        Designed &amp;
        <br className="cursor-pointer text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] selection:bg-[#F97352] selection:text-white" />
        <span className="mx-0 mt-[3px] mb-0 inline-block cursor-pointer p-0 text-center align-baseline font-extrabold text-white text-xs uppercase leading-none tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
          Crafted in the US
        </span>
      </h3>
    ),
    content: (
      <div className="custom-styles-1 absolute inset-x-0 bottom-5 mx-auto my-0 w-[85%] cursor-pointer rounded-2xl bg-[0_0] bg-[rgba(169,141,110,0.6)] bg-auto bg-none bg-scroll bg-clip-border bg-repeat bg-origin-padding p-2.5 align-baseline font-normal text-[100%] text-black leading-[1.5em] opacity-100 backdrop-blur-[5px] transition-all duration-[1s] selection:bg-[#F97352] selection:text-white">
        <h4 className="custom-styles-2 my-2.5 cursor-pointer break-words text-center font-semibold text-sm text-white uppercase leading-[1.3em] tracking-widest selection:bg-[#F97352] selection:text-white">
          Built Close to Home
        </h4>
        <p className="custom-styles-3 mx-auto w-[90%] cursor-pointer break-words p-0 text-center align-baseline font-light text-[15px] text-white leading-[1.2] selection:bg-[#F97352] selection:text-white">
          DreamSofa is proudly produced in California, where every piece is
          designed, built, and finished to meet the highest standards of
          American craftsmanship.
        </p>
      </div>
    ),
  },
  {
    id: 'dream-experience-4',
    imageUrl: slide4.src,
    title: (
      <h3 className="cursor-pointer break-words text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] transition-all duration-[0.4s] selection:bg-[#F97352] selection:text-white">
        Eco
        <br className="cursor-pointer text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] selection:bg-[#F97352] selection:text-white" />
        <span className="mx-0 mt-[3px] mb-0 inline-block cursor-pointer p-0 text-center align-baseline font-extrabold text-white text-xs uppercase leading-none tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
          Friendly
        </span>
      </h3>
    ),
    content: (
      <div className="custom-styles-1 absolute inset-x-0 bottom-5 mx-auto my-0 w-[85%] cursor-pointer rounded-2xl bg-[0_0] bg-[rgba(169,141,110,0.6)] bg-auto bg-none bg-scroll bg-clip-border bg-repeat bg-origin-padding p-2.5 align-baseline font-normal text-[100%] text-black leading-[1.5em] opacity-100 backdrop-blur-[5px] transition-all duration-[1s] selection:bg-[#F97352] selection:text-white">
        <h4 className="custom-styles-2 my-2.5 cursor-pointer break-words text-center font-semibold text-sm text-white uppercase leading-[1.3em] tracking-widest selection:bg-[#F97352] selection:text-white">
          Consciously Made
        </h4>
        <p className="custom-styles-3 mx-auto w-[90%] cursor-pointer break-words p-0 text-center align-baseline font-light text-[15px] text-white leading-[1.2] selection:bg-[#F97352] selection:text-white">
          Sustainably sourced woods and thoughtfully chosen materials ensure
          that every DreamSofa is as gentle on the planet as it is on your home.
        </p>
      </div>
    ),
  },
  {
    id: 'dream-experience-5',
    imageUrl: slide5.src,
    title: (
      <h3 className="cursor-pointer break-words text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] transition-all duration-[0.4s] selection:bg-[#F97352] selection:text-white">
        Performance
        <br className="cursor-pointer text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] selection:bg-[#F97352] selection:text-white" />
        <span className="mx-0 mt-[3px] mb-0 inline-block cursor-pointer p-0 text-center align-baseline font-extrabold text-white text-xs uppercase leading-none tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
          Fabrics
        </span>
      </h3>
    ),
    content: (
      <div className="absolute inset-x-0 bottom-5 mx-auto my-0 w-[85%] cursor-pointer rounded-2xl bg-[0_0] bg-[rgba(169,141,110,0.6)] bg-auto bg-none bg-scroll bg-clip-border bg-repeat bg-origin-padding p-2.5 align-baseline font-normal text-[100%] text-black leading-[1.5em] opacity-100 backdrop-blur-[5px] transition-all duration-[1s] selection:bg-[#F97352] selection:text-white">
        <h4 className="my-2.5 cursor-pointer break-words text-center font-semibold text-sm text-white uppercase leading-[1.3em] tracking-widest selection:bg-[#F97352] selection:text-white">
          Engineered for Everyday
        </h4>
        <p className="mx-auto w-[90%] cursor-pointer break-words p-0 text-center align-baseline font-light text-[15px] text-white leading-[1.2] selection:bg-[#F97352] selection:text-white">
          Our fabrics are engineered to do more: stain-resistant, pet and
          kid-friendly, and made to hold their beauty through real life and
          everyday use.
        </p>
      </div>
    ),
  },
  {
    id: 'dream-experience-6',
    imageUrl: slide6.src,
    title: (
      <h3 className="cursor-pointer break-words text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] transition-all duration-[0.4s] selection:bg-[#F97352] selection:text-white">
        Handcrafted
        <br className="cursor-pointer text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] selection:bg-[#F97352] selection:text-white" />
        <span className="mx-0 mt-[3px] mb-0 inline-block cursor-pointer p-0 text-center align-baseline font-extrabold text-white text-xs uppercase leading-none tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
          Heritage
        </span>
      </h3>
    ),
    content: (
      <div className="absolute inset-x-0 bottom-5 mx-auto my-0 w-[85%] cursor-pointer rounded-2xl bg-[0_0] bg-[rgba(169,141,110,0.6)] bg-auto bg-none bg-scroll bg-clip-border bg-repeat bg-origin-padding p-2.5 align-baseline font-normal text-[100%] text-black leading-[1.5em] opacity-100 backdrop-blur-[5px] transition-all duration-[1s] selection:bg-[#F97352] selection:text-white">
        <h4 className="my-2.5 cursor-pointer break-words text-center font-semibold text-sm text-white uppercase leading-[1.3em] tracking-widest selection:bg-[#F97352] selection:text-white">
          Artisan Legacy
        </h4>
        <p className="mx-auto w-[90%] cursor-pointer break-words p-0 text-center align-baseline font-light text-[15px] text-white leading-[1.2] selection:bg-[#F97352] selection:text-white">
          Each piece is bench-made by skilled artisans, honoring time-tested
          techniques that celebrate craftsmanship and character in every stitch
          and seam.
        </p>
      </div>
    ),
  },
  {
    id: 'dream-experience-7',
    imageUrl: slide7.src,
    title: (
      <h3 className="cursor-pointer break-words text-center font-extrabold text-[25px] text-white normal-case leading-none tracking-[0] transition-all duration-[0.4s] selection:bg-[#F97352] selection:text-white">
        CertiPUR
        <br className="cursor-pointer text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] selection:bg-[#F97352] selection:text-white" />
        <span className="mx-0 mt-[3px] mb-0 inline-block cursor-pointer p-0 text-center align-baseline font-extrabold text-white text-xs uppercase leading-none tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
          Certified
        </span>
      </h3>
    ),
    content: (
      <div className="absolute inset-x-0 bottom-5 mx-auto my-0 w-[85%] cursor-pointer rounded-2xl bg-[0_0] bg-[rgba(169,141,110,0.6)] bg-auto bg-none bg-scroll bg-clip-border bg-repeat bg-origin-padding p-2.5 align-baseline font-normal text-[100%] text-black leading-[1.5em] opacity-100 backdrop-blur-[5px] transition-all duration-[1s] selection:bg-[#F97352] selection:text-white">
        <h4 className="my-2.5 cursor-pointer break-words text-center font-semibold text-sm text-white uppercase leading-[1.3em] tracking-widest selection:bg-[#F97352] selection:text-white">
          Tested for Trust
        </h4>
        <p className="mx-auto w-[90%] cursor-pointer break-words p-0 text-center align-baseline font-light text-[15px] text-white leading-[1.2] selection:bg-[#F97352] selection:text-white">
          We use only CertiPUR-US© certified foams - free from harmful
          chemicals, low in VOCs, and trusted for lasting comfort and clean air
          quality.
        </p>
      </div>
    ),
  },
  {
    id: 'dream-experience-8',
    imageUrl: slide8.src,
    title: (
      <h3 className="cursor-pointer break-words text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] transition-all duration-[0.4s] selection:bg-[#F97352] selection:text-white">
        DesignXChange
        <br className="cursor-pointer text-center font-extrabold text-[25px] text-white uppercase leading-none tracking-[0] selection:bg-[#F97352] selection:text-white" />
        <span className="mx-0 mt-[3px] mb-0 inline-block cursor-pointer p-0 text-center align-baseline font-extrabold text-white text-xs uppercase leading-none tracking-[0.2em] selection:bg-[#F97352] selection:text-white"></span>
      </h3>
    ),
    content: (
      <div className="custom-styles-1 absolute inset-x-0 bottom-5 mx-auto my-0 w-[85%] cursor-pointer rounded-2xl bg-[0_0] bg-[rgba(169,141,110,0.6)] bg-auto bg-none bg-scroll bg-clip-border bg-repeat bg-origin-padding p-2.5 align-baseline font-normal text-[100%] text-black leading-[1.5em] opacity-100 backdrop-blur-[5px] transition-all duration-[1s] selection:bg-[#F97352] selection:text-white">
        <h4 className="custom-styles-2 my-2.5 cursor-pointer break-words text-center font-semibold text-sm text-white uppercase leading-[1.3em] tracking-widest selection:bg-[#F97352] selection:text-white">
          Style That Evolves With You
        </h4>
        <p className="custom-styles-3 mx-auto w-[90%] cursor-pointer break-words p-0 text-center align-baseline font-light text-[15px] text-white leading-[1.2] selection:bg-[#F97352] selection:text-white">
          Our exclusive program offers lifetime cushion and cover replacement,
          affordable reupholstery services, and the ability to refresh your
          sofa’s style as your home evolves.
        </p>
      </div>
    ),
  },
];

const SliderDreamExperience = ({
  className,
  items = dreamExperienceArr,
}: TComponentProps) => {
  // console.log('SliderDreamBoards -> items:', items);

  // Use the reusable slider progress hook
  const { visibleSlides, navigateToSlide, sliderContainerRef } =
    useSliderProgress({ items });

  // Embla carousel state for dialog
  const [, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // HANDLERS
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

  // Carousel handlers
  // const scrollTo = useCallback(
  //   (index: number) => emblaApi?.scrollTo(index),
  //   [emblaApi],
  // );

  // const scrollPrev = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollPrev();
  // }, [emblaApi]);

  // const scrollNext = useCallback(() => {
  //   if (emblaApi) emblaApi.scrollNext();
  // }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-scroll thumbnail container when selectedIndex changes
  useEffect(() => {
    if (thumbnailContainerRef.current && items.length > 1) {
      const container = thumbnailContainerRef.current;
      const thumbnailWidth = 60; // size-[60px]
      const gap = 10; // gap-[10px]
      const scrollPosition = selectedIndex * (thumbnailWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [selectedIndex, items.length]);

  return (
    <div className="flex flex-col gap-[20px]">
      {/* SLIDES */}
      <div
        ref={sliderContainerRef}
        className={cn(
          'SliderDreamExperience',
          // 'grid grid-flow-col gap-[20px]',
          // 'auto-cols-[calc((80%-1*20px)/1)] sm:auto-cols-[calc((80%-1*20px)/2)] lg:auto-cols-[calc((80%-3*20px)/3)]',
          'flex gap-[20px]',

          'py-[20px]',
          'scrollbar-x-thin',
          'overflow-x-auto overflow-y-hidden',
          'scrollbar-hide',
          className,
        )}
      >
        {/* FIRST DUMMY SLIDE */}
        <div
          className={cn(
            'SliderItem',
            // 'cursor-pointer',
            'overflow-hidden',
            // 'sm:w-[calc((100vw-640px)/2+0px)]',
            // 'md:w-[calc((100vw-768px)/2+0px)]',
            'sm:w-[calc((100vw-600px)/2+0px)]',
            'lg:w-[calc((100vw-1100px)/2+0px)]',
            'xl:w-[calc((100vw-1100px)/2+0px)]',
            '2xl:w-[calc((100vw-1100px)/2+0px)]',
            'aspect-[2/3]',
            'shrink-0',
          )}
          key={'first-slide-dreamboards'}
        />

        {/* OTHER SLIDES */}
        {items.map((item) => (
          <div
            className={cn(
              'SliderItem',
              'relative',
              // 'cursor-pointer',
              'hover:shadow-md',
              'transition-all duration-300',
              'rounded-[16px]',
              'overflow-hidden',
              'w-[300px] md:w-[400px] lg:w-[400px]',
              'aspect-[2/3]',
              'shrink-0',
              'group',
            )}
            key={item.id}
          >
            {/* GRADIENT OVERLAY */}
            {/* <div
              className={cn(
                'absolute inset-0 z-10',
                'bg-gradient-to-b from-black/60 via-black/20 to-transparent',
                'transition-opacity duration-300',
                'pointer-events-none rounded-[16px] opacity-0',
                'group-hover:opacity-100',
              )}
            /> */}

            {/* TITLE */}
            <div
              className={cn(
                '-translate-x-1/2 absolute top-[50px] left-1/2 z-10',
                'text-white',
                'text-center',
                'transition-all duration-600',
                'group-hover:top-[90px]',
              )}
            >
              {item.title}
            </div>

            {item.content && (
              <div
                className={cn(
                  'absolute right-[20px] bottom-[20px] left-[20px] z-10',
                  'transition-all duration-600',
                  'opacity-0',
                  'group-hover:opacity-100',
                )}
              >
                {item.content}
              </div>
            )}
            {/* CONTENT */}

            <Image
              className={cn(
                'SliderImage',
                'object-cover',
                'h-full w-full',
                'transition-all duration-600',
                'group-hover:scale-[1.1]',
                //
              )}
              src={item.imageUrl}
              alt={`item`}
              width={300}
              height={450}
            />

            {/* DIALOG */}
            {/* <DialogRadix
              trigger={
                item.imageUrl && (
                  <Image
                    className={cn(
                      'SliderImage',
                      'object-cover',
                      'h-full w-full',
                      'transition-all duration-600',
                      'group-hover:scale-[1.1]',
                    )}
                    src={item.imageUrl}
                    alt={`item`}
                    width={300}
                    height={450}
                  />
                )
              }
              content={
                <div
                  className={cn(
                    'flex items-center justify-center',
                    'flex-col',
                    'w-full',
                  )}
                >
                  <div
                    className={cn(
                      'SliderPopup',
                      'w-[300px] lg:w-[400px]',
                      'relative',
                      'mb-[20px]',
                    )}
                  >
                    <div
                      className="overflow-hidden rounded-[16px]"
                      ref={emblaRef}
                    >
                      <div className="flex">
                        {items.map((carouselItem) => (
                          <div
                            key={carouselItem.id}
                            className={cn(
                              'flex items-center justify-center',
                              'shrink-0 grow-0',
                              'w-full',
                            )}
                          >
                            {carouselItem.imageUrl && (
                              <Image
                                className={cn(
                                  'SliderImage',
                                  'object-contain',
                                  'rounded-[16px]',
                                  'w-[300px] lg:w-[400px]',
                                  'aspect-[2/3]',
                                )}
                                src={carouselItem.imageUrl}
                                alt={`item ${carouselItem.id}`}
                                width={540}
                                height={810}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    {items.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={scrollPrev}
                          className={cn(
                            'absolute',
                            'z-10',
                            '-translate-y-1/2 top-1/2',
                            'left-[-30px]',
                            'flex items-center justify-center',
                            'size-[30px]',
                            'rounded-full',
                            'hover:scale-110',
                            'text-white',
                            'focus:outline-none focus-visible:scale-110 focus-visible:outline-none',
                            'transition-all duration-200',
                            'cursor-pointer',
                          )}
                          aria-label="Previous slide"
                        >
                          <FaChevronLeft className="text-[30px]" />
                        </button>
                        <button
                          type="button"
                          onClick={scrollNext}
                          className={cn(
                            'absolute',
                            'z-10',
                            '-translate-y-1/2 top-1/2',
                            'right-[-30px]',
                            'flex items-center justify-center',
                            'size-[30px]',
                            'rounded-full',
                            'hover:scale-110',
                            'text-white',
                            'focus:outline-none focus-visible:scale-110 focus-visible:outline-none',
                            'transition-all duration-200',
                            'cursor-pointer',
                          )}
                          aria-label="Next slide"
                        >
                          <FaChevronRight className="text-[30px]" />
                        </button>
                      </>
                    )}
                  </div>

                  {items.length > 1 && (
                    <div
                      ref={thumbnailContainerRef}
                      className={cn(
                        'SliderThumbnails',
                        'flex',
                        'gap-[10px]',
                        'justify-start',
                        'mb-[10px]',
                        'overflow-x-auto',
                        'scrollbar-hide',
                        'w-[300px] md:w-[300px] lg:w-[400px]',
                      )}
                    >
                      {items.map((thumbnailItem, index) => {
                        return (
                          <button
                            key={thumbnailItem.id}
                            type="button"
                            onClick={() => scrollTo(index)}
                            className={cn(
                              'shrink-0',
                              'size-[60px]',
                              'rounded-[8px]',
                              'overflow-hidden',
                              'border-[1px]',
                              'cursor-pointer',
                              'transition-all duration-200',
                              selectedIndex === index
                                ? 'border-blue-500 shadow-lg'
                                : 'border-gray-300 hover:border-gray-400',
                            )}
                          >
                            {thumbnailItem.imageUrl && (
                              <Image
                                src={thumbnailItem.imageUrl}
                                alt={`thumbnail ${thumbnailItem.id}`}
                                width={60}
                                height={60}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <ListShareSocial
                    className={cn('flex-row gap-[5px]')}
                    withMobileClasses={false}
                  />
                </div>
              }
            /> */}
          </div>
        ))}
      </div>

      <div className="container">
        {/* VISUAL PROGRESS BAR */}
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
  );
};

export default SliderDreamExperience;
