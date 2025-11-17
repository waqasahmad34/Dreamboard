"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BoxShadow from "@/components/BoxShadow";
import DetailsSwatch from "@/components/Details/DetailsSwatch";
import DialogRadix from "@/components/DialogRadix";
import ButtonComments from "@/components/Grids/GridImagesAnimated/ButtonComments";
import GridImagesAnimated from "@/components/Grids/GridImagesAnimated/GridImagesAnimated";
import FloatingReactions from "@/components/Grids/GridImagesAnimated/SocialReactions/FloatingReactions";
import SocialReactions from "@/components/Grids/GridImagesAnimated/SocialReactions/SocialReactions";
import GridWithBoxes from "@/components/Grids/GridWithBoxes";
import Tile from "@/components/Grids/Tiles/Tile";
import ImageMissing from "@/components/ImageMissing";
import ImageWithDialog from "@/components/ImageWithDialog";
import ListColorsAndSwatches from "@/components/Lists/ListColorsAndSwatches";
import ListShareSocial from "@/components/Lists/ListShareSocial";
import Overlay from "@/components/Overlay";
import TitleClippedText from "@/components/Titles/TitleClippedText";
import TitleGold from "@/components/Titles/TitleGold";
import TitleGridItem from "@/components/Titles/TitleGridItem";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoPlayer from "@/components/VideoPlayer";
import { cn } from "@/lib/utils";
import midcentury_portrait from "@/public/images/images-static/bohemian_portrait.png";
import contemporary_portrait from "@/public/images/images-static/contemporary_portrait.png";
// Import portrait images
import bohemian_portrait from "@/public/images/images-static/farmhouse_portrait.png";
import farmhouse_portrait from "@/public/images/images-static/midcentury_portrait.png";
import minimalistic_portrait from "@/public/images/images-static/minimalistic_portrait.png";
import modern_portrait from "@/public/images/images-static/modern_portrait.png";
import need_static from "@/public/images/need_static.jpg";
import sofa_type from "@/public/images/products/sofa-type-l.png";
import type {
  ColorPaletteItem,
  // ICombinationMetadata,
} from "@/types/ICombinationMetadata";
import getStyleImage from "@/utils/getStyleImage";
import ArrowIcon from "@/public/Icons/ArrowIcon";

interface ItemCombinationProps {
  combination: any;
  index: number;
  sessionId: string;
  sessionIds: string[];
  combination_files: any;
  combinationMetadata?: Record<string, any>;
  staticCombinationMetadata?: Record<string, any>;
  productMetadata?: Record<string, any>;
  swatchMetadata?: Record<string, any>;
}

