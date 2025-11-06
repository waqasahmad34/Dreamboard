import Image from 'next/image';
import useDisplay from '@/hooks/useDisplay';
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

const Grid2 = ({ data }: TComponentProps) => {
  // console.log(data);
  const _room_style_string = data?.room_style_string;
  const _swatch_url = data?.swatch_url;
  const _swatch_filename_string = data?.swatch_filename_string;
  const final_room_url = data?.final_room_url;
  const styled_product_url = data?.styled_product_url;
  const _product_filename_string = data?.product_filename_string;
  const _portrait = data?.portrait;
  const _colorPalette = data?.colorPalette;
  // const colorPalleteFirstItem = data?.colorPalleteFirstItem;
  const mood_board_url = data?.mood_board_url;
  // const sofa_type_url = data?.sofa_type;

  // Use display hook to determine screen size
  const { isDesktop } = useDisplay();

  // Total height = (20vw * (1536/1024)) + (20vw * (1024/1536)) + 20px gap
  const gridItemWidth = '20vw';
  const element2Height: string = `calc(${gridItemWidth} * 1.5 + ${gridItemWidth} * 0.667 + 20px)`;

  // Apply calculated height only on desktop
  const desktopHeightStyle = isDesktop ? { height: element2Height } : {};

  const calculateImageWidths = () => {
    if (isDesktop) {
      return { width1: 'auto', width2: 'auto' }; // Desktop uses natural sizing
    }

    const totalWidth = '100%'; // Element2 width on mobile (full width)
    const aspectRatio1 = 1024 / 1536; // 0.667
    const aspectRatio2 = 1536 / 1024; // 1.5

    // Calculate widths for equal heights on mobile
    const width1 = `calc((${totalWidth} - 20px) * ${aspectRatio1} / ${aspectRatio1 + aspectRatio2})`;
    const width2 = `calc((${totalWidth} - 20px) * ${aspectRatio2} / ${aspectRatio1 + aspectRatio2})`;

    return { width1, width2 };
  };

  const { width1, width2 } = calculateImageWidths();

  return (
    <div
      className={cn(
        'Grid2',
        'bg-white/10 backdrop-blur-[16px]',
        'p-[20px]',
        'overflow-hidden',
        'rounded-[16px]',
        'flex flex-col items-start lg:flex-row',
        'gap-[20px]',
        // '2xl:max-w-[1500px]',
      )}
    >
      <div
        className={cn(
          'Element1 flex aspect-[1.5] overflow-hidden rounded-[16px] bg-red-100',
        )}
        style={desktopHeightStyle}
      >
        <Image
          src={final_room_url}
          alt={`final_room_url`}
          width={1536}
          height={1024}
        />
      </div>

      <div
        className={cn(
          'Element2',
          'flex flex-row items-start lg:flex-col',
          'gap-[20px]',
          'relative',
          'w-full lg:w-[20vw]',
          'overflow-hidden',
        )}
        style={desktopHeightStyle}
      >
        <Image
          className={cn(
            'object-contain',
            'rounded-[16px]',
            // 'invisible'
          )}
          style={{ width: width1 }}
          src={mood_board_url}
          alt={`mood_board_url`}
          width={1024}
          height={1536}
          // fill
        />
        {/* <div className="flex aspect-[1024/1536] w-full bg-red-100"></div> */}

        <Image
          className={cn(
            'object-contain',
            'rounded-[16px]',
            // 'invisible'
          )}
          style={{ width: width2 }}
          src={styled_product_url}
          alt={`styled_product_url`}
          width={1536}
          height={1024}
        />
        {/* <div className="flex aspect-[1536/1024] w-full bg-red-100"></div> */}
        {/* <div
          className={cn(
            'bg-red-100',
            'absolute z-[100]',
            'h-full w-full',
            'flex flex-col',
            'gap-[20px]',
            'overflow-y-auto',
          )}
        >
          <Image
            className={cn(
              'object-contain',
              // 'invisible'
            )}
            src={styled_product_url}
            alt={`styled_product_url`}
            width={1536}
            height={1024}
          />
          <Image
            className={cn(
              'object-contain',
              // 'invisible'
            )}
            src={styled_product_url}
            alt={`styled_product_url`}
            width={1536}
            height={1024}
          />
          <Image
            className={cn(
              'object-contain',
              // 'invisible'
            )}
            src={styled_product_url}
            alt={`styled_product_url`}
            width={1536}
            height={1024}
          />
          <Image
            className={cn(
              'object-contain',
              // 'invisible'
            )}
            src={styled_product_url}
            alt={`styled_product_url`}
            width={1536}
            height={1024}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Grid2;
