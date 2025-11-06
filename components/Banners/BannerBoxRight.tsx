"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Overlay from "@/components/Overlay";
import { cn } from "@/lib/utils";
import image_banner_default from "@/public/images/bg-banner.jpg";
import capitalizeEachWord from "@/utils/capitalizeEachWord";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import removeCharsFromString from "@/utils/removeCharsFromString";

interface IComponentProps {
  className?: string;
  imageUrl?: string;
  title?: string;
  userDescription?: string;
  roomStyle?: string;
}

const BannerBoxRight = ({
  className,
  title = "Your dreamboard",
  imageUrl,
  userDescription,
  roomStyle,
}: IComponentProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-100px",
  });

  const processedRoomStyle = capitalizeFirstLetter(
    removeCharsFromString(roomStyle || "")
  );
  return (
    <div
      ref={ref}
      className={cn(
        "BannerBoxRight",
        "relative",
        "grid grid-cols-1 lg:grid-cols-[1fr_0.75fr]",
        "p-[20px] lg:p-[50px]",
        "gap-[20px] lg:gap-[20px]",
        "lg:min-h-[900px]",
        "overflow-hidden",
        "rounded-[16px]",
        className
      )}
    >
      {/* OVERLAY */}
      <Overlay className="bg-black/10" />

      {/* BACKGROUND */}
      <Image
        className={cn("h-auto w-full object-cover")}
        src={imageUrl || image_banner_default}
        alt="Banner"
        fill
      />

      {/* LEFT HEADING*/}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: isInView ? 0.8 : 0,
        }}
        className={cn(
          "relative z-[1]",
          "rounded-[16px]",
          "flex items-center justify-center",
          "flex-col",
          "text-white"
          // 'bg-white',
        )}
      >
        <span
          className={cn(
            "font-bold uppercase tracking-[20px]",
            "text-[20px] lg:text-[40px]"
          )}
        >
          your
        </span>
        <span></span>
        <h2
          className={cn(
            "font-es-wf",
            "font-[400] leading-none",
            "text-[100px] lg:text-[200px]",
            "mt-[-20px] lg:mt-[-50px]"
          )}
        >
          Style
          {/* {roomStyle} */}
        </h2>
      </motion.div>

      {/* BOX RIGHT */}
      <motion.div
        animate={{
          x: isInView ? 0 : 100,
          opacity: isInView ? 1 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: isInView ? 0.8 : 0,
        }}
        className={cn(
          "relative z-[10]",
          "rounded-[16px] shadow-xl",
          "bg-[rgba(192,170,142,0.5)]",
          "backdrop-blur-[5px]",
          "flex items-center justify-center",
          "text-[#ffffff]",
          "flex-col",
          "p-[20px] lg:p-[50px]"
        )}
      >
        <div
          className={cn(
            "flex w-[100%] flex-col items-center justify-center",
            "w-[100%] lg:w-[90%]"
          )}
        >
          <h2
            className={cn(
              "mb-[10px] lg:mb-[30px]",
              "font-es-wf font-normal leading-none",
              "text-[50px] lg:text-[100px] text-center"
            )}
          >
            {capitalizeEachWord(processedRoomStyle)}
          </h2>
          {/* <span
            className={cn(
              'mb-[30px] font-bold uppercase',
              'tracking-[12px] md:tracking-[20px]',
              'text-[15px] lg:text-[20px]',
            )}
          >
            {processedRoomStyle}
          </span> */}
          <p
            className={cn(
              "text-[15px] lg:text-[20px]",
              "lg:text-left",
              "font-normal"
            )}
          >
            {userDescription}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BannerBoxRight;
