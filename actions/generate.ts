'use server';

// Types for the Bulk Process JSON request/response
export type Base64ImageInput = {
  base64_data: string;
  filename: string;
  metadata: Record<string, unknown>;
};

export interface BulkProcessJsonRequest {
  swatch_images: Base64ImageInput[];
  product_images: Base64ImageInput[];
  room_images: Base64ImageInput[];
  room_styles: string;
  room_aspect_ratio: string; // e.g., "landscape" | "portrait" | "square"
  retain_room_structure: boolean;
  make_combinations: boolean;
  user_description: string;
  generate_mood_board: boolean;
  generate_video: boolean;
  generate_social_content: boolean;
}

export interface BulkProcessJsonResponse {
  success: boolean;
  session_id: string;
  message: string;
  total_combinations: number;
  s3_folder: string;
  estimated_processing_time_minutes: number;
  status_check_url: string;
  error: string | null;
}

const API_BASE =
  process.env.API_BASE || 'https://hzyp6sttrv.us-east-1.awsapprunner.com';

export async function generateBulkProcessJson(
  payload: BulkProcessJsonRequest,
): Promise<BulkProcessJsonResponse> {
  const response = await fetch(`${API_BASE}/bulk-process-json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const data = (await response.json()) as Partial<BulkProcessJsonResponse> &
        Record<string, unknown>;
      if (typeof data?.error === 'string' && data.error) {
        errorMessage = data.error;
      } else if (typeof data?.message === 'string' && data.message) {
        errorMessage = data.message;
      }
    } catch {
      try {
        errorMessage = await response.text();
      } catch {}
    }
    throw new Error(`Failed to start bulk processing: ${errorMessage}`);
  }

  const data = (await response.json()) as BulkProcessJsonResponse;
  return data;
}
