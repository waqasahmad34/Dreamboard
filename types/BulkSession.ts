export interface OriginalFiles {
  swatches: string[];
  products: string[];
  rooms: string[];
}

export interface CombinationFiles {
  [key: string]: {
    'combination_metadata.json': string;
    'final_room_integration.png': string;
    'generated_video.mp4'?: string;
    'mood_board.png': string;
    'styled_product.png': string;
    'video_status_update.json'?: string;
  };
}

export interface MasterFiles {
  'bulk_processing_status.json': string;
  'global_metadata.json': string;
  'master_bulk_results.json': string;
}

export interface FilesByType {
  original_swatches: number;
  original_products: number;
  original_rooms: number;
  styled_products: number;
  room_integrations: number;
  mood_boards: number;
  videos: number;
  social_content: number;
  metadata: number;
  status_files: number;
}

export interface BulkSessionResponse {
  success: boolean;
  session_id: string;
  message: string;
  total_files: number;
  total_combinations: number;
  original_files: OriginalFiles;
  combination_files: CombinationFiles;
  master_files: MasterFiles;
  files_by_type: FilesByType;
  s3_folder: string;
  error: string | null;
}

// Helper types for specific combinations
export interface Combination {
  id: string;
  metadata: string;
  finalRoomIntegration: string;
  generatedVideo?: string;
  moodBoard: string;
  styledProduct: string;
  videoStatusUpdate?: string;
}

// Utility type for extracting combination data
export type CombinationData = {
  [K in keyof CombinationFiles]: {
    id: K;
    metadata: string;
    finalRoomIntegration: string;
    generatedVideo?: string;
    moodBoard: string;
    styledProduct: string;
    videoStatusUpdate?: string;
  };
};

// New types for the bulk status endpoint
export interface CombinationMetadata {
  combination_id: number;
  swatch_index: number;
  product_index: number;
  room_index: number;
  room_style: string;
  swatch_filename: string;
  product_filename: string;
  room_filename: string;
  room_aspect_ratio: string;
  retain_room_structure: boolean;
}

export interface CombinationResult {
  combination_id: number;
  status: string;
  styled_product_url: string;
  final_room_url: string;
  mood_board_url: string;
  video_status: string;
  video_prediction_id: string | null;
  video_url: string | null;
  s3_video_url: string | null;
  video_started_at: string | null;
  video_completed_at: string | null;
  social_content: any | null;
  errors: string[];
  processing_time_seconds: number;
  combination_metadata: CombinationMetadata;
  color_palette: Record<string, any>;
}

export interface BulkStatusResponse {
  success: boolean;
  session_id: string;
  status: string;
  total_combinations: number;
  completed_combinations: number;
  failed_combinations: number;
  pending_video_combinations: number;
  progress_percentage: number;
  processing_time_elapsed_seconds: number;
  estimated_time_remaining_minutes: number;
  video_generation_summary: any | null;
  results: CombinationResult[];
  s3_folder: string;
  master_results_url: string;
  error: string | null;
}

// New types for the master bulk results from S3
export interface SessionInfo {
  session_id: string;
  processing_completed_at: string;
  total_processing_time_seconds: number;
}

export interface GlobalApiMetadata {
  session_type: string;
  room_styles: string[];
  room_aspect_ratio: string;
  retain_room_structure: boolean;
  make_combinations: boolean;
  user_description: string;
  generate_mood_board: boolean;
  generate_video: boolean;
  generate_social_content: boolean;
  input_counts: {
    swatch_images: number;
    product_images: number;
    room_images: number;
  };
  frontend_metadata_provided: {
    swatch_metadata_count: number;
    product_metadata_count: number;
    room_metadata_count: number;
  };
}

export interface Summary {
  total_combinations: number;
  successful_combinations: number;
  failed_combinations: number;
  success_rate: number;
  pending_videos: number;
}

export interface ProcessingSettings {
  user_description: string;
  retry_logic_enabled: boolean;
  max_retries_room_integration: number;
}

export interface MasterBulkResults {
  session_info: SessionInfo;
  global_api_metadata: GlobalApiMetadata;
  summary: Summary;
  s3_folder: string;
  combinations: CombinationResult[];
  processing_settings: ProcessingSettings;
}
