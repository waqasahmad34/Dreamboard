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
  };
};

import Image from 'next/image';
import ListColorsAndSwatches from '@/components/Lists/ListColorsAndSwatches';
import ListShareSocial2 from '@/components/Lists/ListShareSocial2';
import ListColorsSquare from '@/components/Lists/ListSquareItems';
import TitleGridItem from '@/components/Titles/TitleGridItem';
import TitleWithSubtitle from '@/components/Titles/TitleWithSubtitle';
import cn from '@/utils/cn';

const GridImages1_3 = ({ data }: TComponentProps) => {
  // console.log(data);
  const room_style_string = data?.room_style_string;
  const swatch_url = data?.swatch_url;
  const swatch_filename_string = data?.swatch_filename_string;
  const final_room_url = data?.final_room_url;
  const styled_product_url = data?.styled_product_url;
  const product_filename_string = data?.product_filename_string;
  const portrait = data?.portrait;
  const colorPalette = data?.colorPalette;
  const colorPalleteFirstItem = data?.colorPalleteFirstItem;

  const className3ImageWrapper =
    'relative flex shrink items-center justify-center rounded-[1px] overflow-hidden';

  const swatch_static_url =
    'https://d3m7r2hywaso4h.cloudfront.net/temp_assets/need_static_1.jpg';

  return (
    <div
      className={cn(
        'GridImages1_3',
        'grid grid-cols-1 lg:grid-cols-4',
        'overflow-hidden',
        'rounded-[16px]',
      )}
    >
      {/* MAIN IMAGE */}
      <div
        className={cn(
          'col-span-3',
          'bg-gray-100 lg:max-h-full',
          // 'max-h-[250px]'
        )}
      >
        <div className="relative">
          <Image
            src={final_room_url}
            alt={`final_room_url`}
            className={cn('aspect-[3/2] w-full object-cover')}
            width={1535}
            height={1024}
          />
          <ListShareSocial2
            className="-translate-x-1/2 absolute bottom-[20px] left-1/2"
            url={final_room_url}
            media={final_room_url}
          />
        </div>
      </div>

      {/* 3 IMAGES */}
      <div
        className="relative col-span-1 bg-gray-100 p-[15px]"
        style={{
          backgroundImage: `url(${final_room_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-[#a98d6e99]/60 backdrop-blur-[13px]" />
        <div
          className={cn(
            // 'flex flex-col justify-around gap-[15px]'
            'grid grid-cols-3 grid-rows-1 gap-[15px] lg:grid-cols-1 lg:grid-rows-3',
          )}
        >
          <div className={cn(className3ImageWrapper)}>
            <TitleWithSubtitle
              title={swatch_filename_string ?? 'Xxxxxx'}
              subTitle="Xxxxx"
              className="absolute top-[10px] left-[10px] z-[10] text-white"
            />
            <Image
              src={swatch_url}
              alt={`styled_product_url`}
              className={cn('h-full w-full', 'object-cover', 'scale-110')}
              fill
            />
            <ListColorsSquare
              className="absolute right-[10px] bottom-[10px]"
              items={[
                { image: swatch_static_url },
                { image: swatch_static_url },
                { color: colorPalleteFirstItem },
              ]}
            />
          </div>
          <div className={cn(className3ImageWrapper)}>
            <TitleWithSubtitle
              title={product_filename_string}
              subTitle="Xxxxx"
              className="absolute top-[10px] left-[10px] text-white"
            />
            <Image
              src={styled_product_url}
              alt={`styled_product_url`}
              width={1535}
              height={1024}
            />
          </div>
          <div className={cn(className3ImageWrapper)}>
            <Image
              src={portrait}
              alt={`styled_product_url`}
              className="object-cover object-bottom"
              fill
            />
            <TitleGridItem
              title={room_style_string}
              subTitle="Style"
              color="#ffffff"
              classNameTitle="text-[47px]"
              classNameSubtitle="text-[13px]"
            />
            <ListColorsAndSwatches
              className="absolute right-[10px] bottom-[10px]"
              items={colorPalette?.map((color) => ({ color }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridImages1_3;
