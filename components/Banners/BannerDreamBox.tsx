import Image from 'next/image';
import { cn } from '@/lib/utils';

interface IComponentProps {
  className?: string;
  imageRoomUrl?: string;
  imageDreamboardUrl?: string;
}

import Link from 'next/link';
import image_dreambox from '@/public/images/banners/dreambox.jpg';
import image_order_free_swatches_swatch_kit from '@/public/images/banners/order-free-swatches-swatch-kit.jpg';

const BannerDreamBox = ({
  className,
  imageRoomUrl,
  imageDreamboardUrl,
}: IComponentProps) => {
  return (
    <Link
      href="https://www.dreamsofa.com/order-free-swatches/"
      className={cn(
        'BannerDreamBox',
        'rounded-[16px]',
        'flex items-center justify-center',
        'overflow-hidden',
        'relative',
        'cursor-pointer',
        'group',
        className,
      )}
    >
      <Image
        className="h-full w-full rounded-[16px] object-cover"
        src={imageRoomUrl || image_dreambox}
        alt="Banner"
        width={1500}
        height={1000}
      />

      {/* LEFT */}
      <div
        className={cn(
          'absolute',
          '-translate-x-1/2 left-1/4',
          '-translate-y-1/2 top-1/2',
          'rounded-[16px]',
          'overflow-hidden',
          'transition-all duration-1500 ease-out',
          'group-hover:-translate-x-1/2 group-hover:left-1/2',
        )}
      >
        <Image
          src={imageDreamboardUrl || image_order_free_swatches_swatch_kit}
          alt="Banner"
          width={374}
          height={374}
          className="aspect-square w-[150px] object-cover lg:w-[374px]"
          loading='lazy'
        />
      </div>

      {/* RIGHT */}
      <div
        className={cn(
          'absolute',
          'right-1/4 translate-x-1/2',
          '-translate-y-1/2 top-1/2',
          'flex flex-col items-center justify-center',
          'text-white',
          'text-[20px]',
          'font-bold',
          'uppercase',
          'tracking-[20px]',
          'transition-all duration-1500 ease-out',
          'group-hover:-translate-x-1/2 group-hover:left-1/2',
        )}
      >
        <h3
          className={cn(
            'text-white',
            'uppercase',
            'break-words text-center font-semibold leading-none',
            'tracking-[0.6em]',
            'selection:bg-[#F97352] selection:text-white',
            'text-[20px] lg:text-[50px]',
          )}
        >
          Order
        </h3>
        <span
          className={cn(
            'text-white',
            'mx-0 mt-2.5 mb-0 inline-block p-0 text-center align-baseline font-semibold leading-none tracking-[0]',
            'uppercase',
            'selection:bg-[#F97352] selection:text-white',
            'text-[20px] lg:text-[80px]',
          )}
        >
          Swatches
        </span>
      </div>
    </Link>
  );
};

export default BannerDreamBox;
