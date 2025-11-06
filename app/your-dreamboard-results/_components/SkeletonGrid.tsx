import { Skeleton } from '@/components/ui/skeleton';
import cn from '@/utils/cn';

const SkeletonGrid = () => {
  const classNameRounded = 'rounded-[16px]';

  const CombinationSkeleton = () => (
    <div className="flex flex-col gap-8">
      {/* First row: Mood Board + Final Room */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr_1fr]">
        {/* Mood Board Skeleton - 1fr */}
        <div
          className={cn(
            'relative overflow-hidden bg-gray-100',
            classNameRounded,
          )}
        >
          <Skeleton className={cn('h-[774px] w-full', classNameRounded)} />
        </div>

        {/* Final Room Skeleton - 2fr */}
        <div className="col-span-1 lg:col-span-2">
          <Skeleton className={cn('h-[774px] w-full', classNameRounded)} />
        </div>
      </div>

      {/* Second row: Mood Board Image + Style Description + Product with Swatches */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr_1fr]">
        {/* Mood Board Image Skeleton - 1fr */}
        <div
          className={cn(
            'relative w-full overflow-hidden bg-gray-100',
            classNameRounded,
          )}
        >
          <Skeleton className={cn('h-[716px] w-full', classNameRounded)} />
        </div>

        {/* Style Description Skeleton - 1fr */}
        <div
          className={cn(
            'relative flex w-full flex-col items-center justify-center bg-red-500 px-[40px] py-[10px] pb-[60px]',
            classNameRounded,
          )}
        >
          <Skeleton
            className={cn(
              'mb-[20px] h-[50px] w-32 lg:mb-[50px] lg:h-[70px]',
              classNameRounded,
            )}
          />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* Product with Swatches Skeleton - 1fr */}
        <div
          className={cn(
            'relative flex w-full flex-col items-center justify-center gap-[60px] bg-gray-100 p-10',
            classNameRounded,
          )}
        >
          {/* Swatches area skeleton */}
          <div className="relative h-[250px] w-[250px]">
            <Skeleton
              className={cn(
                'absolute top-0 left-0 h-[130px] w-[130px]',
                classNameRounded,
              )}
            />
            <Skeleton
              className={cn(
                '-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[130px] w-[130px]',
                classNameRounded,
              )}
            />
            <Skeleton
              className={cn(
                'absolute right-0 bottom-0 h-[130px] w-[130px]',
                classNameRounded,
              )}
            />
          </div>
          {/* Product image skeleton */}
          <Skeleton className={cn('h-[400px] w-[300px]', classNameRounded)} />
        </div>
      </div>

      {/* Third row: Style Description + Video */}
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-8">
        {/* Style Description Skeleton - 1fr */}
        <div
          className={cn(
            'relative flex w-full flex-col items-center justify-center bg-red-500 px-[40px] py-[10px] pb-[60px]',
            classNameRounded,
          )}
        >
          <Skeleton className="mb-[20px] h-[50px] w-32 lg:mb-[50px] lg:h-[70px]" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>

        {/* Video Skeleton - 2fr */}
        <div
          className={cn(
            'relative col-span-2 h-full bg-gray-100',
            classNameRounded,
          )}
        >
          <Skeleton className={cn('h-[300px] w-full', classNameRounded)} />
        </div>
      </div>

      {/* Accordion Skeleton */}
      <div className="col-span-3 mt-4">
        <Skeleton className={cn('h-12 w-full', classNameRounded)} />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="mb-2 h-9 w-80" /> {/* Title skeleton */}
      </div>

      {/* Combinations section skeleton */}
      <div className="mb-12">
        <div className="grid grid-cols-1 gap-[150px]">
          {[1, 2, 3].map((i) => (
            <CombinationSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonGrid;
