// Color palette types
export interface ColorRGB {
  hex: string;
  rgb: [number, number, number];
}

export interface ColorPaletteItem extends ColorRGB {
  index: number;
}

export interface ColorPalette {
  dominant_color: ColorRGB;
  palette: ColorPaletteItem[];
  hex_codes: string[];
  extracted_from: string;
  color_count: number;
}

// Combination details types
export interface CombinationDetails {
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

// Social content types
export interface SocialContentCommon {
  title_caption_hook: string;
  description_body: string;
  tags_keywords: string[];
  call_to_action: string;
  alt_text: string;
  hashtags: string[];
}

export interface InstagramReels {
  cover_text: string;
  notes: string;
  extras: string;
}

export interface InstagramCarousel {
  slide_sequence: string[];
  extras: string;
}

export interface YouTubeShorts {
  thumbnail_text: string;
  extras: string;
}

export interface YouTubeLong {
  video_outline: string[];
  extras: string;
}

export interface Pinterest {
  pin_title: string;
  pin_description: string;
  extras: string;
}

export interface Reddit {
  post_title: string;
  post_body: string;
  extras: string;
}

export interface TikTok {
  on_screen_text: string;
  script_or_voiceover: string;
  extras: string;
}

export interface Twitter {
  tweet_text: string;
  extras: string;
}

export interface PlatformSpecific {
  instagram_reels: InstagramReels;
  instagram_carousel: InstagramCarousel;
  youtube_shorts: YouTubeShorts;
  youtube_long: YouTubeLong;
  pinterest: Pinterest;
  reddit: Reddit;
  tiktok: TikTok;
  twitter: Twitter;
}

export interface SocialContent {
  common: SocialContentCommon;
  platform_specific: PlatformSpecific;
}

// Global metadata types
export interface InputCounts {
  swatch_images: number;
  product_images: number;
  room_images: number;
}

export interface FrontendMetadataProvided {
  swatch_metadata_count: number;
  product_metadata_count: number;
  room_metadata_count: number;
}

export interface GlobalMetadata {
  session_type: string;
  room_styles: string[];
  room_aspect_ratio: string;
  retain_room_structure: boolean;
  make_combinations: boolean;
  user_description: string | null;
  generate_mood_board: boolean;
  generate_video: boolean;
  generate_social_content: boolean;
  input_counts: InputCounts;
  frontend_metadata_provided: FrontendMetadataProvided;
}

// Generation info types
export interface GenerationInfo {
  generated_at: string;
  model_used: string;
  version: string;
}

// Processing results types
export interface ProcessingResults {
  combination_id: number;
  status: string;
  styled_product_url: string;
  final_room_url: string;
  mood_board_url: string;
  video_status: string;
  video_prediction_id: string;
  video_url: string | null;
  s3_video_url: string | null;
  video_started_at: string;
  video_completed_at: string | null;
  social_content: SocialContent;
  global_metadata: GlobalMetadata;
  generation_info: GenerationInfo;
  metadata: {
    combination_id: number;
    generated_at: string;
    combination_details: CombinationDetails;
    color_palette: ColorPalette;
  };
  errors: unknown[];
  processing_time_seconds: number;
  combination_metadata: CombinationDetails;
  color_palette: ColorPalette;
}

// Original metadata types
export interface FileMetadata {
  type: string;
  source: string;
  folder_path: string;
  file_size: number;
  file_extension: string;
  filename: string;
}

export interface OriginalFile {
  filename: string;
  metadata: FileMetadata;
}

export interface OriginalMetadata {
  swatch: OriginalFile;
  product: OriginalFile;
  room: OriginalFile;
}

// Video tracking types
export interface VideoTracking {
  video_requested: boolean;
  prediction_id: string;
  video_status: string;
  started_at: string;
}

// Main combination metadata type
export interface ICombinationMetadata {
  combination_details: CombinationDetails;
  processing_results: ProcessingResults;
  original_metadata: OriginalMetadata;
  user_description: string;
  global_api_metadata: GlobalMetadata;
  video_tracking: VideoTracking;
  color_palette: ColorPalette;
  completed_at: string;
}

// Utility types for easier access
export type RoomStyle =
  | 'modern'
  | 'bohemian'
  | 'contemporary'
  | 'farmhouse'
  | 'midcentury'
  | 'minimalistic';
export type RoomAspectRatio = 'portrait' | 'landscape' | 'square';
export type VideoStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type ProcessingStatus =
  | 'completed_pending_video'
  | 'completed'
  | 'processing'
  | 'failed';
