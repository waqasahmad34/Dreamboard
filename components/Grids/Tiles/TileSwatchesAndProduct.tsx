import Image from 'next/image';
import BoxShadow from '@/components/BoxShadow';
import { cn } from '@/lib/utils';
import need_static from '@/public/images/need_static.jpg';

interface TileSwatchesAndProductProps {
  classNameRounded: string;
  swatch_filename: string;
  swatch_url: string;
  combination: any;
}

const TileSwatchesAndProduct = ({
  classNameRounded,
  swatch_filename,
  swatch_url,
  combination,
}: TileSwatchesAndProductProps) => {
  return (
    <div
      className={cn(
        'relative w-full bg-white',
        classNameRounded,
        'flex flex-col items-center justify-center gap-[60px]',
        'p-10',
        'shadow-xl',
      )}
    >
      {/* SWATCHES : 3 Images */}
      <div className="relative h-[250px] w-[250px]">
        <div className="absolute top-0 left-0">
          <Image
            src={need_static}
            alt={`styled_product_url`}
            className={cn('rounded-[16px] object-contain shadow-xl')}
            width={130}
            height={130}
          />
        </div>
        {swatch_filename && (
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-[10] overflow-hidden">
            <Image
              src={swatch_url}
              alt={`Swatch ${swatch_filename}`}
              width={130}
              height={130}
              className="scale-115 rounded-[16px] object-contain shadow-xl"
            />
          </div>
        )}
        <div className="absolute right-0 bottom-0">
          <Image
            src="https://d3m7r2hywaso4h.cloudfront.net/temp_assets/need_static_1.jpg"
            alt={`styled_product_url`}
            className={cn('rounded-[16px] object-contain shadow-xl')}
            width={130}
            height={130}
          />
        </div>
      </div>

      {/* PRODUCT */}
      <div className={cn('relative')}>
        <Image
          src={combination.styled_product_url}
          alt={`styled_product_url`}
          className={cn(
            'object-contain',
            // 'block',
            // 'inset-shadow-sm/50',
            // 'shadow-[-1px_1px_16px_2px_rgba(0,0,0,0.49)_inset]',
          )}
          width={1000}
          height={800}
        />
        {/* <div
          className={cn('BoxShadowCustom', 'absolute inset-0 z-[10]')}
          style={{
            boxShadow: 'inset 0px 0px 5px 5px #FFFFFF',
          }}
        /> */}
      </div>
    </div>
  );
};

export default TileSwatchesAndProduct;
