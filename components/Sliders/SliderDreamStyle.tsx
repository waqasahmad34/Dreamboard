import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import BoxShadow from "@/components/BoxShadow";
import { useSliderProgress } from "@/components/Sliders/SliderProgressBar/hooks/useSliderProgress";
import SliderProgressBar from "@/components/Sliders/SliderProgressBar/SliderProgressBar";
import TitleGold from "@/components/Titles/TitleGold";
// import type { ColorPaletteItem } from '@/types/ICombinationMetadata';
import cn from "@/utils/cn";
import removeCharsFromString from "@/utils/removeCharsFromString";

type TComponentProps = {
  className?: string;
  items: {
    id: number | string;
    productUrl: string;
    swatchUrl: string;
    style?: string;
    family?: string;
    type?: string;
    swatchFamily?: string;
    swatchChild?: string;
  }[];
};

const SliderDreamStyle = ({ className, items }: TComponentProps) => {
  // console.log('SliderDreamStyle -> items:', items);

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
      {/* <TitleBigWithSubtitle
				subTitle="explore your"
				title="Dreamstyles."
			/> */}
      {/* <TitleGold
				title="explore your Dreamstyles."
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
        title="DREAMstyles"
        subtitle="DIVE IN & EXPLORE YOUR"
        text="From Room to Revolution: Design your Ultimate Modular Sectional"
        className="mb-[30px]"
      />

      <div className="flex flex-col gap-[20px]">
        {/* SLIDES */}
        <div
          ref={sliderContainerRef}
          className={cn(
            "SliderDreamStyle",
            "flex gap-[20px]",
            "pt-[20px] md:pb-10 lg:pb-[58px] pb-[20px] ",
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
              "cursor-pointer",
              "overflow-hidden",
              // 'sm:w-[calc((100vw-640px)/2+0px)]',
              // 'md:w-[calc((100vw-768px)/2+0px)]',
              "sm:w-[calc((100vw-600px)/2+0px)]",
              "lg:w-[calc((100vw-1100px)/2+0px)]",
              "xl:w-[calc((100vw-1100px)/2+40px)]",
              "2xl:w-[calc((100vw-1100px)/2+0px)]",
              "aspect-square",
              "shrink-0"
            )}
            key={"first-slide-dreamboards"}
          />

          {/* OTHER SLIDES */}
          {items.map((item) => {
            const productFamily = item.family;
            const productType = item.type;
            const swatchFamily = item.swatchFamily;
            const swatchChild = item.swatchChild;

            const productUrl = `https://www.dreamsofa.com/products/${productFamily?.toLowerCase()}-${productType?.toLowerCase()}?fabric=${swatchFamily}-${swatchChild}`;
            return (
              <div
                className={cn(
                  "SliderItem",
                  "relative",
                  "group",
                  "transition-all duration-300",
                  "bg-white",
                  "cursor-pointer",
                  "hover:scale-[1.01] hover:shadow-xl/20 shadow-xl/10 ",
                  "rounded-[16px]",
                  "flex flex-col items-center justify-center",
                  // 'px-[20px] py-[30px]',
                  "w-[calc(100vw-(2*45px))] sm:w-[300px] md:w-[300px] lg:w-[400px]",
                  "aspect-square",
                  "shrink-0",
                  "overflow-hidden"
                )}
                key={item.id}
              >
                {/* TITLE */}
                <div className="mb-[10px] flex flex-col items-center justify-center">
                  <h2
                    className={cn(
                      "break-words text-center font-extrabold text-neutral-800 uppercase leading-none tracking-[-0.02em] opacity-90",
                      "selection:bg-[#F97352] selection:text-white",
                      "text-[15px] lg:text-[20px]"
                    )}
                  >
                    {item.family}
                  </h2>
                  <span className="!leading-none text-center align-baseline font-light text-neutral-800 text-xs uppercase tracking-[0.7em] selection:bg-[#F97352] selection:text-white">
                    {item.type}
                  </span>
                </div>

                {/* IMAGE */}
                <div className={cn("relative", "w-[100%]", "aspect-3/2")}>
                  {item.productUrl && (
                    <Image
                      src={item.productUrl}
                      alt={`item`}
                      width={700}
                      height={700}
                      className={cn(
                        "ImageProduct",
                        "object-contain",
                        "w-full",
                        "h-full"
                      )}
                    />
                  )}
                  <BoxShadow className="" />
                </div>

                {/* PRICE */}
                {/* <div
								className={cn(
									'flex flex-col items-center justify-center',
									'text-[#333230]',
									'transition-opacity duration-300',
									'group-hover:opacity-0',
								)}
							>
								<span className="font-semibold text-[12px] uppercase lg:text-[15px]">
									Starting at
								</span>
								<p
									className={cn(
										'inline-block break-words text-center align-middle font-semibold uppercase leading-none',
										'text-[15px] lg:text-[30px]',
									)}
								>
									$
									<span className="text-center align-baseline font-semibold uppercase leading-none">
										2359
									</span>
								</p>
							</div> */}

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

                {/* BUTTON ACTION */}
                <div
                  className={cn(
                    "absolute",
                    "z-[10]",
                    "bottom-[20px] left-1/2",
                    "-translate-x-1/2",
                    "transition-opacity duration-300",
                    // "opacity-0",
                    // "group-hover:opacity-100",
                    "flex items-center justify-center gap-[20px]",
                    "text-[12px] lg:text-[15px]"
                  )}
                >
                  <a
                    className={cn(
                      "cursor-pointer whitespace-nowrap p-[10px] uppercase border ",
                      "rounded-[16px]",
                      "text-black group-hover:text-white",
                      "transition-all duration-300",
                      " bg-white group-hover:bg-black",
                      "hover:bg-black/80"
                    )}
                    type="button"
                    href={productUrl}
                    // target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative top-[2px]">Shop now</span>
                  </a>
                  {/* <a
                    className={cn(
                      'cursor-pointer whitespace-nowrap p-[10px] uppercase',
                      'rounded-[16px]',
                      'text-white',
                      'transition-all duration-300',
                      'bg-black',
                      'hover:bg-black/80',
                    )}
                    type="button"
                    href="#dreamrooms"
                  >
                    <span className="relative top-[2px]">Your room</span>
                  </a> */}
                </div>

                {/* SWATCH */}
                <div
                  className={cn(
                    "absolute",
                    "z-[10]",
                    "top-[10px] left-[10px]",
                    "gap-[5px] xl:gap-[10px]",
                    "flex-col items-center justify-between",
                    "hidden lg:flex"
                  )}
                >
                  <span
                    className={cn(
                      "font-semibold text-black uppercase",
                      "text-[10px] lg:text-[12px] xl:text-[15px]"
                    )}
                  >
                    {/* {removeCharsFromString(item?.style ?? '')} */}
                    {removeCharsFromString(item.swatchFamily ?? "")}
                  </span>
                  {item.swatchUrl && (
                    <Image
                      src={item.swatchUrl}
                      alt={`item`}
                      width={50}
                      height={50}
                      className={cn(
                        "rounded-[8px]",
                        "size-[25px] lg:size-[30px] xl:size-[50px]"
                      )}
                    />
                  )}
                </div>
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

export default SliderDreamStyle;
