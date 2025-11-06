'use server';

import type {
  BulkSessionResponse,
  BulkStatusResponse,
  MasterBulkResults,
} from '@/types/BulkSession';
import type { ICombinationMetadata } from '@/types/ICombinationMetadata';

// Server-side data fetching functions for SSG
export async function fetchBulkStatus(
  sessionId: string,
): Promise<BulkStatusResponse> {
  const response = await fetch(
    `https://hzyp6sttrv.us-east-1.awsapprunner.com/bulk-status/${sessionId}`,
    {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch bulk status: ${response.status}`);
  }

  return response.json();
}

export async function fetchBulkSession(
  sessionId: string,
): Promise<BulkSessionResponse> {
  const response = await fetch(
    `https://hzyp6sttrv.us-east-1.awsapprunner.com/bulk-session/${sessionId}/files`,
    {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch bulk session: ${response.status}`);
  }

  return response.json();
}

export async function fetchMasterBulkResults(
  sessionId: string,
): Promise<MasterBulkResults> {
  const response = await fetch(
    `https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-${sessionId}/master_bulk_results.json`,
    {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch master bulk results: ${response.status}`);
  }

  return response.json();
}

export async function fetchCombinationMetadata(
  sessionId: string,
  combinationId: string,
): Promise<ICombinationMetadata> {
  const response = await fetch(
    `https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-${sessionId}/combination_${combinationId}/combination_metadata.json`,
    {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch combination metadata: ${response.status}`);
  }

  return response.json();
}

// Helper function to fetch multiple session data for SSG
export async function fetchMultipleSessionData(sessionIds: string[]) {
  const results = await Promise.allSettled(
    sessionIds.map(async (sessionId) => {
      const [bulkStatus, bulkSession] = await Promise.all([
        fetchBulkStatus(sessionId),
        fetchBulkSession(sessionId),
      ]);

      return {
        sessionId,
        bulkStatus,
        bulkSession,
      };
    }),
  );

  const successfulResults = results
    .filter(
      (result): result is PromiseFulfilledResult<any> =>
        result.status === 'fulfilled',
    )
    .map((result) => result.value);

  const failedResults = results
    .filter(
      (result): result is PromiseRejectedResult => result.status === 'rejected',
    )
    .map((result, index) => ({
      sessionId: sessionIds[index],
      error: result.reason,
    }));

  // Aggregate all results similar to the client-side hooks
  const allResults = successfulResults.flatMap(({ bulkStatus }) =>
    (bulkStatus.results || []).map((result: any) => ({
      ...result,
      _sourceSessionId: bulkStatus.session_id,
    })),
  );

  const allCombinationFiles = successfulResults.reduce(
    (acc, { bulkSession, sessionId }) => {
      if (bulkSession.combination_files) {
        Object.entries(bulkSession.combination_files).forEach(
          ([combinationId, files]) => {
            const uniqueCombinationId = `${sessionId}-${combinationId}`;
            acc[uniqueCombinationId] = {
              ...(files as any),
              _sourceSessionId: sessionId,
              _originalCombinationId: combinationId,
            };
          },
        );
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  const allOriginalFiles = successfulResults.reduce(
    (acc, { bulkSession }) => {
      if (bulkSession.original_files) {
        if (bulkSession.original_files.swatches) {
          acc.swatches = [
            ...(acc.swatches || []),
            ...bulkSession.original_files.swatches,
          ];
        }
        if (bulkSession.original_files.products) {
          acc.products = [
            ...(acc.products || []),
            ...bulkSession.original_files.products,
          ];
        }
        if (bulkSession.original_files.rooms) {
          acc.rooms = [
            ...(acc.rooms || []),
            ...bulkSession.original_files.rooms,
          ];
        }
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  return {
    results: allResults,
    combination_files: allCombinationFiles,
    original_files: allOriginalFiles,
    sessionIds: sessionIds,
    errors: failedResults,
  };
}

// Pre-defined session IDs for SSG (you can expand this list)
const KNOWN_SESSION_IDS = [
  '2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1',
  'b411d6b6-22a7-4cc8-9615-66af80cbfc5b',
  'bd05435e-a35c-4e10-aedf-ab8c630a2caf',
  'c478a01a-a92c-4ec6-8efa-901f53106782',
  'f2b37658-550d-4ffc-bc05-a4f42a0fabe2',
];

// Function to get all possible session IDs for generateStaticParams
export async function getAllSessionIds(): Promise<string[]> {
  // For now, return the known session IDs
  // In a real app, you might fetch this from a database or API
  return KNOWN_SESSION_IDS;
}

// Function to pre-fetch all combination metadata for a session
export async function fetchAllCombinationMetadata(sessionId: string) {
  try {
    const bulkStatus = await fetchBulkStatus(sessionId);

    const combinationMetadataMap: Record<string, ICombinationMetadata> = {};

    // Fetch metadata for each combination
    const metadataPromises = bulkStatus.results.map(async (result) => {
      try {
        const metadata = await fetchCombinationMetadata(
          sessionId,
          result.combination_id.toString(),
        );
        return {
          combinationId: result.combination_id.toString(),
          metadata,
        };
      } catch (error) {
        console.warn(
          `Failed to fetch metadata for combination ${result.combination_id}:`,
          error,
        );
        return null;
      }
    });

    const metadataResults = await Promise.allSettled(metadataPromises);

    metadataResults.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        combinationMetadataMap[result.value.combinationId] =
          result.value.metadata;
      }
    });

    return combinationMetadataMap;
  } catch (error) {
    console.error('Error fetching combination metadata:', error);
    return {};
  }
}
