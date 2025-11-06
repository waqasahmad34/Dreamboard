import Image from 'next/image';
import Overlay from '@/components/Overlay';
import { cn } from '@/lib/utils';
import image_banner_default from '@/public/images/bg-banner.jpg';

interface IComponentProps {
  className?: string;
  imageUrl?: string;
  title?: string;
}

const BannerBoxRight = ({
  className,
  title = 'Your dreamboard',
  imageUrl,
}: IComponentProps) => {
  return (
    <div className={cn('BannerBoxRight', 'relative', className)}>
      <Overlay className="bg-black/10" />
      <div className="grid grid-cols-3">
        <Image
          className={cn(
            'col-span-2',
            'h-auto w-full object-cover lg:min-h-[500px]',
          )}
          src={imageUrl || image_banner_default}
          alt="Banner"
          width={1500}
          height={1000}
        />
        <div className="relative col-span-1 flex items-center justify-center">
          <Image
            className={cn('h-auto w-full object-cover')}
            src={imageUrl || image_banner_default}
            alt="Banner"
            fill
          />
          <div
            className={cn(
              'bg-black/15',
              'backdrop-blur-lg',
              'relative z-10 flex h-full w-full items-center justify-center',
            )}
          >
            <div
              className={cn(
                'h-[80%] w-[80%] rounded-[16px] bg-white shadow-xl',
                'flex items-center justify-center',
              )}
            >
              Content
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerBoxRight;
