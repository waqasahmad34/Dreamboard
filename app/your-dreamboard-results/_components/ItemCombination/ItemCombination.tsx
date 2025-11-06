'use client';

import { XIcon } from 'lucide-react';
import Image from 'next/image';
import BoxShadow from '@/components/BoxShadow';
import DetailsSwatch from '@/components/Details/DetailsSwatch';
import Grid1 from '@/components/Grids/Grid1';
import Grid2 from '@/components/Grids/Grid2';
import Grid3 from '@/components/Grids/Grid3';
// Removed client-side data fetching - using only static metadata from server
import GridImages1_3Animated from '@/components/Grids/GridImages1_3Animated';
import GridWithBoxes from '@/components/Grids/GridWithBoxes';
import Tile from '@/components/Grids/Tiles/Tile';
import TileRoomStyleAndText from '@/components/Grids/Tiles/TileRoomStyleAndText';
import TileSwatchDetails from '@/components/Grids/Tiles/TileSwatchDetails';
import ListColorsAndSwatches from '@/components/Lists/ListColorsAndSwatches';
import ListShareSocial2 from '@/components/Lists/ListShareSocial2';
import ListSwatchFeatures from '@/components/Lists/ListSwatchFeatures';
import Overlay from '@/components/Overlay';
import TitleGridItem from '@/components/Titles/TitleGridItem';
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
} from '@/components/ui/dialog';
import VideoPlayer from '@/components/VideoPlayer';
import { cn } from '@/lib/utils';
import midcentury_portrait from '@/public/images/images-static/bohemian_portrait.png';
import contemporary_portrait from '@/public/images/images-static/contemporary_portrait.png';
// Import portrait images
import bohemian_portrait from '@/public/images/images-static/farmhouse_portrait.png';
import farmhouse_portrait from '@/public/images/images-static/midcentury_portrait.png';
import minimalistic_portrait from '@/public/images/images-static/minimalistic_portrait.png';
import modern_portrait from '@/public/images/images-static/modern_portrait.png';
import need_static from '@/public/images/need_static.jpg';
import sofa_type from '@/public/images/products/sofa-type-l.png';
import type {
  ColorPaletteItem,
  // ICombinationMetadata,
} from '@/types/ICombinationMetadata';

interface ItemCombinationProps {
  combination: any;
  index: number;
  sessionId: string;
  sessionIds: string[];
  combination_files: any;
  staticCombinationMetadata?: Record<string, any>;
}