const ItemCombination = ({
  combination,
  sessionId,
  sessionIds,
  combination_files,
  combinationMetadata,
  staticCombinationMetadata,
  productMetadata,
  swatchMetadata,
  index,
}: ItemCombinationProps) => {
  // console.log('ItemCombination -> combination:', swatchMetadata);

  // Social reactions are now handled by the provider with scoped IDs

  const combination_metadata = combination?.combination_metadata;
  const combination_id = combination?.combination_id;

  // console.log('combination_metadata', combination_metadata);

  // Use static metadata (fetched on server)
  // const combinationMetadata =
  //   staticCombinationMetadata?.[combination_id?.toString() || ''];
  const colorPalleteObj = combinationMetadata?.color_palette;
  // console.log(colorPalleteObj);
  // const userDescription = combinationMetadata?.user_description;

  const colorPalleteArr = colorPalleteObj?.palette;
  const colorPalleteLast3: string[] =
    colorPalleteArr?.slice(-3).map((item: ColorPaletteItem) => item.hex) || [];
  const collorPaleteFirst3: string[] =
    colorPalleteArr?.slice(0, 3).map((item: ColorPaletteItem) => item.hex) ||
    [];
  const colorPalleteFirstItem: string =
    colorPalleteArr?.map((item: ColorPaletteItem) => item.hex)?.[0] || null;

  // console.log('combination_id', combination_id);
  // console.log('combinationMetadata', combination_id, combinationMetadata);

  // const room_filename = combination_metadata?.room_filename;
  // Use the source session ID from the combination data, or fall back to the first session ID
  const combinationSessionId =
    (combination as any)._sourceSessionId || sessionIds[0] || sessionId;
  // const room_url = `https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-${combinationSessionId}/original_rooms/${room_filename}`;
  const product_filename = combination_metadata?.product_filename;
  const product_filename_string = product_filename?.split(".")[0];
  // const product_url = `https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-${combinationSessionId}/original_products/${product_filename}`;
  const swatch_filename = combination_metadata?.swatch_filename;
  const swatch_filename_string = swatch_filename?.split(".")[0];
  const swatch_url = `https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-${combinationSessionId}/original_swatches/${swatch_filename}`;

  // console.log('staticCombinationMetadata', staticCombinationMetadata);

  const room_style =
    combination_metadata?.room_style?.charAt(0).toUpperCase() +
    combination_metadata?.room_style?.slice(1);

  const portraitImage = getStyleImage(
    combination_metadata?.room_style,
    "portrait"
  );

  // const room_aspect_ratio = combination_metadata?.room_aspect_ratio;
  // const retain_room_structure = combination_metadata?.retain_room_structure;

  const generated_video_url =
    combination_files?.[`${combinationSessionId}-${combination_id}`]?.[
      "generated_video.mp4"
    ];

  const mood_board_url =
    combination_files?.[`${combinationSessionId}-${combination_id}`]?.[
      "mood_board.png"
    ];

  if (!combination.mood_board_url) {
    return null;
  }

  const dataPopupObject = {
    room_style_string: room_style,
    product_filename_string: product_filename_string,
    swatch_url: swatch_url,
    swatch_filename_string: swatch_filename_string,
    final_room_url: combination.final_room_url,
    styled_product_url: combination.styled_product_url,
    portrait: portraitImage.src,
    colorPalette: colorPalleteLast3,
    colorPalleteFirstItem: colorPalleteFirstItem,
    mood_board_url: mood_board_url,
    sofa_type: sofa_type.src,
  };

  const dataGridObject = {
    swatch_url: swatch_url,
    swatch_filename_string: swatch_filename_string,
    final_room_url: combination.final_room_url,
    styled_product_url: combination.styled_product_url,
    portrait: portraitImage.src,
    colorPalette: colorPalleteLast3,
    colorPalleteFirstItem: colorPalleteFirstItem,
    mood_board_url: mood_board_url,
    sofa_type: sofa_type.src,
  };

  // const dataPopupObjectMoodboard = {};
  const dataObjectSwatchDetails = {
    swatch_url: swatch_url,
    swatch_filename_string: swatch_filename_string,
    styled_product_url: combination.styled_product_url,
    portrait: portraitImage.src,
    colorPalette: colorPalleteLast3,
    colorPalleteFirstItem: colorPalleteFirstItem,
    mood_board_url: mood_board_url,
    sofa_type: sofa_type.src,
    original_metadata_swatch: combinationMetadata?.original_metadata?.swatch,
  };

  // console.log('dataPopupObject', dataPopupObject);
  // console.log('colorPalleteFirstItem', colorPalleteFirstItem);

  // console.log(
  //   'combinationMetadata?.original_metadata',
  //   combinationMetadata?.original_metadata,
  // );
  const swatchFamily = swatchMetadata?.family;
  const swatchChild = swatchMetadata?.child;

  const productFamily = productMetadata?.family;
  const productType = productMetadata?.type;
  const productUrl = `https://www.dreamsofa.com/products/${productFamily?.toLowerCase()}-${productType?.toLowerCase()}?fabric=${swatchFamily}-${swatchChild}`;
  // console.log('productMetadata', productMetadata);

  // const swatchChild = swatchMetadata?.child;
  // const filename = swatchMetadata?.filename;
  // console.log('swatchMetadata', swatchMetadata);
  return (
    <div
      className="flex flex-col gap-[20px]"
      id={`combination-${combination_id}`}
    >
      {/* Removed loading state - using only static metadata from server */}

      {/* Show metadata if available */}
      {/* {combinationMetadata ? (
        <div className="mb-4 rounded bg-gray-50 p-2 text-gray-600 text-sm">
          <strong>
            Metadata loaded for combination {String(combination_id)}:
          </strong>
          <pre className="mt-1 max-h-32 overflow-auto text-xs">
            {JSON.stringify(combinationMetadata, null, 2)}
          </pre>
        </div>
      ) : null} */}

      {/* <h1 className="border-black border-t text-center text-2xl uppercase">
        New moodboard
      </h1> */}

      {/* <TitleClippedText
        imageUrl={combination.final_room_url}
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

      {/* {generated_video_url ? (
				<VideoPlayer
					className="w-full"
					videoUrl={generated_video_url || ''}
					autoplayOnScroll={true}
				/>
			) : (
				<div
					className={cn(
						'flex h-full min-h-[300px] items-center justify-center bg-gray-100 text-black',
						classNameRounded,
					)}
				>
					No video available
				</div>
			)} */}

      {/* <GridWithBoxes
        className="ProductAndRoomSlider"
        data={dataGridObject}
        productMetadata={productMetadata}
        swatchMetadata={swatchMetadata}
      /> */}
      <div
        className={cn(
          "SwatchAndRoomGrid",
          "grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr]",
          "gap-y-[20px] lg:gap-[20px]"
        )}
      >
        {dataObjectSwatchDetails ? (
          <Tile className={cn("TileSwatchDetails")}>
            <DetailsSwatch
              data={dataObjectSwatchDetails}
              swatchFamily={swatchFamily}
            />
          </Tile>
        ) : (
          <ImageMissing
            className="h-full w-full"
            title={`dataObjectSwatchDetails`}
          />
        )}

        {/* FINAL ROOM */}
        {combination.final_room_url && (
          <div className="relative col-span-3 lg:col-span-2">
            <DialogRadix
              trigger={
                <Image
                  src={combination.final_room_url}
                  alt={`Final Room ${combination.combination_id}`}
                  className={cn(
                    "object-cover",
                    "rounded-[16px]",
                    "transition-all duration-300",
                    "hover:scale-[1.01] hover:shadow-md",
                    "cursor-pointer",
                    "h-full w-full"
                  )}
                  width={800}
                  height={774}
                  id="dreamroom"
                />
              }
              content={
                <GridImagesAnimated
                  combination_id={combination_id}
                  sessionId={sessionId}
                  data={dataPopupObject}
                  productMetadata={productMetadata}
                  swatchMetadata={swatchMetadata}
                />
              }
              className={cn(
                "lg:max-w-auto",
                "p-0",
                "!max-w-none",
                "bg-transparent",
                "h-auto",
                "overflow-visible"
              )}
            />

            {/* Reactions And Comments */}
            <div
              className={cn(
                "ReactionsAndComments",
                "absolute z-[30]",
                "bottom-[10px]",
                "left-[50%] translate-x-[-50%]",
                "flex items-center gap-[10px]"
              )}
            >
              <ListShareSocial
                className={cn("flex")}
                withMobileClasses={false}
                title="Check out my Dreamboard!"
                description="I found this dreamboard on DreamSofa.com and I thought you might like it too!"
                media={combination.final_room_url}
              />

              <SocialReactions
                className={cn("flex-row")}
                idData={`combination-state-${combination_id}`}
                idAnimation={`combination-animation-${combination_id}`}
              />
              <ButtonComments combinationId={combination_id} sessionId={sessionId} className={cn()} setTab={() => {}} />
            </div>
            <FloatingReactions
              className=""
              id={`combination-animation-${combination_id}`}
            />
          </div>
        )}
      </div>

      <div
        className={cn(
          "GridMoodboardAndProduct",
          "grid grid-cols-1 gap-[20px]",
          "lg:grid-cols-[1fr_1fr_1fr]"
        )}
      >
        {/* IMAGE : MOODBOARD */}
        <div className="relative">
          <DialogRadix
            trigger={
              mood_board_url ? (
                <Image
                  src={mood_board_url ?? ""}
                  alt={`styled_product_url`}
                  className={cn(
                    "object-contain",
                    "h-full w-full",
                    "rounded-[16px]"
                  )}
                  width={540}
                  height={1000}
                />
              ) : (
                <ImageMissing
                  className="h-full w-full"
                  title={`Mood board missing: mood_board_url`}
                />
              )
            }
            className={cn("aspect-[2/2.9]", "max-h-[100vh]")}
            content={
              <div
                className={cn(
                  "RadixContentImage",
                  "relative",
                  "flex items-center justify-center",
                  // 'min-w-[300px] sm:min-w-auto',
                  "w-[100vw] xs:w-[400px] lg:w-[500px]",
                  // 'md:max-w-[300px] lg:max-w-[500px]',
                  "max-h-[90vh]",
                  "aspect-[2/3]",
                  "rounded-[16px]",
                  "overflow-hidden"
                )}
              >
                <Image
                  src={mood_board_url ?? ""}
                  alt={`styled_product_url`}
                  className={cn(
                    "object-contain",
                    "h-full",
                    "w-full",
                    "max-w-full",
                    "max-h-full"
                  )}
                  width={540}
                  height={1000}
                />
                <ListShareSocial
                  className={cn(
                    "absolute bottom-[10px] left-[50%] z-[10] translate-x-[-50%]"
                  )}
                  withMobileClasses={false}
                  media={mood_board_url}
                  title="Check out my Dreamboard!"
                  description="I found this dreamboard on DreamSofa.com and I thought you might like it too!"
                />
              </div>
            }
          />
          <ListShareSocial
            className={cn(
              "absolute bottom-[10px] left-[50%] z-[10] translate-x-[-50%]"
            )}
            withMobileClasses={false}
            title="Check out my Dreamboard!"
            description="I found this dreamboard on DreamSofa.com and I thought you might like it too!"
            media={mood_board_url}
          />
        </div>

        {/* IMAGE : PRODUCT */}
        <Link
          className={cn(
            "ImageProduct",
            "relative w-full bg-white",
            "rounded-[16px]",
            "py-[40px] lg:p-[40px]",
            "shadow-xl",
            "lg:col-span-2",
            "flex flex-col items-center justify-center",
            "overflow-hidden",
            "transition-all duration-300",
            "hover:scale-102",
            "cursor-pointer"
          )}
          href={productUrl}
          // target="_blank"
        >
          <div className="flex items-center justify-center gap-2">
            <h2 className="mt-5 break-words text-center font-extrabold text-3xl text-neutral-800 uppercase leading-none tracking-[-0.02em] opacity-90 selection:bg-[#F97352] selection:text-white">
              {productFamily}{" "}
              <span className="custom-styles-2 mx-0 mt-2 mb-0 block p-0 text-center align-baseline font-light text-neutral-800 text-xs uppercase leading-none tracking-[0.7em] selection:bg-[#F97352] selection:text-white">
                {productType}
              </span>
            </h2>
            <ArrowIcon className="size-4" />
          </div>

          <div
            className={cn(
              "relative",
              "w-[200px] xs:w-[400px] lg:w-[500px]",
              "aspect-3/2"
            )}
          >
            <Image
              src={combination.styled_product_url}
              alt={`styled_product_url`}
              className={cn(
                "ImageProduct",
                "object-contain",
                "h-full",
                "w-full"
              )}
              // fill
              width={911}
              height={607}
            />
            <BoxShadow className="" />
          </div>

          {/* PRICE */}
          {/* <div
            className={cn(
              'flex flex-col items-center justify-center text-[#333230]',
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
              'absolute flex-row',
              'gap-[5px]',
              'bottom-[10px]',
              // 'lg:right-[10px] lg:translate-x-0',
              'right-[50%] translate-x-[50%]',
            )}
            withMobileClasses={false}
          /> */}
        </Link>
      </div>

      {/* ROW: TEXT + VIDEO */}
      {generated_video_url && (
        <div
          className={cn(
            "GridStyleAndVideo",
            "grid grid-cols-1 gap-[20px] lg:grid-cols-[1fr_1fr_1fr]"
          )}
        >
          <div
            className={cn(
              "transition-shadow hover:shadow-md",
              "overflow-hidden",
              "rounded-[16px]",
              "bg-gray-100",
              "relative",
              "flex items-center justify-center",
              // 'aspect-square lg:aspect-auto',
              "h-full w-full"
            )}
          >
            <TitleGridItem
              title={room_style}
              subTitle="Style"
              color="#ffffff"
              className="z-10"
              classNameTitle="text-[50px] lg:text-[70px]"
              classNameSubtitle="lg:text-[16px]"
            />
            <Image
              src={portraitImage.src}
              alt={`Mood Board ${combination.combination_id}`}
              className={cn(
                "h-full w-[200px] w-full max-w-full",
                "object-cover",
                "brightness-50"
              )}
              width={400}
              height={600}
            />
            <ListColorsAndSwatches
              className="absolute right-[10px] bottom-[10px] z-[11]"
              items={collorPaleteFirst3.map((color) => ({ color }))}
            />
          </div>

          {/* <DialogRadix
            trigger={
              <div
                className={cn(
                  'transition-shadow hover:shadow-md',
                  'overflow-hidden',
                  'rounded-[16px]',
                  'bg-gray-100',
                  'relative',
                  'flex items-center justify-center',
                  // 'aspect-square lg:aspect-auto',
                  'h-full w-full',
                )}
              >
                <TitleGridItem
                  title={room_style}
                  subTitle="Style"
                  color="#ffffff"
                  className="z-10"
                  classNameTitle="text-[50px] lg:text-[70px]"
                  classNameSubtitle="lg:text-[16px]"
                />
                <Image
                  src={portraitImage}
                  alt={`Mood Board ${combination.combination_id}`}
                  className={cn(
                    'h-full w-[200px] w-full max-w-full',
                    'object-cover',
                    'brightness-50',
                  )}
                  width={400}
                  height={600}
                />
                <ListColorsAndSwatches
                  className="absolute right-[10px] bottom-[10px] z-[11]"
                  items={collorPaleteFirst3.map((color) => ({ color }))}
                />
              </div>
            }
            content={
              <div
                className={cn(
                  'relative',
                  'flex items-center justify-center',
                  'min-w-[300px] sm:min-w-auto',
                  'max-w-[300px] lg:max-w-[500px]',
                  'max-h-[90vh]',
                  'aspect-[2/3]',
                  'rounded-[16px]',
                  'overflow-hidden',
                )}
              >
                <TitleGridItem
                  title={room_style}
                  subTitle="Style"
                  color="#ffffff"
                  className="z-10"
                  classNameTitle="text-[40px] lg:text-[70px]"
                  classNameSubtitle="text-[10px] lg:text-[16px]"
                />
                <Image
                  src={portraitImage}
                  alt={`Mood Board ${combination.combination_id}`}
                  className={cn(
                    'object-contain',
                    'brightness-50',
                    'h-full',
                    'w-full',
                    'max-w-full',
                    'max-h-full',
                  )}
                  width={400}
                  height={600}
                />
                <ListColorsAndSwatches
                  className="absolute right-[10px] bottom-[10px] z-[11]"
                  items={collorPaleteFirst3.map((color) => ({ color }))}
                />
              </div>
            }
          /> */}

          {/* <ImageWithDialog
            classNameTrigger=""
            classNameDialogContent={cn('aspect-[2/3]')}
          >
            <div
              className={cn(
                'transition-shadow hover:shadow-md',
                'overflow-hidden',
                'rounded-[16px]',
                'bg-gray-100',
                'relative',
                'flex items-center justify-center',
                // 'aspect-square lg:aspect-auto',
                'h-full w-full',
              )}
            >
              <Overlay />
              <TitleGridItem
                title={room_style}
                subTitle="Style"
                color="#ffffff"
                className="z-10"
                classNameTitle="text-[70px]"
                classNameSubtitle="text-[16px]"
              />
              <Image
                src={portraitImage}
                alt={`Mood Board ${combination.combination_id}`}
                className="h-full w-[200px] w-full max-w-full object-cover"
                width={400}
                height={600}
                // fill
              />
              <ListColorsAndSwatches
                className="absolute right-[10px] bottom-[10px] z-[11]"
                items={collorPaleteFirst3.map((color) => ({ color }))}
              />
            </div>
          </ImageWithDialog> */}

          <div
            className={cn(
              "relative h-full bg-gray-100 lg:col-span-2",
              "rounded-[16px]"
            )}
          >
            {generated_video_url ? (
              <VideoPlayer
                className="w-full"
                videoUrl={generated_video_url || ""}
                autoplayOnScroll={true}
              />
            ) : (
              <div
                className={cn(
                  "flex h-full min-h-[300px] items-center justify-center bg-gray-100 text-black",
                  "rounded-[16px]"
                )}
              >
                No video available
              </div>
            )}
          </div>
        </div>
      )}

      {/* ACCORDION HERE */}
      {/* <div className="col-span-3">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="combination-details">
            <AccordionTrigger className="!no-underline cursor-pointer border-[1px] border-gray-200 bg-gray-100 px-[20px] hover:bg-gray-200">
              Toggle Debug - View what fabric/product/room was submitted
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4 overflow-hidden py-[20px]">
                  {swatch_filename && (
                    <Image
                      src={swatch_url}
                      alt={`Swatch ${swatch_filename}`}
                      width={300}
                      height={300}
                      className="h-auto min-w-[200px] shrink-0 object-contain"
                    />
                  )}
                  {product_filename && (
                    <Image
                      src={product_url}
                      alt={`Product ${product_filename}`}
                      width={595}
                      height={376}
                      className="h-auto min-w-[250px] object-contain"
                    />
                  )}
                  {room_filename && (
                    <Image
                      src={room_url}
                      alt={`Room ${room_filename}`}
                      width={595}
                      height={338}
                      className="h-auto min-w-[250px] shrink object-contain"
                    />
                  )}
                </div>
                <ul className="text-[20px]">
                  <li>asked room_style: {room_style}</li>
                  <li>asked room_aspect_ratio: {room_aspect_ratio}</li>
                  <li>
                    asked retain_room_structure:{' '}
                    {retain_room_structure ? 'true' : 'false'}
                  </li>
                  <li>
                    asked what to see in room:{' '}
                  </li>
                  <li>
                    <strong>Session ID:</strong> {combinationSessionId}
                  </li>
                  <li>
                    <strong>Combination ID:</strong> {combination_id}
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div> */}
    </div>
  );
};

export default ItemCombination;
