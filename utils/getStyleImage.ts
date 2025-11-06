import image_coast from '@/public/images/bg-tile-coast.png';

import image_style_bohemian_landscape from '@/public/images/styles/bohemian_landscape.jpg';
import image_style_bohemian_portrait from '@/public/images/styles/bohemian_portrait.jpg';
import image_style_bohemian_square from '@/public/images/styles/bohemian_square.jpg';
import image_style_contemporary_landscape from '@/public/images/styles/contemporary_landscape.jpg';
import image_style_contemporary_portrait from '@/public/images/styles/contemporary_portrait.jpg';
import image_style_contemporary_square from '@/public/images/styles/contemporary_square.jpg';
import image_style_farmhouse from '@/public/images/styles/farmhouse_landscape.jpg';
import image_style_farmhouse_portrait from '@/public/images/styles/farmhouse_portrait.jpg';
import image_style_farmhouse_square from '@/public/images/styles/farmhouse_square.jpg';
import image_style_mid_century from '@/public/images/styles/mid_century_landscape.jpg';
import image_style_mid_century_portrait from '@/public/images/styles/mid_century_portrait.jpg';
import image_style_mid_century_square from '@/public/images/styles/mid_century_square.jpg';
import image_style_minimalist from '@/public/images/styles/minimalist_landscape.jpg';
import image_style_minimalist_portrait from '@/public/images/styles/minimalist_portrait.jpg';
import image_style_minimalist_square from '@/public/images/styles/minimalist_square.jpg';
import image_style_modern from '@/public/images/styles/modern_landscape.jpg';
import image_style_modern_portrait from '@/public/images/styles/modern_portrait.jpg';
import image_style_modern_square from '@/public/images/styles/modern_square.jpg';

export default function getStyleImage(
  style: string = 'modern',
  aspectRation: string = 'landscape',
) {
  switch (`${style}-${aspectRation}`) {
    case 'bohemian-landscape':
      return image_style_bohemian_landscape;
    case 'bohemian-portrait':
      return image_style_bohemian_portrait;
    case 'bohemian-square':
      return image_style_bohemian_square;
    case 'contemporary-landscape':
      return image_style_contemporary_landscape;
    case 'contemporary-portrait':
      return image_style_contemporary_portrait;
    case 'contemporary-square':
      return image_style_contemporary_square;
    case 'farmhouse-landscape':
      return image_style_farmhouse;
    case 'farmhouse-portrait':
      return image_style_farmhouse_portrait;
    case 'farmhouse-square':
      return image_style_farmhouse_square;
    case 'mid_century-landscape':
      return image_style_mid_century;
    case 'mid_century-portrait':
      return image_style_mid_century_portrait;
    case 'mid_century-square':
      return image_style_mid_century_square;
    case 'minimal-landscape':
      return image_style_minimalist;
    case 'minimal-portrait':
      return image_style_minimalist_portrait;
    case 'minimal-square':
      return image_style_minimalist_square;
    case 'modern-landscape':
      return image_style_modern;
    case 'modern-portrait':
      return image_style_modern_portrait;
    case 'modern-square':
      return image_style_modern_square;
    default:
      return image_coast;
  }
}