const ItemCombination = ({
  combination,
  sessionId,
  sessionIds,
  combination_files,
  staticCombinationMetadata,
}: ItemCombinationProps) => {
  const combination_metadata = combination?.combination_metadata;
  const combination_id = combination?.combination_id;

  // console.log('combination_metadata', combination_metadata);

  // Use static metadata (fetched on server)
  const combinationMetadata =
    staticCombinationMetadata?.[combination_id?.toString() || ''];
  const colorPalleteObj = combinationMetadata?.color_palette;
  // console.log(colorPalleteObj);
  // const userDescription = combinationMetadata?.user_description;

  const colorPalleteArr = colorPalleteObj?.palette;
  const colorPalleteLast3: string[] =
    colorPalleteArr?.slice(-3).map((item: ColorPaletteItem) => item.hex) || [];
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
  const product_filename_string = product_filename?.split('.')[0];
  // const product_url = `https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-${combinationSessionId}/original_products/${product_filename}`;
  const swatch_filename = combination_metadata?.swatch_filename;
  const swatch_filename_string = swatch_filename?.split('.')[0];
  const swatch_url = `https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-${combinationSessionId}/original_swatches/${swatch_filename}`;

  const room_style =
    combination_metadata?.room_style?.charAt(0).toUpperCase() +
    combination_metadata?.room_style?.slice(1);

  // Map room style to imported image
  const getPortraitImage = (style: string) => {
    switch (style) {
      case 'bohemian':
        return bohemian_portrait;
      case 'contemporary':
        return contemporary_portrait;
      case 'farmhouse':
        return farmhouse_portrait;
      case 'midcentury':
        return midcentury_portrait;
      case 'minimalistic':
        return minimalistic_portrait;
      case 'modern':
        return modern_portrait;
      default:
        return modern_portrait; // fallback
    }
  };

  const portraitImage = getPortraitImage(combination_metadata?.room_style);

  // const room_aspect_ratio = combination_metadata?.room_aspect_ratio;
  // const retain_room_structure = combination_metadata?.retain_room_structure;

  const generated_video_url =
    combination_files?.[`${combinationSessionId}-${combination_id}`]?.[
      'generated_video.mp4'
    ];

  const mood_board_url =
    combination_files?.[`${combinationSessionId}-${combination_id}`]?.[
      'mood_board.png'
    ];

  const classNameRounded = 'rounded-[16px]';

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
  };

  // console.log('dataPopupObject', dataPopupObject);
  // console.log('colorPalleteFirstItem', colorPalleteFirstItem);

  return (
    <div className="flex flex-col gap-8">
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

      <h1 className="border-black border-t text-center text-2xl uppercase">
        New moodboard
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr_1fr]">
        <GridWithBoxes className="col-span-3" data={dataGridObject} />

        {combination.mood_board_url && (
          // TILE SWATCH DETAILS
          <TileSwatchDetails data={dataObjectSwatchDetails} />
        )}

        {/* IMAGE : FINAL ROOM */}
        {/* DIALOG */}
        {combination.final_room_url && (
          <Dialog>
            <DialogTrigger asChild>
              <Image
                src={combination.final_room_url}
                alt={`Final Room ${combination.combination_id}`}
                className={cn(
                  'object-cover',
                  classNameRounded,
                  'cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-md',
                  'h-full w-full',
                  'col-span-1 lg:col-span-2',
                )}
                width={800}
                height={774}
              />
            </DialogTrigger>

            <DialogOverlay className="bg-black/50" />

            <DialogContent
              className={cn(
                'border-none bg-white/50',
                'flex',
                'p-0',
                // Ensure proper centering and max dimensions
                'max-w-[95vw] max-h-[95vh]',
                'w-fit h-fit',
                classNameRounded,
              )}
              showCloseButton={false}
            >
              <DialogHeader className="sr-only">
                <DialogTitle>
                  Final Room {combination.combination_id}
                </DialogTitle>
              </DialogHeader>

              {/* GRID */}
              {/* <GridImages1_3Animated data={dataPopupObject} /> */}
              {/* <Grid1 data={dataPopupObject} /> */}
              {/* <Grid2 data={dataPopupObject} /> */}
              <Grid3 data={dataPopupObject} />

              <div className="absolute top-[15px] right-[15px] flex justify-end z-10 lg:hidden">
                <DialogClose asChild>
                  <button
                    type="button"
                    className={cn(
                      'h-[30px] w-[30px]',
                      'flex items-center justify-center',
                      'rounded-[6px]',
                      'cursor-pointer bg-gray-100/90 backdrop-blur-sm font-medium text-gray-700 text-sm hover:bg-gray-200/90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-0',
                      'shadow-lg border border-white/20',
                    )}
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr_1fr]">
        {/* IMAGE : MOODBOARD */}

        <Dialog>
          <DialogTrigger asChild>
            <div
              className={cn(
                'relative w-full overflow-hidden',
                'bg-gray-100',
                'cursor-pointer',
                'transition-all duration-300',
                'hover:scale-[1.01] hover:shadow-md',
                classNameRounded,
              )}
            >
              <Image
                src={mood_board_url ?? ''}
                alt={`styled_product_url`}
                className={cn('h-full w-full object-cover')}
                width={540}
                height={1000}
                // fill
              />
            </div>
          </DialogTrigger>

          <DialogOverlay className="bg-black/50" />

          <DialogContent
            className={cn(
              'max-h-[95vh]',
              '!max-w-[50vw]',
              'overflow-hidden border-none p-0',
              'bg-white/50',
              'backdrop-blur-lg',
              classNameRounded,
            )}
            showCloseButton={false}
          >
            <DialogHeader className="sr-only">
              <DialogTitle>Moodboard {combination.combination_id}</DialogTitle>
            </DialogHeader>

            {/* POPUP CONTENT */}
            <div
              className={cn(
                'flex w-full flex-col items-center justify-center',
                'p-[30px]',
              )}
            >
              {/* <DetailsSwatch /> */}
              <Image
                src={mood_board_url ?? ''}
                alt={`styled_product_url`}
                className={cn('object-cover', 'rounded-[16px]', 'mb-[20px]')}
                width={540}
                height={810}
              />
              <ListShareSocial2 />
            </div>

            <div className="absolute top-[10px] right-[10px] flex justify-end">
              <DialogClose asChild>
                <button
                  type="button"
                  className={cn(
                    'h-[25px] w-[25px]',
                    'flex items-center justify-center',
                    'rounded-[5px]',
                    'cursor-pointer bg-gray-100 font-medium text-gray-700 text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-0',
                  )}
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        {/* IMAGE : PRODUCT */}
        <div
          className={cn(
            'relative w-full bg-white',
            classNameRounded,
            // 'gap-[60px]',
            'p-[40px]',
            'shadow-xl',
            'lg:col-span-2',
            // 'h-[715px]',
            // 'flex flex-col items-center justify-center',
            'grid grid-rows-6 gap-[0px]',
          )}
        >
          <h2 className="mt-5 break-words text-center font-extrabold text-3xl text-neutral-800 uppercase leading-none tracking-[-0.02em] opacity-90 selection:bg-[#F97352] selection:text-white">
            Bordeaux{' '}
            <span className="custom-styles-2 mx-0 mt-2 mb-0 block p-0 text-center align-baseline font-light text-neutral-800 text-xs uppercase leading-none tracking-[0.7em] selection:bg-[#F97352] selection:text-white">
              Sofa
            </span>
          </h2>

          <div className={cn('relative row-span-4')}>
            <Image
              src={combination.styled_product_url}
              alt={`styled_product_url`}
              className={cn('object-contain')}
              fill
            />
            <BoxShadow className="" />
          </div>

          <div className="flex flex-col items-center justify-center text-[#333230]">
            <span className="font-semibold text-[15px] uppercase">
              Starting at
            </span>
            <p className="inline-block break-words text-center align-middle font-semibold text-3xl uppercase leading-none selection:bg-[#F97352] selection:text-white">
              $
              <span className="text-center align-baseline font-semibold uppercase leading-none selection:bg-[#F97352] selection:text-white">
                2359
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ROW: TEXT + VIDEO */}
      {generated_video_url && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr_1fr]">
          {/* TILE : STYLE */}
          <div
            className={cn(
              'transition-shadow hover:shadow-md',
              'overflow-hidden',
              classNameRounded,
              'bg-gray-100',
              'relative',
              'aspect-square lg:aspect-auto',
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
              className="h-full w-full object-cover"
              fill
            />
            <ListColorsAndSwatches
              className="absolute right-[10px] bottom-[10px] z-[11]"
              items={colorPalleteLast3.map((color) => ({ color }))}
            />
          </div>

          <div
            className={cn(
              'relative h-full bg-gray-100 lg:col-span-2',
              classNameRounded,
            )}
          >
            {generated_video_url ? (
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
