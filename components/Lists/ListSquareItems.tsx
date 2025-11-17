import Image from 'next/image';
import { cn } from '@/lib/utils';

type TComponentProps = {
  className?: string;
  classNameItem?: string;
  items: {
    color?: string;
    image?: string;
    image_alt?: string;
    className?: string;
    icon?: React.ReactNode;
  }[];
};

const ListSquareItems = ({
  className,
  classNameItem,
  items,
}: TComponentProps) => {
  return (
    <ul className={cn('ListSquareItems', 'flex gap-2', className)}>
      {items.map((item, index) => (
        <li
          key={`${item?.color ?? item?.image}-${index}`}
          className={cn(
            'h-[25px] w-[25px]',
            'sm:h-[35px] md:w-[35px]',
            'lg:h-[40px] lg:w-[40px]',
            'rounded-[5px] lg:rounded-[9px]',
            'shrink-0 grow-0',
            'relative',
            'overflow-hidden',
            'shadow-lg',
            classNameItem,
          )}
          style={{
            backgroundColor: item.color ?? '#b0aca6',
          }}
        >
          {item.image ? (
            <Image
              className={cn('scale-110', item.className)}
              src={item.image}
              alt={`${item.color ?? item.image_alt}`}
              fill
            />
          ) : null}
          {item.icon ? item.icon : null}
        </li>
      ))}
    </ul>
  );
};

export default ListSquareItems;
