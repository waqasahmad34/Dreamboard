"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import ListColorsAndSwatches from "@/components/Lists/ListColorsAndSwatches";
import { cn } from "@/lib/utils";

interface IComponentProps {
  className?: string;
  imageUrlRoom?: string;
  imageUrlMoodboard?: string;
  imageUrlFinalRoom?: string;
  style?: string;
}

import image_wood from "@/public/images/banners/wood.png";
import image_paper from "@/public/images/bg-paper.png";

import capitalizeEachWord from "@/utils/capitalizeEachWord";
import getStyleImage from "@/utils/getStyleImage";
import removeCharsFromString from "@/utils/removeCharsFromString";

const Banner4CardStacked = ({
  className,
  imageUrlRoom,
  imageUrlMoodboard,
  imageUrlFinalRoom,
  style,
}: IComponentProps) => {
  // console.log('style', style);

  // const classNameShadow = 'shadow-[-20px_40px_50px_-20px_rgba(0,0,0,0.5)]';
  const classNameShadow = "shadow-[-20px_20px_60px_-10px_rgba(0,0,0,0.5)]";
  const classNameDesktopShadow =
    "lg:shadow-[-20px_20px_60px_-10px_rgba(0,0,0,0.5)]";

  const classNameTileImage = cn([
    // 'w-[100px] sm:w-[150px] md:w-[200px] lg:w-[400px]',
    // 'w-[15vw]',
    "w-[25vw] sm:w-[25vw] min-[1280px]:w-[25vw] 2xl:w-[20vw]",
    "aspect-[2/3] rounded-[8px] sm:rounded-[16px] object-cover",
    "shadow-lg",
  ]);

  const classNameTilesStacked1 = cn();
  //
  // 'left-[-45px] lg:left-[-150px]',
  const classNameTilesStacked2 = cn(
    //
    // 'left-[-30px] lg:left-[-100px]',
    "left-[-2vw]"
  );
  const classNameTilesStacked3 = cn(
    //
    // 'left-[-60px] lg:left-[-200px]',
    "left-[-4vw]"
  );
  const classNameTilesStacked4 = cn(
    //
    // 'left-[-90px] lg:left-[-300px]',
    "left-[-6vw]"
  );

  return (
    <div
      className={cn(
        "Banner4CardStacked",
        "relative",
        "z-[1]",
        "flex flex-col",
        "items-center justify-start",
        "min-[1024px]:pb-[31vw] 2xl:pb-[23vw] sm:pb-[27vw] pb-[23vw] min-[1300px]:pt-0 lg:pt-12 ",
        // 'overflow-hidden',
        className
      )}
    >
      {/* TOP TEXT */}
      <motion.span
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.1,
        }}
        className={cn(
          "font-es-wf",
          "font-[100] leading-none",
          "text-[50px] sm:text-[100px] lg:text-[150px]",
          "text-center",
          "relative z-[10]",
          "text-white"
        )}
      >
        Welcome Amanda
      </motion.span>

      {/* BACKGROUND */}
      {imageUrlRoom && (
        <div className="absolute aspect-[16/9] max-h-[600px] w-full">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              className={cn("h-auto w-full object-cover blur")}
              src={imageUrlRoom}
              alt="Banner"
              fill
            />
            {/* <div className="absolute bottom-0 h-[20px] w-full bg-white" /> */}
          </div>
        </div>
      )}

      {/* BOX */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2,
        }}
        className={cn(
          "Box",
          "relative",
          "z-[10]",
          "flex flex-col",
          "items-center justify-start w-full max-w-[80vw] min-[1530px]:max-w-[60vw] ",
          "bg-[#e4ddd2]",
          "rounded-[16px]",
          "px-[50px] lg:px-[200px]",
          "pt-7 sm:pt-[35px]",
          "pb-[74px] sm:pb-[83px] lg:pb-[200px]"
          // "max-w-full"
        )}
      >
        {/* BG */}
        <Image
          className={cn("absolute inset-0 z-[-1]")}
          src={image_paper}
          alt="bg-tile-paper"
          fill
        />

        {/* TITLE */}
        <div className="flex flex-col items-center justify-center">
          <span
            className={cn(
              "text-[12px] lg:text-[15px]",
              "font-bold uppercase tracking-[15px]",
              "mb-[26px] sm:mb-[20px]"
            )}
          >
            Meet your
          </span>
          <h2
            className={cn(
              "mt-[-30px] font-brand text-transparent uppercase",
              "text-[36px] min-[375px]:text-[48px] min-[550px]:text-[60px] sm:text-[70px] md:text-[80px] min-[1024px]:text-[100px] lg:text-[130px]",
              "bg-clip-text"
            )}
            style={{
              backgroundImage: `url(${imageUrlRoom || ""})`,
              backgroundSize: "2000px 1000px",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            Dreamboard
          </h2>
        </div>

        {/* SWATCHES */}
        <ListColorsAndSwatches
          className="mb-[20px]"
          items={[
            { color: "#c0c3bb" },
            { color: "#ce9527" },
            { color: "#928665" },
            { color: "#342a11" },
          ]}
        />
        {/* <span
          className={cn(
            'font-bold uppercase tracking-[15px]',
            'text-[10px] md:text-[12px] lg:text-[15px]',
            'mb-[20px]',
            'text-center',
          )}
        >
          inspired by life.designed by you
        </span> */}

        {/* TILES */}
        <div
          className={cn(
            "absolute",
            "top-[calc(100%-75px)]",
            "lg:top-[calc(100%-200px)]",
            "left-1/2 translate-x-[calc(-50%+3vw)]"
          )}
        >
          <div
            className={cn(
              "TilesStacked",
              "flex items-center justify-center",
              "",
              "relative"
            )}
          >
            {/* TILE 1 */}
            {image_wood && (
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 1.2,
                }}
                className={cn(
                  "relative",
                  "z-[1]",
                  "shrink-0",
                  "rounded-[16px]",
                  "transition-all duration-300 ease-out",
                  "hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl",
                  classNameTilesStacked1,
                  classNameShadow
                )}
              >
                <Image
                  className={classNameTileImage}
                  src={image_wood}
                  alt="Banner"
                  width={1080}
                  height={395}
                />
              </motion.div>
            )}

            {/* TILE 2 */}
            {imageUrlMoodboard && (
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 1.4,
                }}
                className={cn(
                  "relative",
                  "z-[2]",
                  "shrink-0",
                  "transition-all duration-300 ease-out",
                  "hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl",
                  classNameTilesStacked2,
                  classNameDesktopShadow
                )}
              >
                <Image
                  className={classNameTileImage}
                  src={imageUrlMoodboard}
                  alt="Banner"
                  width={1080}
                  height={395}
                />
              </motion.div>
            )}

            {/* TILE 3 */}
            {imageUrlFinalRoom && (
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 1.6,
                }}
                className={cn(
                  "relative",
                  "z-[3]",
                  "shrink-0",
                  "transition-all duration-300 ease-out",
                  "hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl",
                  classNameTilesStacked3,
                  classNameDesktopShadow
                )}
              >
                <Image
                  className={classNameTileImage}
                  src={imageUrlFinalRoom}
                  alt="Banner"
                  width={1080}
                  height={395}
                />
              </motion.div>
            )}

            {/* TILE 4 */}
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 1.8,
              }}
              className={cn(
                "relative",
                "z-[4]",
                "shadow-lg",
                "rounded-[8px] sm:rounded-[16px]",
                "overflow-hidden",
                "text-white",
                "shrink-0",
                "transition-all duration-300 ease-out",
                "hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl",
                classNameTilesStacked4,
                classNameShadow
              )}
            >
              <div
                className={cn(
                  "absolute",
                  "left-[50%] translate-x-[-50%]",
                  "top-[50%] translate-y-[-50%]",
                  "flex flex-col items-center justify-center",
                  // 'top-[20px] lg:top-[130px]',
                  ""
                )}
              >
                <span
                  className={cn(
                    "font-bold uppercase tracking-[5px]",
                    "text-[8px] min-[550px]:text-[14px] md:text-[16px] lg:text-[25px]",
                    "mb-[10px] lg:mb-[50px]",
                    "text-center"
                  )}
                >
                  Style
                </span>
                <span
                  className={cn(
                    "font-es-wf",
                    "!leading-none",
                    "font-[100]",
                    "text-[24px] min-[550px]:text-[40px] md:text-[50px] lg:text-[80px]",
                    "text-center",
                    "relative z-[10]",
                    "text-white",
                    "lg:mt-[-30px]"
                  )}
                >
                  {capitalizeEachWord(removeCharsFromString(style || ""))}
                </span>
              </div>
              <Image
                className={classNameTileImage}
                src={getStyleImage(style || "", "portrait")}
                alt="Banner"
                width={1080}
                height={395}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner4CardStacked;
