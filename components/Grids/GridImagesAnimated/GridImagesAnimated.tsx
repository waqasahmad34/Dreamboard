"use client";

import Image from "next/image";
import { useState } from "react";
import ListShareSocial from "@/components/Lists/ListShareSocial";
import cn from "@/utils/cn";
import ButtonComments from "./ButtonComments";
import FloatingReactions from "./SocialReactions/FloatingReactions";
import SocialReactions from "./SocialReactions/SocialReactions";
import TabsControls from "./Tabs/TabsControls";
import TabsItems from "./Tabs/TabsItems";

type TComponentProps = {
  className?: string;
  combination_id: string;
  data: {
    room_style_string: string;
    swatch_url: string;
    swatch_filename_string: string;
    final_room_url: string;
    styled_product_url: string;
    portrait: string;
    product_filename_string: string;
    colorPalette?: string[];
    colorPalleteFirstItem?: string;
    mood_board_url: string;
    sofa_type: string;
    index?: number;
  };
  productMetadata?: Record<string, any>;
  swatchMetadata?: Record<string, any>;
};

const GridImagesAnimated = ({
  className,
  combination_id,
  data,
  productMetadata,
  swatchMetadata,
}: TComponentProps) => {
  const final_room_url = data?.final_room_url;

  const [tab, setTab] = useState<number>(3);

  // Social reactions are now handled by the provider with scoped IDs

  return (
    <div
      className={cn(
        "GridImagesAnimated",
        "bg-white backdrop-blur-[16px]",
        "rounded-[16px]",
        "grid grid-cols-1 lg:grid-cols-12 lg:w-[92vw] sm:h-full lg:h-[70vh] max-h-[720px] lg:max-h-[620px] xl:max-h-[720px] lg:max-w-max",
        " lg:gap-[20px]",
        "p-[20px]",
        // "overflow-hidden",
        // 'w-[90vw]',
        // 'lg:w-[1000px]',
        // 'xl:w-[1200px]',
        // '2xl:w-[1500px]',
        // 'lg:aspect-[1300/710]',
        className
      )}
    >
      {/* LEFT AREA / TOP */}
      <div
        className={cn(
          "relative",
          "flex flex-col",
          "shrink-0",
          "lg:rounded-[16px]",
          "w-full lg:w-fit",
          " h-full lg:col-span-8",
          // 'overflow-hidden',
          // 'w-[80%]',
          // "aspect-[3/2]"
        )}
      >
        <Image
          src={final_room_url}
          alt="Final Room"
          className={cn("object-cover", "rounded-t-[16px] lg:rounded-[16px] lg:h-full lg:w-full")}
          width={1536}
          height={1024}
        />

        {/* SOCIAL REACTIONS */}
        <div
          className={cn(
            "ReactionsAndComments ",
            "absolute z-[30] ",
            "top-[3px] min-[360px]:top-[24px] sm:top-1/2 sm:translate-y-[-50%]",
            "lg:top-auto lg:translate-y-0",
            "lg:bottom-[10px]",
            "left-[10px]",
            "lg:left-[15%]",
            "lg:translate-x-[-50%]",
            // 'lg:-translate-x-1/2 lg:translate-y-0',
            "flex flex-col items-center",
            "lg:flex-row",
            "gap-[10px]"
          )}
        >
          <ListShareSocial
            className={cn(
              "flex"
              // 'absolute',
              // 'top-[0px] sm:-translate-y-1/2 sm:top-1/2 lg:top-auto lg:translate-y-0',
              // 'right-[20px] lg:right-auto',
              // 'lg:-translate-x-1/2 lg:bottom-[25px] lg:left-1/2',
            )}
            media={final_room_url}
          />
          <SocialReactions
            className={cn()}
            idData={`combination-state-${combination_id}`}
            idAnimation={`popup-animation-${combination_id}`}
          />
          <ButtonComments className={cn()} setTab={setTab} />
        </div>

        <FloatingReactions
          className=""
          id={`popup-animation-${combination_id}`}
        />

        <TabsControls
          className={cn(
            "absolute",
            "right-[10px] bottom-[0px]"
            // 'lg:-translate-y-1/2 lg:top-1/2 lg:right-[0px] lg:bottom-auto',
          )}
          tab={tab}
          setTab={setTab}
        />
      </div>

      {/* RIGHT AREA / BOTTOM */}
      <div
        className={cn(
          "flex items-start justify-between",
          " lg:col-span-4 lg:w-full lg:max-h-none  max-h-[300px] lg:h-full",
          "flex-row lg:flex-col ",
          "shrink-0",
          "gap-[20px]",
          "overflow-hidden",
          "rounded-b-[16px] lg:rounded-[16px]",
          "relative ",
          "z-[10]",
          "lg:aspect-[1.5/3]"
          // 'w-[20%]',
          // "h-[250px] min-[600px]:h-[350px] lg:h-[550px]",
          // 'aspect-[1/1]',

        )}
      >
        <TabsItems
          data={{
            ...data,
            productMetadata,
            swatchMetadata,
          }}
          tab={tab}
        />
      </div>
    </div>
  );
};

export default GridImagesAnimated;
