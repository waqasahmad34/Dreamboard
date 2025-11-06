import Image from 'next/image';
import ListColorsAndSwatches from '@/components/Lists/ListColorsAndSwatches';
import ListSwatchFeatures from '@/components/Lists/ListSwatchFeatures';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import fabrics from '@/constants/fabrics.json';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import cn from '@/utils/cn';
import { fixEncoding } from '@/utils/fixEncoding';
import ImageMissing from '../ImageMissing';

interface IFabric {
  name: string;
  rubc: number;
  rubm: number;
  clean: string;
  pf: number;
  ff: number;
  luxe: boolean;
  perf: boolean;
  tier: number;
  s_desc: string;
  desc: string;
  f_type?: string;
  comp?: string;
  st_lq_res?: boolean;
  oeko?: boolean;
}

type DetailsSwatchProps = {
  className?: string;
  data: any;
  swatchFamily?: string;
};

const DetailsSwatch = ({
  className,
  data,
  swatchFamily,
}: DetailsSwatchProps) => {
  // console.log('DetailsSwatch -> data:', data, swatchFamily);
  // console.log('DetailsSwatch -> data:', data);
  // const swatch_family = data.original_metadata_swatch?.metadata?.family;
  // const swatch_filename = data.original_metadata_swatch?.metadata?.filename;
  // const swatch_child = data.original_metadata_swatch?.metadata?.child;

  const swatch_family = swatchFamily;

  const fabricObjectDefault: IFabric = {
    f_type: 'Multi-color, chenille, tweed',
    comp: '100% Polyester',
    rubc: 100000,
    rubm: 5,
    clean: 'W',
    pf: 3,
    ff: 3,
    luxe: false,
    perf: true,
    st_lq_res: true,
    oeko: false,
    desc: 'Atlas is a thickly woven yarn dyed chenille-like fabric offered in a variety of rich multi-colored tweeds. The texturing and natural variation of color in this textile adds durability.',
    s_desc: 'Thick contrasting plushness',
    tier: 4,
    name: 'Atlas PLZ Silver',
  };

  // Find the current fabric by matching the family name
  let currentFabric = (Object.values(fabrics) as IFabric[]).find(
    (fabric) => fabric.name.toLowerCase() === swatch_family?.toLowerCase(),
  );
  if (currentFabric && swatch_family) {
    // Capitalize each word in the fabric name
    currentFabric = {
      ...currentFabric,
      name: swatch_family
        .split(' ')
        .map((word: string) => capitalizeFirstLetter(word))
        .join(' '),
    };
  }

  const currentFabricObject: IFabric = currentFabric
    ? currentFabric
    : fabricObjectDefault;

  // console.log('DetailsSwatch -> currentFabric:', currentFabric);

  return (
    <div
      className={cn(
        'DetailsSwatch',
        'flex flex-col items-center justify-start',
        className,
      )}
    >
      {/* IMAGE */}
      {data.swatch_url ? (
        <Image
          className="mb-[10px]"
          src={data.swatch_url}
          alt={data.swatch_filename_string}
          width={200}
          height={200}
        />
      ) : (
        <ImageMissing
          className="mb-[10px]"
          title={`Swatch missing: data.swatch_url`}
        />
      )}
      {/* CONTENT */}
      <div className="flex flex-col items-center justify-start">
        <h4 className="mb-[10px] break-words font-normal text-[#666677] text-[15px] uppercase leading-[1.3em] selection:bg-[#F97352] selection:text-white">
          {fixEncoding(currentFabricObject.s_desc)}
        </h4>
        <h3 className="mb-[10px] break-words font-semibold text-[#333333] text-[21px] uppercase leading-none tracking-widest selection:bg-[#F97352] selection:text-white">
          {fixEncoding(currentFabricObject.name)}
        </h3>
        <p className="mb-5 break-words p-0 text-left align-baseline font-light text-black text-lg normal-case leading-[1.4] selection:bg-[#F97352] selection:text-white">
          {fixEncoding(currentFabricObject.desc)}
        </p>

        <Separator className="my-[10px]" />
        <ListSwatchFeatures />
        <Separator className="my-[10px] mb-[20px]" />

        <div className="flex flex-col items-center justify-between">
          <span className="mb-[10px] font-semibold text-[#666677] text-[15px] uppercase leading-[1.3em]">
            Also available in
          </span>
          <ListColorsAndSwatches
            className="mb-[20px]"
            items={[
              { color: '#17100b' },
              { color: '#2f4540' },
              { color: '#c9c2b7' },
            ]}
          />
        </div>

        <ul className="list-inside list-disc">
          {currentFabricObject.comp && (
            <li className="text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
              <span className="text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
                Composition:
              </span>{' '}
              <span className="text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
                {currentFabricObject.comp}
              </span>
            </li>
          )}
          {currentFabricObject.f_type && (
            <li className="text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
              <span className="custom-styles-1 m-0 p-0 text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
                Fabric Type:
              </span>{' '}
              <span className="custom-styles-1 m-0 p-0 text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
                {currentFabricObject.f_type}
              </span>
            </li>
          )}
          <li className="text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
            <span className="custom-styles-1 m-0 p-0 text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
              Rub count:
            </span>{' '}
            <span className="custom-styles-1 m-0 p-0 text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
              {currentFabricObject.rubc}
            </span>
          </li>
          <li className="text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
            {/* <span className="custom-styles-2 m-0 cursor-help p-0 text-left align-baseline font-light text-[#333333] text-[100%] normal-case leading-normal selection:bg-[#F97352] selection:text-white">
              Care instructions
            </span> */}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help underline">Care instructions</span>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className={cn(
                  'p-[20px]',
                  'max-w-[400px]',
                  'flex flex-col gap-[5px]',
                  'items-center justify-start',
                )}
              >
                <h2 className="mb-[20px] font-semibold text-2xl">
                  🧺 Fabric Care Instructions
                </h2>

                <div className="flex flex-col justify-start">
                  <h3 className="mb-3 font-medium text-xl">Regular Cleaning</h3>
                  <ul className="list-inside list-disc space-y-2">
                    <li>
                      Vacuum gently using a soft brush attachment to remove dust
                      and debris.
                    </li>
                    <li>
                      For spot cleaning, use a damp cloth and mild detergent —
                      avoid rubbing to prevent damaging the weave.
                    </li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailsSwatch;
