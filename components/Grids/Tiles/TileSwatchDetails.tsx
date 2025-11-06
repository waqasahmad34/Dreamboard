import Image from 'next/image';
import DetailsSwatch from '@/components/Details/DetailsSwatch';
import Tile from '@/components/Grids/Tiles/Tile';
import ListColorsAndSwatches from '@/components/Lists/ListColorsAndSwatches';
import ListSwatchFeatures from '@/components/Lists/ListSwatchFeatures';
import { Separator } from '@/components/ui/separator';
import cn from '@/utils/cn';

type TileSwatchDetailsProps = {
  data: any;
  className?: string;
};

const TileSwatchDetails = ({ data, className }: TileSwatchDetailsProps) => {
  // console.log('data', data);
  return (
    <Tile className={cn(className)}>
      <DetailsSwatch data={data} />
    </Tile>
  );
};

export default TileSwatchDetails;
