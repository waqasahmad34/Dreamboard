import Image from 'next/image';
import cn from '@/utils/cn';

type TComponentProps = {
  data: {
    room_style_string: string;
    swatch_url: string;
    swatch_filename_string: string;
    final_room_url: string;
    styled_product_url: string;
    portrait: string;
    product_filename_string: string;
    colorPalette?: string[];
    colorPalleteFirstItem?: string;
    mood_board_url: string;
    sofa_type: string;
  };
};

const Grid1 = ({ data }: TComponentProps) => {
  // console.log(data);
  const room_style_string = data?.room_style_string;
  const swatch_url = data?.swatch_url;
  const swatch_filename_string = data?.swatch_filename_string;
  const final_room_url = data?.final_room_url;
  const styled_product_url = data?.styled_product_url;
  const product_filename_string = data?.product_filename_string;
  const portrait = data?.portrait;
  const colorPalette = data?.colorPalette;
  // const colorPalleteFirstItem = data?.colorPalleteFirstItem;
  const mood_board_url = data?.mood_board_url;
  // const sofa_type_url = data?.sofa_type;

  return (
    <div
      className={cn(
        'Grid1',
        'flex flex-row justify-start',
        'bg-white/10 backdrop-blur-[16px]',
        'gap-[20px]',
        'w-[1000px]',
        'aspect-[1130/600]',
        'p-[20px]',
        'max-w-[90vw]',
        'overflow-hidden',
        // 'w-[1000px]',
      )}
    >
      {/* <div className="relative aspect-[1.5] h-full"></div> */}
      <Image
        src={final_room_url}
        alt={`final_room_url`}
        className={cn('object-contain', 'aspect-[1536/1024]')}
        width={1536}
        height={1024}
        // fill
      />

      <div
        className={cn(
          'flex flex-col items-start gap-[20px]',
          // 'h-[600px]',
          // 'w-[300px]',
          'shrink-0',
          'grow-1',
          'aspect-[300/672]',
          'overflow-y-auto',
          'max-h-full',
          // 'aspect-[0.66]',
          // 'py-[20px]',
          // 'pr-[20px]',
        )}
      >
        <Image
          className={cn('object-contain')}
          src={mood_board_url}
          alt={`mood_board_url`}
          width={1024}
          height={1536}
          // fill
        />

        <Image
          className={cn('object-contain')}
          src={styled_product_url}
          alt={`styled_product_url`}
          width={1536}
          height={1024}
          // fill
        />
        {/* <Image
          className={cn('object-contain')}
          src={styled_product_url}
          alt={`styled_product_url`}
          width={1536}
          height={1024}
        /> */}
      </div>
    </div>
  );
};

export default Grid1;
