import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ sessionId: string; combinationId: string }> },
) {
  try {
    const { sessionId, combinationId } = await params;

    // Validate session ID format (basic UUID validation)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(sessionId)) {
      return NextResponse.json(
        { error: 'Invalid session ID format' },
        { status: 400 },
      );
    }

    // Validate combination ID (should be a number)
    if (!/^\d+$/.test(combinationId)) {
      return NextResponse.json(
        { error: 'Invalid combination ID format' },
        { status: 400 },
      );
    }

    // Construct the S3 URL for the specific combination metadata
    const metadataUrl = `https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-${sessionId}/combination_${combinationId}/combination_metadata.json`;

    // Fetch the metadata from S3
    const response = await fetch(metadataUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          {
            error: `Metadata not found for session ${sessionId} and combination ${combinationId}`,
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { error: 'Failed to fetch metadata from storage' },
        { status: response.status },
      );
    }

    const metadata = await response.json();

    // Return the metadata with CORS headers
    return NextResponse.json(metadata, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Error fetching combination metadata:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
