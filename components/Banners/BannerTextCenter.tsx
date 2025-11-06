import Image from 'next/image';
import Overlay from '@/components/Overlay';
import { cn } from '@/lib/utils';
import image_banner_default from '@/public/images/bg-banner.jpg';

interface IComponentProps {
  className?: string;
  imageUrl?: string;
  title?: string;
}

const BannerTextCenter = ({
  className,
  title = 'Your dreamboard',
  imageUrl,
}: IComponentProps) => {
  return (
    <div className={cn('BannerTextCenter', 'relative', className)}>
      <Overlay className="bg-black/10" />
      <div className="flex items-center justify-center">
        <Image
          className={cn(
            'h-auto w-full',
            'lg:min-h-[500px]',
            'lg:max-h-[600px]',
            'object-cover object-center',
          )}
          src={imageUrl || image_banner_default}
          alt="Banner"
          width={1500}
          height={1000}
        />
        <h1
          className={cn(
            'absolute',
            '-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-[10]',
            'font-bold text-4xl text-white uppercase',
            'text-center',
            'text-[40px] md:text-[80px] lg:text-[128px]',
            'opacity-75',
            'leading-none',
            'text-shadow-[-11px_13px_13px_rgba(0,0,0,0.75)]',
          )}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default BannerTextCenter;
