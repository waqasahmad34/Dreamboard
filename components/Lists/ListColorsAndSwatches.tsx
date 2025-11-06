import Image from 'next/image';
import { cn } from '@/lib/utils';

type TComponentProps = {
  className?: string;
  items?: {
    color?: string;
    swatchImageSrc?: string;
    swatchImageAlt?: string;
    className?: string;
  }[];
};

const ListColorsAndSwatches = ({ className, items = [] }: TComponentProps) => {
  if (items.length === 0) return null;
  return (
    <ul className={cn( 'ListColorsAndSwatches', 'flex gap-2', className)}>
      {items?.map((item) => (
        <li
          key={item.color ?? item.swatchImageSrc}
          className={cn(
            'h-[20px] w-[20px] rounded-full lg:h-[25px] lg:w-[25px]',
            item.className,
          )}
          style={{ backgroundColor: item.color ?? 'transparent' }}
        >
          {item.swatchImageSrc ? (
            <Image
              src={item.swatchImageSrc}
              alt={item.swatchImageAlt ?? 'swatch image'}
              width={20}
              height={20}
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default ListColorsAndSwatches;
