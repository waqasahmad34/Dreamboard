import type { Metadata } from "next";
import { Suspense } from "react";
import {
  fetchAllCombinationMetadata,
  fetchMultipleSessionData,
  getAllSessionIds,
} from "@/actions/sessions";
import Banner4CardStacked from "@/components/Banners/Banner4CardStacked";
import BannerBoxRight from "@/components/Banners/BannerBoxRight";
import BannerBoxRightSwatches from "@/components/Banners/BannerBoxRightSwatches";
import BannerDreamBox from "@/components/Banners/BannerDreamBox";
import BannerLeftBoxOverlaid from "@/components/Banners/BannerLeftBoxOverlaid";
// import FormOrderSwatches from '@/components/DreamBoardResults/Forms/FormOrderSwatches';
import ListCombinations from "@/components/DreamBoardResults/ListCombinations";
import SkeletonGrid from "@/components/DreamBoardResults/SkeletonGrid";
import StickyBarWithScrollDetection from "@/components/DreamBoardResults/StickyBarWithScrollDetection";
import SliderDreamExperience from "@/components/Sliders/SliderDreamExperience";
import TabsDreamComfort from "@/components/Tabs/TabsDreamComfort";
import TitleGold from "@/components/Titles/TitleGold";
import cn from "@/utils/cn";

export const metadata: Metadata = {
  title: "Your Dream Board Results",
  description:
    "View your personalized dream board results and room combinations",
  robots: "noindex, nofollow",
};

// Function to generate common session ID combinations for static generation
const getCommonSessionCombinations = [
  [
    "2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1",
    "b411d6b6-22a7-4cc8-9615-66af80cbfc5b",
  ],
  [
    "2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1",
    "bd05435e-a35c-4e10-aedf-ab8c630a2caf",
  ],
  [
    "b411d6b6-22a7-4cc8-9615-66af80cbfc5b",
    "bd05435e-a35c-4e10-aedf-ab8c630a2caf",
  ],
];

export const revalidate = 3600; // 1 hour

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

