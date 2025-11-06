import Image from 'next/image';
import { cn } from '@/lib/utils';
import image_banner_default from '@/public/images/bg-banner.jpg';
import Overlay from './Overlay';

interface IComponentProps {
  className?: string;
  imageUrl?: string;
  title?: string;
}

const Banner = ({
  className,
  title = 'Your dreamboard',
  imageUrl,
}: IComponentProps) => {
  const variants = [
    {
      component: (
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
      ),
    },
    {
      component: (
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
      ),
    },
  ];

  return (
    <div className={cn('Banner', 'relative', className)}>
      <Overlay className="bg-black/10" />
      {variants[0].component}
    </div>
  );
};

export default Banner;
