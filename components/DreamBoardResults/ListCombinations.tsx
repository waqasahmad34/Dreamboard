'use client';

import { useSearchParams } from 'next/navigation';
import SliderDreamBoards from '@/components/Sliders/SliderDreamBoards';
// import SliderDreamExperience from '@/components/Sliders/SliderDreamExperience';
import SliderDreamFabric from '@/components/Sliders/SliderDreamFabric';
import SliderDreamRooms from '@/components/Sliders/SliderDreamRooms';
import SliderDreamStyle from '@/components/Sliders/SliderDreamStyle';
import TitleClippedText from '@/components/Titles/TitleClippedText';

// import TitleBigWithSubtitle from '@/components/Titles/TitleBigWithSubtitle';

import TitleGold from '@/components/Titles/TitleGold';
import cn from '@/utils/cn';
import ItemCombination from './ItemCombination/ItemCombination';
import SkeletonGrid from './SkeletonGrid';
import StickyNeighborSwatches from './StickyNeighborSwatches';

interface StaticData {
  results: any[];
  combination_files: Record<string, any>;
  original_files: Record<string, any>;
  sessionIds: string[];
  errors: any[];
  combinationMetadata?: Record<string, any>;
}

interface ListCombinationsProps {
  staticData?: StaticData | null;
  staticError?: string | null;
  fallbackSessionId?: string;
  combinationMetadataFetched?: Record<string, any>;
  productsMetadataArr?: Record<string, any>[];
  swatchesMetadataArr?: Record<string, any>[];
}

