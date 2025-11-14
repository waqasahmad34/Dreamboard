"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
// import image_banner_default from '@/public/images/bg-banner.jpg';
import Link from "next/link";
import { useRef } from "react";
import Overlay from "@/components/Overlay";
import { cn } from "@/lib/utils";

interface IComponentProps {
  className?: string;
  imageUrl: string;
  title?: string;
  swatches: {
    id: string;
    url: string;
    family?: string;
    child?: string;
    combination_id?: string | number;
  }[];
}

import image_wood from "@/public/images/banners/wood.png";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import ArrowIcon from "@/public/Icons/ArrowIcon";

const BannerBoxRightSwatches = ({
  className,
  title = "Your dreamboard",
  imageUrl,
  swatches,
}: IComponentProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div
      className={cn(
        "BannerBoxRightSwatches",
        "relative",
        "grid grid-cols-1 lg:grid-cols-3",
        "p-[20px] lg:p-[50px]",
        "pb-[120px] lg:pb-[48px]",
        "mb-[100px] lg:mb-[200px]",
        "gap-[50px] lg:gap-[20px]",
        "min-h-[500px] lg:min-h-[800px]",
        "rounded-[16px]",
        // 'overflow-hidden',
        className
      )}
    >
      {/* OVERLAY */}
      <Overlay className="rounded-[16px] bg-black/10" />

      {/* BACKGROUND */}
      <Image
        className={cn("h-auto", "w-full", "object-cover", "rounded-[16px]")}
        src={image_wood}
        alt="Banner"
        fill
      />

      {/* LEFT */}
      <motion.div
        className={cn(
          "relative z-[2]",
          "rounded-[16px]",
          "flex items-center justify-center",
          "flex-col",
          "text-white",
          "col-span-1 lg:col-span-2"
          // 'bg-white',
        )}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <div className="flex flex-col items-center justify-center lg:items-start">
          <motion.span
            className={cn(
              "font-semibold uppercase tracking-[30px]",
              "text-center",
              "text-[15px] sm:text-[20px] lg:text-[40px]",
              "mb-[10px]",
              "lg:pl-[100px]"
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            your
          </motion.span>
          <motion.h2
            className={cn(
              "!leading-none font-[400] font-es-wf",
              "text-[80px] sm:text-[100px] lg:text-[180px]"
            )}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: "easeOut",
            }}
          >
            Selections
          </motion.h2>
        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        className={cn(
          "relative z-[1]",
          "flex items-center justify-center",
          "gap-[10px]",
          "flex-col",
          "rounded-[16px]",
          "overflow-hidden",
          "col-span-1"
          // 'p-[50px]',
        )}
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeOut",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          <Image
            className={cn(
              "h-full w-full object-cover",
              "aspect-square",
              "overflow-hidden",
              "rounded-[16px]"
            )}
            src={imageUrl}
            alt="Banner"
            width={1500}
            height={1000}
            // fill
          />
        </motion.div>
        {/* <motion.ul
          className="flex w-full items-center justify-center gap-[10px]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.6,
            delay: 0.7,
            ease: 'easeOut',
          }}
        >
          <li className="h-[70px] grow-1 rounded-[16px] bg-[#c5a00a]"></li>
          <li className="h-[70px] grow-1 rounded-[16px] bg-[#8ed2c7]"></li>
          <li className="h-[70px] grow-1 rounded-[16px] bg-[#c8938a]"></li>
        </motion.ul> */}
      </motion.div>

      {/* SWATCHES */}
      <motion.ul
        ref={ref}
        className={cn(
          "ListSwatches",
          "z-[10]",

          "absolute",
          "-translate-x-1/2 left-1/2",
          "bottom-[-100px] lg:bottom-[-150px]",
          "col-span-1 lg:col-span-3",
          "gap-3 xs:gap-[20px]",
          "text-white",
          "text-center",
          "overflow-x-auto",
          "scrollbar-hide",
          "flex items-center justify-start",
          "max-w-full",
          "w-full",
          "lg:self-center lg:justify-self-center",
          "px-5 sm:px-[30px]",
          "pt-[30px] pb-[58px] lg:pb-[58px]"
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
        {swatches?.map((swatch, index) => (
          <motion.li
            key={swatch.id}
            className={cn(
              "rounded-[16px] bg-[#ece4dd]",
                "p-[10px] lg:p-[15px]",
              "flex flex-col items-center justify-center",
              "shrink-0",
              // 'shadow-2xl',
              "shadow-lg sm:shadow-[-6px_9px_17px_7px_rgba(0,0,0,0.4)]",
              "transition-all duration-300 ease-in-out hover:scale-105",
              "group",
              "w-[160px] sm:w-[175px] lg:w-[200px]"
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
                width={200}
                height={200}
                className={cn(
                  "SwatchImage",
                
                  "aspect-square",
                  "max-w-full",
                  "shrink-1 grow-0",
                  "object-contain",
                  "h-auto w-auto",
                  "select-none"
                  // 'transition-all duration-300 ease-in-out',
                  // 'group-hover:scale-105',
                )}
              />
              <div className="flex items-center justify-between gap-2">
                <span className="block w-full text-center text-[#a7a19a] text-sm">
                  {capitalizeFirstLetter(swatch?.family || "")}
                  <span className="mx-1 sm:mx-[5px]">|</span>
                  {capitalizeFirstLetter(swatch?.child || "")}
                </span>
                <ArrowIcon className="lg:size-3 size-2 mb-0.5" />
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default BannerBoxRightSwatches;
