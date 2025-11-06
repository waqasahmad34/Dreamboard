import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TComponentProps = {
  className?: string;
  swatches: { id: string; url: string; combination_id?: string | number }[];
};

const ListSwatches = ({ swatches, className }: TComponentProps) => {
  return (
    <ul
      className={cn(
        "ListSwatches",
        "flex items-center justify-start",
        "gap-[30px]",
        className
      )}
    >
      {swatches?.map((swatch, index) => (
        <li
          key={swatch.id}
          className={cn(
            "rounded-[16px] bg-[#ece4dd]",
            "p-[10px]",
            "flex flex-col items-center justify-center",
            "shrink-0",
            // 'shadow-2xl',
            "shadow-[-6px_9px_17px_7px_rgba(0,0,0,0.4)]",
            "group"
          )}
        >
          <Link
            className="flex items-center justify-center"
            href={`#combination-${swatch.combination_id}`}
          >
            <Image
              src={swatch.url}
              alt="swatch"
              width={200}
              height={200}
              className={cn(
                "mb-[10px]",
                "aspect-square",
                "max-w-full",
                "shrink-1 grow-0",
                "object-contain",
                "h-[100px] w-[100px] lg:h-[200px] lg:w-[200px]"
                // 'transition-all duration-300 ease-in-out',
                // 'group-hover:scale-105',
              )}
            />
            <span className="block w-full text-center text-[#a7a19a] text-[15px]">
              Atlas<span className="mx-[5px]">|</span>Ocean
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ListSwatches;