const ListCombinations = ({
  staticData,
  staticError,
  fallbackSessionId,
  // combinationMetadataFetched,
  productsMetadataArr,
  swatchesMetadataArr,
}: ListCombinationsProps) => {
  const sessionIdDefault = '2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1';

  const searchParams = useSearchParams();
  const sessionId =
    searchParams.get('id') ?? fallbackSessionId ?? sessionIdDefault;

  // Removed client-side data fetching - everything is now fetched on the server

  // Use static data (everything is fetched on the server)
  const results = staticData?.results;
  const combination_files = staticData?.combination_files;
  const sessionIdsToUse = staticData?.sessionIds || [];

  // console.log('staticData', staticData);

  // DATA DREAM FABRICS
  // swatchesMetadataArr // !!!get data from here!!!
  const originalSwatches = [
    ...(staticData?.original_files?.swatches ?? []),
    // ...(staticData?.original_files?.swatches ?? []),
  ].map((swatch, index) => ({
    id: `swatch-${index}`,
    url: swatch,
    child: swatchesMetadataArr?.[index]?.child,
    family: swatchesMetadataArr?.[index]?.family,
    filename: swatchesMetadataArr?.[index]?.filename,
    combination_id: swatchesMetadataArr?.[index]?.combination_id,
  }));
  // console.log('originalSwatches', originalSwatches);

  // const portrait_1 =
  //   'https://d3m7r2hywaso4h.cloudfront.net/your-dreamboard/outside_view/bohemian_portrait.jpg';
  // const portrait_2 =
  //   'https://d3m7r2hywaso4h.cloudfront.net/your-dreamboard/outside_view/modern_portrait.jpg';

  // DATA DREAM STYLES
  const dreamStylesArr = Object.values(combination_files ?? {}).map(
    (file: any, index: number) => {
      const _originalCombinationId = parseInt(file?._originalCombinationId, 10);
      const currentCombination = results?.find(
        (result) => result.combination_id === _originalCombinationId,
      );
      const style = currentCombination?.combination_metadata?.room_style;
      const swatches = staticData?.original_files?.swatches;
      const swatchFilename =
        currentCombination?.combination_metadata?.swatch_filename;

      const swatchUrl = swatches?.find((swatch: string) =>
        swatch.endsWith(swatchFilename),
      );
      // console.log('_originalCombinationId', _originalCombinationId);

      const colorPalette = currentCombination?.color_palette?.palette;
      return {
        roomUrl: file['final_room_integration.png'],
        productUrl: file['styled_product.png'],
        swatchUrl: swatchUrl,
        style: style,
        colorPalette: colorPalette,
        filename: productsMetadataArr?.find(
          (item: any) => item.combination_id === _originalCombinationId,
        )?.filename,
        family: productsMetadataArr?.find(
          (item: any) => item.combination_id === _originalCombinationId,
        )?.family,
        swatchChild: swatchesMetadataArr?.find(
          (item: any) => item.combination_id === _originalCombinationId,
        )?.child,
        type: productsMetadataArr?.find(
          (item: any) => item.combination_id === _originalCombinationId,
        )?.type,
        swatchFamily: swatchesMetadataArr?.find(
          (item: any) => item.combination_id === _originalCombinationId,
        )?.family,
      };
    },
  );

  const dreamStylesArrScaled = [
    ...dreamStylesArr,
    // ...dreamStylesArr,
    // ...dreamStylesArr,
  ].map((item, index) => ({
    ...item,
    id: `item-${index}`,
  }));

  // DATA DREAM BOARDS
  const dreamBoardArr = Object.values(combination_files ?? {}).map(
    (file: any) => {
      const _originalCombinationId = parseInt(file?._originalCombinationId, 10);
      const currentCombination = results?.find(
        (result) => result.combination_id === _originalCombinationId,
      );
      const style = currentCombination?.combination_metadata?.room_style;
      const colorPalette = currentCombination?.color_palette?.palette;
      return {
        boardUrl: file['mood_board.png'],
        style: style,
        colorPalette: colorPalette,
      };
    },
  );
  const dreamBoardsArrScaled = [
    ...dreamBoardArr,
    // ...dreamBoardArr,
    // ...dreamBoardArr,/
  ].map((item, index) => ({
    ...item,
    id: `item-${index}`,
  }));

  // DATA DREAM ROOMS
  const dreamRoomsArr = Object.values(combination_files ?? {}).map(
    (file: any) => {
      const _originalCombinationId = parseInt(file?._originalCombinationId, 10);
      const currentCombination = results?.find(
        (result) => result.combination_id === _originalCombinationId,
      );
      const style = currentCombination?.combination_metadata?.room_style;
      const swatches = staticData?.original_files?.swatches;
      const swatchFilename =
        currentCombination?.combination_metadata?.swatch_filename;

      const swatchUrl = swatches?.find((swatch: string) =>
        swatch.endsWith(swatchFilename),
      );

      const colorPalette = currentCombination?.color_palette?.palette;
      return {
        roomUrl: file['final_room_integration.png'],
        productUrl: file['styled_product.png'],
        swatchUrl: swatchUrl,
        style: style,
        colorPalette: colorPalette,
      };
    },
  );

  const dreamRoomsArrScaled = [
    ...dreamRoomsArr,
    // ...dreamRoomsArr,
    // ...dreamRoomsArr,
  ].map((item, index) => ({
    ...item,
    id: `item-${index}`,
  }));

  // const originalRoom = staticData?.original_files?.rooms[0];

  // Side sticky neighbor swatches are handled by the dedicated component

  // Show loading if we don't have static data
  if (!staticData) {
    return <SkeletonGrid />;
  }

  // Show error if there's a static error
  if (staticError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className={cn(
            'border border-red-200 bg-red-50 p-6 text-center',
            'rounded-[16px]',
          )}
        >
          <h2 className="mb-2 font-semibold text-red-800 text-xl">
            Error Loading Results
          </h2>
          <p className="text-red-600">Error loading data from server</p>
          {/* Show static error details */}
          <div className="mt-4 text-left">
            <h3 className="mb-2 font-semibold text-red-700">Error Details:</h3>
            <div className="mb-1 text-red-600 text-sm">{staticError}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        {/* SESSION DATA */}
        {/* <div className="mb-8">
					<h1 className="mb-4 text-[36px] text-black">
						Results for{' '}
						{sessionIdsToUse.length > 1
							? `${sessionIdsToUse.length} sessions`
							: 'session'}
					</h1>
					{sessionIdsToUse.length > 1 ? (
						<div className="text-gray-600">
							<p className="mb-2">Session IDs:</p>
							<div className="flex flex-wrap gap-2">
								{sessionIdsToUse.map((id: string) => (
									<span
										key={id}
										className="rounded-md bg-gray-100 px-3 py-1 font-mono text-sm"
									>
										{id}
									</span>
								))}
							</div>
						</div>
					) : (
						<div className="items-centerflex-wrap flex gap-2">
							<p className="text-gray-600">Session ID:</p>
							<span className="rounded-md bg-gray-100 px-3 py-1 font-mono text-sm">
								{sessionId}
							</span>
						</div>
					)}
				</div> */}

        {/* Mood Board Grid Section */}
        {results && results.length > 0 && (
          <div className="mb-12 sm:pt-[50px] pt-[25px] relative" id="sticky-swatches-container">
            {/* Sticky swatches */}
            <StickyNeighborSwatches
              results={results || []}
              swatchesMetadataArr={swatchesMetadataArr}
              originalSwatches={originalSwatches}
            />

            <div className="grid grid-cols-1 gap-10 sm:gap-14 md:gap-20 lg:gap-[100px] xl:gap-[150px]" >
              {results
                .filter(
                  (combination: any) =>
                    combination.mood_board_url || combination.final_room_url,
                )
                .map((combination: any, index: number) => {
                  // const combinationMetadata =
                  //   combinationMetadataFetched?.[combination.combination_id];

                  const productMetadata = productsMetadataArr?.find(
                    (item: any) =>
                      item.combination_id === combination.combination_id,
                  );
                  const swatchMetadata = swatchesMetadataArr?.find(
                    (item: any) =>
                      item.combination_id === combination.combination_id,
                  );

                  if (!productMetadata || !swatchMetadata) return null;
                  // console.log('combinationMetadata', combinationMetadata);
                  return (
                    <ItemCombination
                      key={`${sessionId}-${combination.combination_id}-${index}-${combination.combination_metadata?.swatch_filename || ''}-${combination.combination_metadata?.product_filename || ''}-${combination.combination_metadata?.room_filename || ''}`}
                      combination={combination}
                      index={index}
                      sessionId={sessionId}
                      sessionIds={sessionIdsToUse}
                      combination_files={combination_files}
                      productMetadata={productMetadata}
                      swatchMetadata={swatchMetadata}
                      // combinationMetadata={combinationMetadata}
                      staticCombinationMetadata={
                        staticData?.combinationMetadata
                      }
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>

      <section className="py-[50px]">
        <SliderDreamFabric items={originalSwatches} />
      </section>

      <section className="py-[50px]">
        <SliderDreamStyle items={dreamStylesArrScaled} />
      </section>

      <section className={cn('flex flex-col', 'py-[50px]')}>
        <SliderDreamBoards items={dreamBoardsArrScaled} className="" />
      </section>

      <section className={cn('flex flex-col', 'py-[50px]')}>
        <SliderDreamRooms items={dreamRoomsArrScaled} />
      </section>
    </>
  );
};

export default ListCombinations;
