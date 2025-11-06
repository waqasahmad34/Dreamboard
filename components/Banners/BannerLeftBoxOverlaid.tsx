"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import image_wood from "@/public/images/banners/wood.png";
import image_banner_default from "@/public/images/bg-banner.jpg";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
// import TitleBigWithSubtitle from '../Titles/TitleBigWithSubtitle';
import BannerVideo from "./BannerVideo";
import ArrowIcon from "@/public/Icons/ArrowIcon";

interface IComponentProps {
  className?: string;
  imageUrl?: string;
  title?: string;
  swatches?: {
    id: string;
    url: string;
    family?: string;
    child?: string;
    combination_id?: string | number;
  }[];
  moodboardUrl?: string;
  videoUrl?: string;
}

const BannerLeftBoxOverlaid = ({
  className,
  imageUrl,
  swatches,
  videoUrl,
  moodboardUrl,
}: IComponentProps) => {
  const ref = useRef(null);
  // const boxRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  // const isBoxInView = useInView(boxRef, { once: true, amount: 0.15 });

  // console.log('swatches', swatches);

  return (
    <div
      className={cn(
        "BannerLeftBoxOverlaid",
        "relative",
        "sm:pb-[300px] xs:pb-[330px] pb-[300px]",
        "bg-white",
        "rounded-[16px]",
        // 'overflow-hidden',
        // 'rounded-[16px]',
        className
      )}
      ref={ref}
    >
      {/* <Overlay className="bg-black/10" /> */}

      {/* <div
        className={cn(
          'absolute top-0 left-0 z-[1]',
          'h-[300px] w-full',
          'bg-black',
        )}
      ></div> */}

      <div className="flex items-center justify-center overflow-hidden rounded-[16px]">
        {/* BACKGROUND */}
        <Image
          className={cn(
            "h-auto w-full",
            "lg:min-h-[500px]",
            "lg:max-h-[600px]",
            "object-cover object-center"
          )}
          src={imageUrl || image_banner_default}
          alt="Banner"
          width={1500}
          height={1000}
        />

        {/* BOX LEFT */}
        <motion.div
          // ref={boxRef}
          className={cn(
            "BoxMoodboard",
            "absolute",
            "z-[10]",
            "left-1/2 lg:left-[50px]",
            "-translate-x-1/2 lg:translate-x-0",
            // '-translate-y-1/2 lg:translate-y-0',
            "top-[50px] lg:top-auto lg:bottom-[-200px]",
            // 'leading-none',
            "rounded-[16px]",
            // 'h-[400px]',
            "w-[50%] sm:w-[40%] lg:w-[25%]",
            "overflow-hidden",
            "aspect-[2/3]",
            // 'shadow-2xl',
            "shadow-[-6px_9px_17px_7px_rgba(0,0,0,0.4)]"
          )}
          initial={{ opacity: 0, y: -100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.5,
          }}
        >
          <div className="relative h-full w-full">
            {/* IMAGE BOX */}
            <Image
              className={cn("h-full w-full", "object-cover object-center")}
              src={moodboardUrl || image_wood}
              alt="Banner"
              width={1500}
              height={1000}
            />
            {/* <div
              className={cn(
                'absolute',
                'z-[10]',
                '-translate-x-1/2 -translate-y-1/2 top-[50%] left-[50%]',
                'w-full',
                'h-full',
                'flex flex-col items-center justify-center',
                'gap-[15px]',
                'px-[15px]',
                'py-[30px]',
                'text-white',
              )}
            >
              <span
                className={cn(
                  'font-es-wf',
                  'text-center',
                  'text-[40px] lg:text-[80px]',
                )}
              >
                Amanda
              </span>
              <span
                className={cn(
                  'text-center font-bold uppercase',
                  'text-[15px] xs:text-[20px] lg:text-[30px]',
                  // 'break-all',
                )}
              >
                Your Dreamboard
              </span>
            </div> */}
          </div>
        </motion.div>

        {/* SWATCHES */}
        <motion.ul
          // ref={ref}
          className={cn(
            "ListSwatches",
            "absolute",
            "bottom-0",
            "z-[3]",
            "right-[10px] lg:bottom-[50px] bottom-0",
            "flex items-center justify-start",
            "gap-[20px]",
            "text-center",
            "max-w-full lg:max-w-[60vw]",
            "mr-[-10px] lg:mr-[0px]",
            "pl-5 pr-3 sm:pr-5 py-[20px]"

            // 'pl-[35vw]',
            // 'scrollbar-hide',

            // 'overflow-x-auto',
            // 'overflow-y-visible',
            // 'scrollbar-thin',
          )}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <ScrollArea
            className={cn("w-full", "whitespace-nowrap", "rounded-md")}
          >
            <div
              className={cn(
                // 'flex',
                "grid auto-cols-max grid-flow-col",
                "gap-3 xs:gap-[20px]",
                "p-[15px]"
                // 'w-max space-x-4 p-4',
              )}
            >
              {swatches?.map((swatch, index) => (
                <motion.li
                  key={swatch.id}
                  className={cn(
                    "bg-[#ece4dd]",
                    "shadow-2xl",
                    "p-[10px] lg:p-[15px]",
                    "rounded-[16px]",
                    "transition-all duration-300 ease-in-out",
                    "hover:scale-105",
                    "shrink-0",
                    " sm:w-[160px] md:w-[180px] lg:w-[200px]"
                  )}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: 100,
                      scale: 0.8,
                      rotate: 10,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      rotate: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                        duration: 0.6,
                      },
                    },
                  }}
                >
                  <Link
                    className="flex flex-col items-center justify-center"
                    href={`#combination-${swatch.combination_id}`}
                  >
                    <Image
                      src={swatch.url}
                      alt="swatch"
                      width={120}
                      height={120}
                      className="mb-[10px] w-[80px] xs:w-[120px] lg:w-[150px]"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "block text-center text-[#a7a19a]",
                          "text-[12px] sm:text-[15px]"
                        )}
                      >
                        {capitalizeFirstLetter(swatch?.family || "")}
                        <span className="mx-[5px]">|</span>
                        {capitalizeFirstLetter(swatch?.child || "")}
                      </span>
                      <ArrowIcon className="lg:size-3 size-2 mb-0.5" />
                    </div>
                  </Link>
                </motion.li>
              ))}
            </div>
            <ScrollBar className="custom-scrollbar" orientation="horizontal" />
          </ScrollArea>
        </motion.ul>
      </div>

      {/* VIDEO */}
      <BannerVideo
        className="absolute bottom-0 left-0 h-full w-full rounded-[16px]"
        videoUrl={videoUrl}
        // title="Dreamboard"
      />
    </div>
  );
};

export default BannerLeftBoxOverlaid;
