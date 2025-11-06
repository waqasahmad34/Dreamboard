import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useSliderProgress } from "@/components/Sliders/SliderProgressBar/hooks/useSliderProgress";
import SliderProgressBar from "@/components/Sliders/SliderProgressBar/SliderProgressBar";
// import type { ColorPaletteItem } from '@/types/ICombinationMetadata';
import cn from "@/utils/cn";
import removeCharsFromString from "@/utils/removeCharsFromString";
import TitleGold from "../Titles/TitleGold";
import ArrowIcon from "@/public/Icons/ArrowIcon";

type TComponentProps = {
  className?: string;
  items: {
    id: number | string;
    url: string;
    family?: string;
    child?: string;
    combination_id?: string;
  }[];
};

const SliderDreamFabric = ({ className, items }: TComponentProps) => {
  // console.log('SliderDreamFabric -> items:', items);

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

  return (
    <>
      <div className="container">
        {/* <TitleBigWithSubtitle
						subTitle="explore your"
						title="Dreamfabrics."
					/> */}
        {/* <TitleGold
						title="explore your Dreamfabrics."
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
          title="DREAMfabrics"
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
            "SliderDreamFabric",
            // 'grid grid-flow-col gap-[20px]',
            // 'auto-cols-[100%] md:auto-cols-[calc((100%-1*20px)/2)] lg:auto-cols-[calc((100%-3*20px)/4)] 2xl:auto-cols-[calc((100%-4*20px)/4)]',
            "flex items-stretch gap-[20px]",
            "pt-[20px] md:pb-10 lg:pb-[58px] pb-[20px]",
            // 'scrollbar-x-thin',
            "overflow-x-auto overflow-y-hidden",
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
          {items.map((item) => (
            <Link
              href={`#combination-${item.combination_id}`}
              key={item.id}
              className={cn(
                "SliderItem",
                "relative",
                "rounded-[16px]",
                "group",
                "bg-white",
                "flex flex-col items-center justify-center",
                "px-[20px] py-[30px]",
                "sm:w-[300px] xl:w-[400px]",
                "aspect-square",
                "overflow-hidden",
                "shrink-0",
                "cursor-pointer",
                "transition-all duration-300",
                "hover:scale-[1.01] shadow-xl/10 hover:shadow-xl/20 "
              )}
            >
              {/* TITLE */}
              <div className="flex flex-col items-center justify-center sm:mb-0 mb-3">
                <h2
                  className={cn(
                    "break-words text-center font-extrabold text-neutral-800 uppercase leading-none tracking-[-0.02em] opacity-90",
                    "selection:bg-[#F97352] selection:text-white",
                    "!leading-none",
                    "text-[15px] lg:text-[30px]",
                    "mb-[5px]"
                  )}
                >
                  {removeCharsFromString(item.family ?? "")}
                </h2>
                <span className="text-center align-baseline font-light text-neutral-800 text-xs uppercase leading-none tracking-[0.7em] selection:bg-[#F97352] selection:text-white">
                  {removeCharsFromString(item.child ?? "")}
                </span>
              </div>
              {/* IMAGE */}
              <div className="relative">
                {item.url && (
                  <Image
                    src={item.url}
                    alt={`item`}
                    width={700}
                    height={700}
                    className={cn(
                      "ImageProduct",
                      "w-[200px] md:w-[300px] lg:w-[300px] 2xl:w-[400px]",
                      "object-contain",
                      "aspect-3/2 w-auto"
                      // 'grow-1',
                    )}
                  />
                )}
                {/* <BoxShadow className="" /> */}
              </div>
              {/* BUTTON FAVORITE */}
              <button
                className={cn(
                  "ButtonFavorite",
                  "absolute z-[20]",
                  "top-[20px] right-[20px] text-black hover:text-red-500",
                  "cursor-pointer",
                  "transition-colors duration-200",
                  favorites.has(item.id) ? "text-red-500" : "text-black"
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
              <ArrowIcon className="lg:size-4 size-3 absolute z-[20] bottom-[20px] right-[20px]" />
              {/* SWATCH */}
              {/* <div
								className={cn(
									'absolute',
									'z-[10]',
									'top-[10px] left-[10px]',
									'gap-[10px]',
									'flex-col items-center justify-between',
									'hidden lg:flex',
								)}
							>
								<span
									className={cn(
										'font-semibold text-black uppercase',
										'text-[12px] lg:text-[15px]',
									)}
								>
									{item?.style}
								</span>
								{item.swatchUrl && (
									<Image
										src={item.swatchUrl}
										alt={`item`}
										width={50}
										height={50}
										className={cn(
											'rounded-[8px]',
											'h-[30px] w-[30px] lg:h-[50px] lg:w-[50px]',
										)}
									/>
								)}
							</div> */}
            </Link>
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

          {/* SLIDES CONTROLS */}
          <div
            className={cn(
              "SliderControls",
              "flex justify-end",
              "gap-[20px]"
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

export default SliderDreamFabric;
