import { FaCat, FaDog, FaPaw, FaWineGlassAlt } from 'react-icons/fa';
import { IoIosMan } from 'react-icons/io';
import { LuGauge } from 'react-icons/lu';
import { TbWorld } from 'react-icons/tb';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import cn from '@/utils/cn';

type TComponentProps = {
  className?: string;
  items?: {
    id: number;
    icon: React.ReactNode;
    description: string | React.ReactNode;
  }[];
};

const ListSwatchFeatures = ({ className, items = [] }: TComponentProps) => {
  const itemsDefault = [
    {
      id: 0,
      icon: <FaWineGlassAlt className="text-[#555555]" />,
      description: (
        <>
          <span className="font-bold">Cleanable</span>
          <span>
            High performance fabrics resistant to stains and liquids. Easily
            cleanable
          </span>
        </>
      ),
    },
    {
      id: 1,
      icon: <LuGauge className="text-[#555555]" />,
      description: (
        <>
          <span className="font-bold">High Performance</span>
          <span>
            Stain-resistant, easy to clean, and built for heavy traffic and
            durability
          </span>
        </>
      ),
    },
    {
      id: 2,
      icon: <TbWorld className="text-[#555555]" />,
      description: (
        <>
          <span className="font-bold">Oeko-Tex Certified</span>
          <span>
            High resiliency fabrics tested to be free of any harmful chemicals
          </span>
        </>
      ),
    },
    {
      id: 3,
      icon: <IoIosMan className="text-[#555555]" />,
      description: (
        <>
          <span className="font-bold">Kid-Friendly</span>
          <span>
            Made with Safe Materials, easy to clean, and extra durable
          </span>
        </>
      ),
    },
    {
      id: 4,
      icon: <FaCat className="text-[#555555]" />, //FaPaw
      description: (
        <>
          <span className="font-bold">Cat-Friendly</span>
          <span>
            Durable and tightly woven, perfect to stand up to sharp claws. Easy
            to clean fine fur.
          </span>
        </>
      ),
    },
    {
      id: 5,
      icon: <FaDog className="text-[#555555]" />,
      description: (
        <>
          <span className="font-bold">Dog-Friendly</span>
          <span>
            Durable and tightly woven, perfect to stand up to resist snagging
            and stretching. Easy to clean from shedding.
          </span>
        </>
      ),
    },
  ];
  return (
    <ul
      className={cn('ListSwatchFeatures', 'flex items-center gap-2', className)}
    >
      {itemsDefault.map((item) => (
        <li key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help">{item.icon}</span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="p-[10px]">
              <div className="flex flex-col items-center justify-center gap-[5px]">
                {item.description}
              </div>
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default ListSwatchFeatures;
