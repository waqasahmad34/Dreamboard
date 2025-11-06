import ListColorsAndSwatches from '@/components/Lists/ListColorsAndSwatches';
import cn from '@/utils/cn';

type TileRoomStyleAndTextProps = {
  className?: string;
  colorPalleteFirstItem?: string;
  colorPalleteLast3?: string[];
  room_style?: string;
};

const TileRoomStyleAndText = ({
  className,
  colorPalleteFirstItem,
  colorPalleteLast3 = [],
  room_style = 'Modern',
}: TileRoomStyleAndTextProps) => {
  return (
    <div
      className={cn(
        'TileRoomStyleAndText',
        'relative w-full',
        'flex flex-col items-center justify-center',
        'px-[40px] py-[10px] pb-[60px]',
        'overflow-hidden',
        'rounded-[16px]',
        className,
        !colorPalleteFirstItem ? 'text-black' : 'text-gray-300',
      )}
      style={{ backgroundColor: colorPalleteFirstItem || '#ffffff' }}
    >
      <h3
        className={cn(
          'mb-[20px] font-es-wf text-[50px] leading-none lg:mb-[50px] lg:text-[70px]',
          '',
        )}
      >
        {room_style}
      </h3>
      <p className={cn('text-[15px] lg:text-[17px]', '')}>
        Sink into the embrace of the Indigo Haven Sofa — where comforting
        textures meet artisan-inspired design. Its deep indigo weave and plush
        cushions are paired with sun-warmed terracottas, honeyed gold, and
        desert rose tones, bringing soulful relaxation to your living space.
        Perfect for slow coffee mornings, laughter-filled evenings, and those
        magical golden hour moments surrounded by beauty. Transform your home
        into a sanctuary that feels uniquely yours. Explore the full vibe and
        let your space tell its story.
      </p>
      <ListColorsAndSwatches
        className="-translate-x-1/2 absolute bottom-[20px] left-1/2"
        items={colorPalleteLast3.map((color) => ({ color }))}
      />
    </div>
  );
};

export default TileRoomStyleAndText;
