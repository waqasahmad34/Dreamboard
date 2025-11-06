import useEmblaCarousel from "embla-carousel-react";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import ListColorsAndSwatches from "@/components/Lists/ListColorsAndSwatches";
import ListShareSocial from "@/components/Lists/ListShareSocial";
import { useSliderProgress } from "@/components/Sliders/SliderProgressBar/hooks/useSliderProgress";
import SliderProgressBar from "@/components/Sliders/SliderProgressBar/SliderProgressBar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ColorPaletteItem } from "@/types/ICombinationMetadata";
import cn from "@/utils/cn";
import removeCharsFromString from "@/utils/removeCharsFromString";
import DialogRadix from "../DialogRadix";
import ImageMissing from "../ImageMissing";
import TitleGold from "../Titles/TitleGold";

type TComponentProps = {
  className?: string;
  items: {
    id: number | string;
    boardUrl: string;
    style?: string;
    colorPalette?: ColorPaletteItem[];
  }[];
};

const SliderDreamBoards = ({ className, items }: TComponentProps) => {
  // console.log('SliderDreamBoards -> items:', items);

  // State for managing favorites
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set());

  // Use the reusable slider progress hook
  const { visibleSlides, navigateToSlide, sliderContainerRef } =
    useSliderProgress({ items });

  // Embla carousel state for dialog
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        behavior: "smooth",
      });
    }
  };
  const handleScrollRight = () => {
    if (sliderContainerRef.current) {
      const container = sliderContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of container width
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Carousel handlers
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
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
        behavior: "smooth",
      });
    }
  }, [selectedIndex, items.length]);

  if (!items.some((item) => item.boardUrl)) {
    return null;
  }

  return (
    <>
      <div className="container">
        {/* <TitleBigWithSubtitle
						subTitle="explore your"
						title="Dreamboards."
					/> */}
        {/* <TitleGold
						title="explore your Dreamboards."
						subtitle="5 Steps to Your Signature Sanctuary"
						text="From Room to Revolution: Design your Ultimate Modular Sectional"
						className="mb-[20px]"
					/> */}
        {/* <TitleClippedText
						imageUrl={originalRoom}
						subtitle="DIVE IN & EXPLORE YOUR"
						title="DREAMboards"
						text="From Room to Revolution: Design your Ultimate Modular Sectional"
						className="mb-[30px]"
					/> */}
        <TitleGold
          title="DREAMboards"
          subtitle="DIVE IN & EXPLORE YOUR"
          text="From Room to Revolution: Design your Ultimate Modular Sectional"
          className="mb-[30px]"
        />
      </div>

      <div className="flex flex-col gap-[20px]">
        {/* SLIDES */}
        <div
          ref={sliderContainerRef}
          className={cn(
            "SliderDreamBoards",
            // 'grid grid-flow-col gap-[20px]',
            // 'auto-cols-[calc((80%-1*20px)/1)] sm:auto-cols-[calc((80%-1*20px)/2)] lg:auto-cols-[calc((80%-3*20px)/3)]',
            "flex items-center gap-[20px]",

            "py-[20px]",
            "scrollbar-x-thin",
            "overflow-x-auto overflow-y-hidden",
            "relative",
            "scrollbar-hide",
            className
          )}
        >
          {/* FIRST DUMMY SLIDE */}
          <div
            className={cn(
              "SliderItem",
              "FirstDummySlide",
              "cursor-pointer",
              "overflow-hidden",
              // 'sm:w-[calc((100vw-640px)/2+0px)]',
              // 'md:w-[calc((100vw-768px)/2+0px)]',
              "sm:w-[calc((100vw-600px)/2+0px)]",
              "lg:w-[calc((100vw-1100px)/2+0px)]",
              "xl:w-[calc((100vw-1100px)/2+0px)]",
              "2xl:w-[calc((100vw-1100px)/2+0px)]",
              "shrink-0"
            )}
            key={"first-slide-dreamboards"}
          />

          {/* OTHER SLIDES */}
          {items.map((item) => {
            return (
              <div
                className={cn(
                  "SliderItem",
                  "relative",
                  "cursor-pointer",
                  "hover:shadow-md",
                  "transition-all duration-300",
                  "rounded-[16px]",
                  "overflow-hidden",
                  "w-[300px] md:w-[400px] lg:w-[400px]",
                  "aspect-[2/3]",
                  "shrink-0",
                  "group"
                )}
                key={item.id}
              >
                {/* GRADIENT OVERLAY */}
                <div
                  className={cn(
                    "absolute inset-0",
                    "z-10",
                    "bg-gradient-to-b from-black/60 via-black/20 to-transparent",
                    "transition-opacity duration-300",
                    "pointer-events-none rounded-[16px] opacity-0",
                    "group-hover:opacity-100"
                  )}
                />

                <DialogRadix
                  trigger={
                    item?.boardUrl ? (
                      <Image
                        className={cn(
                          "SliderImage",
                          "object-cover",
                          "h-full w-full",
                          "transition-all duration-600",
                          "group-hover:scale-[1.1]"
                          //
                        )}
                        src={item.boardUrl}
                        alt={`item`}
                        width={300}
                        height={450}
                      />
                    ) : (
                      <ImageMissing
                        title={`Mood board missing: item.boardUrl`}
                        className="h-full w-full"
                      />
                    )
                  }
                  content={
                    <div
                      className={cn(
                        "flex items-center justify-center",
                        "flex-col",
                        "w-full"
                      )}
                    >
                      {/* SLIDER */}
                      <div
                        className={cn(
                          "SliderPopup",
                          // 'w-full',
                          "w-[300px] lg:w-[400px]",
                          // 'max-w-[80vw] lg:max-w-[50vw]',
                          "relative",
                          "mb-[20px]"
                          // 'overflow-hidden',
                        )}
                      >
                        {/* SLIDES */}
                        <div
                          className="overflow-hidden rounded-[16px]"
                          ref={emblaRef}
                        >
                          <div className="flex">
                            {items.map((carouselItem) => (
                              <div
                                key={carouselItem.id}
                                className={cn(
                                  "flex items-center justify-center",
                                  "shrink-0 grow-0",
                                  "w-full"
                                )}
                              >
                                {carouselItem.boardUrl && (
                                  <Image
                                    className={cn(
                                      "SliderImage",
                                      "object-contain",
                                      "rounded-[16px]",

                                      // 'max-h-[50vh]',
                                      "w-[300px] lg:w-[400px]",
                                      "aspect-[2/3]"
                                    )}
                                    src={carouselItem.boardUrl}
                                    alt={`item ${carouselItem.id}`}
                                    width={540}
                                    height={810}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* SLIDER NAVIGATION ARROWS */}
                        {items.length > 1 && (
                          <>
                            {/* LEFT ARROW */}
                            <button
                              type="button"
                              onClick={scrollPrev}
                              className={cn(
                                "absolute",
                                "z-10",
                                "-translate-y-1/2 top-1/2",
                                "left-[-30px]",
                                // 'lg:left-[0px]',
                                "flex items-center justify-center",
                                "size-[30px]",
                                "rounded-full",
                                // ' hover:bg-white',
                                // 'bg-white/80','
                                // 'shadow-lg',
                                "hover:scale-110",
                                "text-white",
                                "focus:outline-none focus-visible:scale-110 focus-visible:outline-none",
                                "transition-all duration-200",

                                // 'focus:outline-none focus:ring-2 focus:ring-white/50',
                                "cursor-pointer"
                              )}
                              aria-label="Previous slide"
                            >
                              <FaChevronLeft className="text-[30px]" />
                            </button>

                            {/* RIGHT ARROW */}
                            <button
                              type="button"
                              onClick={scrollNext}
                              className={cn(
                                "absolute",
                                "z-10",
                                "-translate-y-1/2 top-1/2",
                                "right-[-30px]",
                                // 'lg:right-[0px]',
                                "flex items-center justify-center",
                                "size-[30px]",
                                "rounded-full",
                                // ' hover:bg-white',
                                // 'bg-white/80','
                                // 'shadow-lg',
                                "hover:scale-110",
                                "text-white",
                                "focus:outline-none focus-visible:scale-110 focus-visible:outline-none",
                                "transition-all duration-200",
                                "cursor-pointer"
                              )}
                              aria-label="Next slide"
                            >
                              <FaChevronRight className="text-[30px]" />
                            </button>
                          </>
                        )}
                      </div>

                      {/* THUMBNAILS */}
                      {items.length > 1 && (
                        <div
                          ref={thumbnailContainerRef}
                          className={cn(
                            "SliderThumbnails",
                            "flex",
                            "gap-[10px]",
                            "justify-start",
                            "mb-[30px]",
                            "overflow-x-auto",
                            "scrollbar-hide",

                            // 'w-full',
                            "w-[300px] md:w-[300px] lg:w-[400px]"
                          )}
                        >
                          {items.map((thumbnailItem, index) => {
                            // console.log('thumbnailItem', thumbnailItem);
                            return (
                              <button
                                key={thumbnailItem.id}
                                type="button"
                                onClick={() => scrollTo(index)}
                                className={cn(
                                  "shrink-0",
                                  "size-[60px]",
                                  "rounded-[8px]",
                                  "overflow-hidden",
                                  "border-[1px]",
                                  "cursor-pointer",
                                  "transition-all duration-200",
                                  selectedIndex === index
                                    ? "border-blue-500 shadow-lg"
                                    : "border-gray-300 hover:border-gray-400"
                                )}
                              >
                                {thumbnailItem.boardUrl && (
                                  <Image
                                    src={thumbnailItem.boardUrl}
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
                        className={cn("flex-row gap-[5px]")}
                        withMobileClasses={false}
                        media={item.boardUrl}
                      />
                    </div>
                  }
                />

                {/* STYLE AND SWATCHES */}
                <div
                  className={cn(
                    "absolute z-[20]",
                    "top-[20px] left-[20px]",
                    "flex flex-col items-start justify-start"
                  )}
                >
                  <span className="font-semibold text-[15px] text-white uppercase">
                    {removeCharsFromString(item?.style ?? "")}
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
                    "ButtonFavorite",
                    "absolute z-[20]",
                    "top-[20px] right-[20px] text-white hover:text-red-500",
                    "cursor-pointer",
                    "transition-colors duration-200",
                    favorites.has(item.id) ? "text-red-500" : "text-white"
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

                {/* <Logo
									className={cn(
										'absolute bottom-[20px] w-[200px]',
										'-translate-x-1/2 left-1/2',
									)}
								/> */}
              </div>
            );
          })}
        </div>

        {/* VISUAL PROGRESS BAR */}
        <div className="container">
          <SliderProgressBar
            className="mb-[20px]"
            items={items}
            visibleSlides={visibleSlides}
            onNavigateToSlide={navigateToSlide}
          />

          {/* SLIDES CONTROLS */}
          <div
            className={cn(
              "SliderControls",
              "flex justify-end",
              "gap-[20px]",
              "pr-[50px]"
              // 'hide-scrollbar overflow-x-auto',
            )}
            role="presentation"
            aria-label={"Tab navigation"}
          >
            <button
              type="button"
              onClick={handleScrollLeft}
              className={cn("cursor-pointer")}
            >
              <FaCircleChevronLeft
                className={cn(
                  "text-[30px] lg:text-[50px]",
                  "text-[#333333] transition-all duration-300 hover:text-[#333333]/80"
                )}
              />
            </button>
            <button
              type="button"
              onClick={handleScrollRight}
              className={cn("cursor-pointer")}
            >
              <FaCircleChevronRight
                className={cn(
                  "text-[30px] lg:text-[50px]",
                  "text-[#333333] transition-all duration-300 hover:text-[#333333]/80"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderDreamBoards;
