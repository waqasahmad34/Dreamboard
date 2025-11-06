import type { Metadata } from 'next';
import { Suspense } from 'react';
import {
  fetchAllCombinationMetadata,
  fetchMultipleSessionData,
  getAllSessionIds,
} from '@/actions/sessions';
import Banner from '@/components/Banner';
// import image_banner from '@/public/images/bg-banner.jpg';
import FormOrderSwatches from './_components/Forms/FormOrderSwatches';
import ListCombinations from './_components/ListCombinations';
import SkeletonGrid from './_components/SkeletonGrid';

export const metadata: Metadata = {
  title: 'Your Dream Board Results',
  description:
    'View your personalized dream board results and room combinations',
  robots: 'noindex, nofollow',
};

// Function to generate common session ID combinations for static generation
const getCommonSessionCombinations = [
  [
    '2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1',
    'b411d6b6-22a7-4cc8-9615-66af80cbfc5b',
  ],
  [
    '2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1',
    'bd05435e-a35c-4e10-aedf-ab8c630a2caf',
  ],
  [
    'b411d6b6-22a7-4cc8-9615-66af80cbfc5b',
    'bd05435e-a35c-4e10-aedf-ab8c630a2caf',
  ],
];

export const revalidate = 3600; // 1 hour

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

const PageDreamBoardResults = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const sessionIdParam = params.id || '2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1';

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
    .split(',')
    .map((id) => id.trim())
    .filter((id) => id.length > 0);

  // Fetch data at build time for SSG
  const { data: staticData, error } = await getStaticData(sessionIds);
  // console.log('staticData', staticData);

  const final_room_url = staticData?.results?.[0]?.final_room_url;

  return (
    <>
      <Banner imageUrl={final_room_url} />
      <Suspense fallback={<SkeletonGrid />}>
        <ListCombinations
          staticData={staticData}
          staticError={error}
          fallbackSessionId={sessionIdParam}
        />
      </Suspense>
      {/* <FormOrderSwatches /> */}
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
      params.push({ id: combination.join(',') });
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
        sessionIds.map((sessionId) => fetchAllCombinationMetadata(sessionId)),
      ),
    ]);

    // Merge all combination metadata
    const allCombinationMetadata = combinationMetadataPromises.reduce(
      (acc, metadata) => {
        return Object.assign(acc, metadata);
      },
      {} as Record<string, any>,
    );

    return {
      data: {
        ...data,
        combinationMetadata: allCombinationMetadata,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error fetching static data:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