const PageDreamBoardResults = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const sessionIdParam = params.id || "2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1";

  // const sessionsArray = [
  //   'f62ec559-7023-4083-9c85-0aca65bd75c9',
  //   '2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1',
  //   'b411d6b6-22a7-4cc8-9615-66af80cbfc5b',
  //   'bd05435e-a35c-4e10-aedf-ab8c630a2caf',
  //   'c478a01a-a92c-4ec6-8efa-901f53106782',
  //   'f2b37658-550d-4ffc-bc05-a4f42a0fabe2',
  // ];

  // Handle multiple session IDs (comma-separated)
  const sessionIds = sessionIdParam
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id.length > 0);

  // Fetch data at build time for SSG
  const { data: staticData, error } = await getStaticData(sessionIds);
  console.log("page.tsx -> staticData:", staticData);

  const final_room_url = staticData?.results?.[0]?.final_room_url;

  // const uploadedOriginalRoom = staticData?.original_files?.rooms[0];
  const originalRoom = staticData?.original_files?.rooms[0];
  console.log("originalRoom", originalRoom);

  const userDescription =
    staticData?.combinationMetadata?.["1"]?.processing_results?.social_content
      ?.common?.description_body ??
    staticData?.combinationMetadata?.["1"]?.user_description ??
    "";
  const roomStyle =
    staticData?.combinationMetadata?.["1"]?.combination_details?.room_style;

  const generatedVideoUrl = staticData?.results?.[0]?.s3_video_url;
  // console.log('generatedVideoUrl', generatedVideoUrl);

  // const videoUrl = staticData?.original_files?.videos[0];

  const mood_board_url = staticData?.results?.[0]?.mood_board_url;

  const combination_ids = staticData?.results?.map((result) => {
    return {
      combination_id: result.combination_id,
      session_id: result._sourceSessionId,
    };
  });

  // console.log('combination_ids', combination_ids);
  // console.log('sessionIds from params:', sessionIds);

  // FORMAT
  // https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-[session-id]/[combination_number]/combination_metadata.json
  // EXAMPLE
  // const fetchUrl = `https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-${session_id}/combination_${combination_id}/combination_metadata.json`;

  // Fetch metadata for each combination
  const combination_metadata_Fetched = [];
  if (combination_ids && combination_ids.length > 0) {
    for (const item of combination_ids) {
      try {
        if (!item.combination_id) {
          console.error("Missing combination_id:", item);
          continue;
        }

        const fetchUrl = `https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-${item.session_id}/combination_${item.combination_id}/combination_metadata.json`;

        const response = await fetch(fetchUrl);
        if (!response.ok) {
          console.warn(
            `Failed to fetch metadata for combination ${item.combination_id}. Status: ${response.status}`
          );
          continue;
        }

        const metadata = await response.json();
        combination_metadata_Fetched.push(metadata);
      } catch (error) {
        console.error(
          `Error fetching combination metadata for ${item.combination_id}:`,
          error
        );
        // Continue with next item instead of breaking the entire loop
      }
    }
    console.log("combination_metadata_Fetched", combination_metadata_Fetched);
  }

  const productsMetadataArr = combination_metadata_Fetched?.map((item) => {
    const productMetadata = item?.original_metadata?.product?.metadata;
    return {
      combination_id: item?.combination_details?.combination_id,
      family: productMetadata?.family,
      type: productMetadata?.type,
      filename: productMetadata?.filename,
    };
  });
  // console.log('productsMetadataArr', productsMetadataArr);

  const swatchesMetadataArr = combination_metadata_Fetched?.map((item) => {
    const swatchMetadata = item?.original_metadata?.swatch?.metadata;
    return {
      combination_id: item?.combination_details?.combination_id,
      family: swatchMetadata?.family,
      child: swatchMetadata?.child,
      filename: swatchMetadata?.filename,
    };
  });
  // console.log('swatchesMetadataArr', swatchesMetadataArr);

  const originalswatches = [
    ...(staticData?.original_files?.swatches ?? []),
    // ...(staticData?.original_files?.swatches ?? []),
    // ...(staticData?.original_files?.swatches ?? []),
  ].map((swatch, index) => ({
    id: `swatch-${index}`,
    combination_id: swatchesMetadataArr?.[index]?.combination_id,
    url: swatch,
    family: swatchesMetadataArr?.[index]?.family,
    child: swatchesMetadataArr?.[index]?.child,
    filename: swatchesMetadataArr?.[index]?.filename,
  }));
  console.log("combination_metadata_Fetched", combination_metadata_Fetched);

  return (
    <>
      <StickyBarWithScrollDetection
        swatches={originalswatches}
        triggerId="trigger-sticky-bar"
      />

      <section
        className={cn(
          "pt-[72px] sm:pt-[55px] lg:pt-[48px]",
          "relative z-[999]"
          // 'overflow-x-hidden',
          // "py-[25px] pb-[100px]"
        )}
      >
        <Banner4CardStacked
          imageUrlRoom={originalRoom}
          imageUrlMoodboard={mood_board_url}
          imageUrlFinalRoom={final_room_url}
          style={roomStyle}
        />
      </section>

      <div
        className={cn(
          "flex w-full flex-col px-[20px]",
          "rounded-[16px]",
          "overflow-hidden"
        )}
      >
        <section className="  min-[1024px]:pt-6 pt-6 sm:pt-12 pb-6 ">
          {/* <TitleClippedText
            imageUrl={originalRoom}
            title="Design playground"
            subtitle="DIVE IN & EXPLORE YOUR"
            text="From Room to Revolution: Design your Ultimate Modular Sectional"
            className="mb-[30px]"
          /> */}
          <TitleGold
            title="Design playground"
            subtitle="DIVE IN & EXPLORE YOUR"
            text="From Room to Revolution: Design your Ultimate Modular Sectional"
            className="mb-[30px]"
          />
          <BannerLeftBoxOverlaid
            imageUrl={final_room_url}
            swatches={originalswatches}
            className="relative z-[10] mb-10 sm:mb-[50px] lg:mb-[300px]"
            videoUrl={generatedVideoUrl}
            moodboardUrl={mood_board_url}
          />
        </section>

        {/* <CarouselEmbla/> */}

        <section className="py-[25px]" id="your-selections">
          {/* <TitleClippedText
            imageUrl={originalRoom}
            title="Your selections"
            subtitle="DIVE IN & EXPLORE YOUR"
            text="From Room to Revolution: Design your Ultimate Modular Sectional"
            className="mb-[30px]"
          /> */}
          <TitleGold
            title="Your selections"
            subtitle="DIVE IN & EXPLORE YOUR"
            text="From Room to Revolution: Design your Ultimate Modular Sectional"
            className="mb-[30px]"
          />
          <BannerBoxRightSwatches
            imageUrl={originalRoom}
            swatches={originalswatches}
            className="relative z-[11]"
          />
        </section>
        {/* <TitleBigWithSubtitle subTitle="explore your" title="Dreamboard." /> */}
        {/* <TitleBigWithSubtitle subTitle="explore your" title="Dreamstyles." /> */}
        {/* <TitleGold
          title="explore your Dreamstyles."
          subtitle="5 Steps to Your Signature Sanctuary"
          text="From Room to Revolution: Design your Ultimate Modular Sectional"
          className="mb-[20px]"
        /> */}

        <section className="py-[25px]" id="trigger-sticky-bar">
          {/* <TitleClippedText
            imageUrl={originalRoom}
            subtitle="DIVE IN & EXPLORE YOUR"
            title="Your Style"
            text="From Room to Revolution: Design your Ultimate Modular Sectional"
            className="mb-[30px]"
          /> */}
          <TitleGold
            title="Your Style"
            subtitle="DIVE IN & EXPLORE YOUR"
            text="From Room to Revolution: Design your Ultimate Modular Sectional"
            className="mb-[30px]"
          />
          <BannerBoxRight
            className="relative z-[0] mt-[0px]"
            imageUrl={final_room_url}
            userDescription={userDescription}
            roomStyle={roomStyle}
          />
        </section>
      </div>

      {/* <BannerVideo title="Dreamboard" /> */}
      <Suspense fallback={<SkeletonGrid />}>
        <ListCombinations
          staticData={staticData}
          staticError={error}
          fallbackSessionId={sessionIdParam}
          // combinationMetadataFetched={combination_metadata_Fetched}
          productsMetadataArr={productsMetadataArr}
          swatchesMetadataArr={swatchesMetadataArr}
        />
      </Suspense>
      {/* <FormOrderSwatches /> */}

      <section className="py-[25px]">
        <div className="container">
          {/* <TitleClippedText
            imageUrl={originalRoom}
            title="Get Comfortable: DreamComfort"
            subtitle="Choose Your Comfort, Own Your Bliss."
            text="From Cloud-Soft to Performance-Perfect - make every sit a signature."
            className="mb-[30px]"
          /> */}
          <TitleGold
            title="Get Comfortable: DreamComfort"
            subtitle="Choose Your Comfort, Own Your Bliss."
            text="From Cloud-Soft to Performance-Perfect - make every sit a signature."
            className="mb-[30px]"
          />
          <TabsDreamComfort style={roomStyle} />
        </div>
      </section>

      <section className={cn("flex flex-col", "py-[50px]")}>
        {/* <div
            className={cn(
              // 'py-[50px]',
              'pl-[20px]',
              'sm:pl-[calc((100vw-640px)/2+20px)]',
              'md:pl-[calc((100vw-768px)/2+20px)]',
              'lg:pl-[calc((100vw-1024px)/2+20px)]',
              'xl:pl-[calc((100vw-1200px)/2+20px)]',
              '2xl:pl-[calc((100vw-1536px)/2+20px)]',
            )}
          >
          </div> */}

        <div className="container">
          {/* <TitleBigWithSubtitle
              subTitle="explore your"
              title="Dreamboards."
            /> */}
          {/* <TitleClippedText
            imageUrl={originalRoom}
            subtitle="DIVE IN & EXPLORE YOUR"
            title="DREAMEXPERIENCE"
            text="From Room to Revolution: Design your Ultimate Modular Sectional"
            className="mb-[30px]"
          /> */}
          <TitleGold
            title="The Dream Experience"
            subtitle="Every feature, every feeling, reimagined."
            text="Enduring frames, cloud-soft fabrics, and easy care let you live boldly, lounge stylishly, and love your space for years to come."
            className="mb-[30px]"
          />
        </div>
        <SliderDreamExperience
          // items={dreamExperienceArr}
          className=""
        />
      </section>

      <section className="mb-[100px]">
        <div className="container">
          {/* <TitleClippedText
            imageUrl={originalRoom}
            subtitle="DIVE IN & EXPLORE YOUR"
            title="dREAMswatches"
            text="From Room to Revolution: Design your Ultimate Modular Sectional"
            className="mb-[30px]"
          /> */}
          <TitleGold
            title="Get Your DREAMBOX"
            subtitle="See, Touch, Dream! Feel Every Fabric. Imagine Every Mood."
            text="Bring the Dreamsofa experience home - order complimentary swatches to discover colors, textures, and weaves that speak to you. See, touch, and dream in full color, turning possibilities into the perfect match for your space."
            className="mb-[30px]"
          />
          {/* <TitleGold
          title="Get Your DREAMBOX"
          subtitle="See, Touch, Dream! Feel Every Fabric. Imagine Every Mood."
          text="Bring the Dreamsofa experience home - order complimentary swatches to discover colors, textures, and weaves that speak to you. See, touch, and dream in full color, turning possibilities into the perfect match for your space."
          className="mb-[20px]"
        /> */}
          <BannerDreamBox
            imageRoomUrl={originalRoom}
            imageDreamboardUrl={mood_board_url}
          />
        </div>
      </section>
    </>
  );
};

export default PageDreamBoardResults;

// Generate static params for known session IDs and their combinations
export async function generateStaticParams() {
  const sessionIds = await getAllSessionIds();
  const params: { id: string }[] = [];

  // Add individual session IDs
  sessionIds.forEach((sessionId) => {
    params.push({ id: sessionId });
  });

  // Add common combinations
  const commonCombinations = getCommonSessionCombinations;
  commonCombinations.forEach((combination) => {
    if (combination.every((id) => sessionIds.includes(id))) {
      params.push({ id: combination.join(",") });
    }
  });

  return params;
}

// This function runs at build time for SSG
async function getStaticData(sessionIds: string[]) {
  try {
    // Fetch data for all session IDs
    const [data, combinationMetadataPromises] = await Promise.all([
      fetchMultipleSessionData(sessionIds),
      Promise.all(
        sessionIds.map((sessionId) => fetchAllCombinationMetadata(sessionId))
      ),
    ]);

    // Merge all combination metadata
    const allCombinationMetadata = combinationMetadataPromises.reduce(
      (acc, metadata) => {
        return Object.assign(acc, metadata);
      },
      {} as Record<string, any>
    );

    return {
      data: {
        ...data,
        combinationMetadata: allCombinationMetadata,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching static data:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
