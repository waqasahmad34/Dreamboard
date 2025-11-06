import cn from '@/utils/cn';

type TileProps = {
  className?: string;
  children: React.ReactNode;
};

const Tile = ({ className, children }: TileProps) => {
  return (
    <div
      className={cn(
        'Tile',
        'TileSwatchDetails',
        'relative',
        'flex flex-col items-center justify-start',
        'p-[30px]',
        'bg-white',
        'shadow-xl',
        'rounded-[16px]',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Tile;
