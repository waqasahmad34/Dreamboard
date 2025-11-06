import Image from "next/image";
import Link from "next/link";
import BoxShadow from "@/components/BoxShadow";
import CarouselEmblaBasic from "@/components/Carousels/CarouselEmblaBasic";
import DialogRadix from "@/components/DialogRadix";
import ListShareSocial from "@/components/Lists/ListShareSocial";
// import { XIcon } from 'lucide-react';
// import BoxShadow from '@/components/BoxShadow';
// import ImageWithDialog from '@/components/ImageWithDialog';
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogOverlay,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
import cn from "@/utils/cn";
import ArrowIcon from "@/public/Icons/ArrowIcon";

type TComponentProps = {
  className?: string;
  data: any;
  productMetadata: any;
  swatchMetadata: any;
};

const GridWithBoxes = ({
  className,
  data,
  productMetadata,
  swatchMetadata,
}: TComponentProps) => {
  // console.log('GridWithBoxes -> data:', swatchMetadata);
  const slides = [
    { id: 1, title: "Slide 1", imageSrc: data.final_room_url },
    { id: 2, title: "Slide 2", imageSrc: data.mood_board_url },
  ];

  const swatchFamily = swatchMetadata?.family;
  const swatchChild = swatchMetadata?.child;

  const productFamily = productMetadata?.family;
  const productType = productMetadata?.type;
  const productUrl = `https://www.dreamsofa.com/products/${productFamily?.toLowerCase()}-${productType?.toLowerCase()}?fabric=${swatchFamily}-${swatchChild}`;
  return (
    <div
      className={cn(
        "GridWithBoxes",
        "gap-[20px]",
        // 'h-full',
        "grid",
        "grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1",
        className
      )}
    >
      {/* LEFT / TOP */}
      <div className="flex flex-col gap-[20px]">
        {/* IMAGE PRODUCT */}
        <Link
          className={cn(
            "ImageProduct",
            "flex flex-col items-center justify-center",
            "aspect-square",
            "rounded-[16px]",
            "bg-white",
            "shadow-lg",
            "py-[30px] lg:py-[0px]",
            "relative",
            "overflow-hidden",
            "transition-all duration-300",
            "hover:scale-102",
            "cursor-pointer"
          )}
          href={productUrl}
          // target="_blank"
        >
          {/* TITLE */}
          <div className="flex items-center justify-center gap-2">
            <h2 className="mt-5 break-words text-center font-extrabold text-3xl text-neutral-800 uppercase leading-none tracking-[-0.02em] opacity-90 selection:bg-[#F97352] selection:text-white">
              {productFamily}{" "}
              <span className="custom-styles-2 mx-0 mt-2 mb-0 block p-0 text-center align-baseline font-light text-neutral-800 text-xs uppercase leading-none tracking-[0.7em] selection:bg-[#F97352] selection:text-white">
                {productType}
              </span>
            </h2>
            <ArrowIcon className="size-4" />
          </div>

          {/* IMAGE */}
          <div className={cn("relative", "w-full", "aspect-3/2")}>
            <Image
              src={data.styled_product_url}
              alt={`styled_product_url`}
              width={400}
              height={400}
              className={cn("object-cover", "h-full", "w-full", "object-left")}
            />
            <BoxShadow className="" />
          </div>

          {/* PRICE */}
          {/* <div
            className={cn(
              'flex flex-col items-center justify-center',
              'text-[#333230]',
              'mb-[40px] lg:mb-0',
            )}
          >
            <span className="font-semibold text-[15px] uppercase">
              Starting at
            </span>
            <p className="inline-block break-words text-center align-middle font-semibold text-3xl uppercase leading-none selection:bg-[#F97352] selection:text-white">
              $
              <span className="text-center align-baseline font-semibold uppercase leading-none selection:bg-[#F97352] selection:text-white">
                2359
              </span>
            </p>
          </div> */}

          {/* <ListShareSocial
            className={cn(
              'flex-row',
              'gap-[5px]',
              'absolute z-[10]',
              'bottom-[10px]',
              'right-[50%] translate-x-[50%]',
              // 'right-[10px]'
            )}
            withMobileClasses={false}
          /> */}
        </Link>

        {/* Two small square boxes */}
        <div className="grid grid-cols-2 gap-[20px]">
          {/* BOX 1 : SWATCH */}
          <div className="relative">
            <DialogRadix
              trigger={
                <div
                  className={cn(
                    "relative flex h-full w-full items-center justify-center",
                    "transition-all duration-300",
                    "rounded-[16px] hover:scale-101 hover:shadow-md",
                    "aspect-square shadow-lg"
                  )}
                >
                  <Image
                    src={data.swatch_url}
                    alt={`swatch_url`}
                    width={100}
                    height={100}
                    className={cn(
                      "aspect-square",
                      "grow-0",
                      "object-contain",
                      "size-[100px] sm:size-[190px]"
                    )}
                  />
                </div>
              }
              content={
                <div
                  className={cn(
                    "relative",
                    "flex items-center justify-center",
                    "min-w-[200px] sm:min-w-auto",
                    "max-w-[200px] lg:max-w-[500px]",
                    "max-h-[90vh]",
                    "aspect-square",
                    "rounded-[16px]",
                    "overflow-hidden"
                  )}
                >
                  <Image
                    src={data.swatch_url}
                    alt={`swatch_url`}
                    width={300}
                    height={300}
                    className="aspect-square object-contain"
                  />
                  <ListShareSocial
                    className={cn(
                      "absolute bottom-[10px] bg-white left-[50%] z-[10] translate-x-[-50%]"
                    )}
                    withMobileClasses={false}
                    title="Check out this swatch!"
                    description="I found this swatch on DreamSofa.com and I thought you might like it too!"
                    media={data.swatch_url}
                  />
                </div>
              }
            />
            <ListShareSocial
              className={cn(
                "absolute bottom-[10px] bg-white/50 shadow-lg border-white/20 hover:bg-white left-[50%] z-[10] translate-x-[-50%]"
              )}
              withMobileClasses={false}
              title="Check out this swatch!"
              description="I found this swatch on DreamSofa.com and I thought you might like it too!"
              media={data.swatch_url}
            />
          </div>

          {/* BOX 2 : SWATCH */}
          <div className="relative">
            <DialogRadix
              trigger={
                <div
                  className={cn(
                    "relative flex h-full w-full items-center justify-center",
                    "transition-all duration-300",
                    "rounded-[16px] hover:scale-101 hover:shadow-md",
                    "aspect-square shadow-lg"
                  )}
                >
                  <Image
                    src={data.swatch_url}
                    alt={`swatch_url`}
                    width={100}
                    height={100}
                    className={cn(
                      "aspect-square",
                      "grow-0",
                      "object-contain",
                      "size-[100px] sm:size-[190px]"
                    )}
                  />
                </div>
              }
              content={
                <div
                  className={cn(
                    "relative",
                    "flex items-center justify-center",
                    "min-w-[200px] sm:min-w-auto",
                    "max-w-[200px] lg:max-w-[500px]",
                    "max-h-[90vh]",
                    "aspect-square",
                    "rounded-[16px]",
                    "overflow-hidden"
                  )}
                >
                  <Image
                    src={data.swatch_url}
                    alt={`swatch_url`}
                    width={300}
                    height={300}
                    className="aspect-square object-contain"
                  />
                  <ListShareSocial
                    className={cn(
                      "absolute bottom-[10px] left-[50%] z-[10] translate-x-[-50%]"
                    )}
                    withMobileClasses={false}
                    title="Check out this swatch!"
                    description="I found this swatch on DreamSofa.com and I thought you might like it too!"
                    media={data.swatch_url}
                  />
                </div>
              }
            />
            <ListShareSocial
              className={cn(
                "absolute bottom-[10px] bg-white/50 shadow-lg border-white/20 hover:bg-white left-[50%] z-[10] translate-x-[-50%]"
              )}
              withMobileClasses={false}
              title="Check out this swatch!"
              description="I found this swatch on DreamSofa.com and I thought you might like it too!"
              media={data.swatch_url}
            />
          </div>
        </div>
      </div>

      {/* Right Column */}

      <div className="flex flex-col">
        {/* Big rectangular box with carousel */}
        <div
          className={cn(
            "flex items-center justify-center",
            "bg-gray-200",
            "rounded-[16px]",
            "overflow-hidden",
            "h-full w-full",
            "relative",
            "shadow-lg"
            // 'p-[50px]',
          )}
        >
          <Image
            src={data.final_room_url}
            alt={`final_room_url`}
            fill
            className="h-full w-full object-cover object-left"
          />

          {/* CAROUSEL */}
          <CarouselEmblaBasic slides={slides} autoplay={3000} />
        </div>
      </div>
    </div>
  );
};

export default GridWithBoxes;
