import Image from "next/image";
import Comments from "@/components/Comments";
import { cn } from "@/lib/utils";

type TComponentProps = {
  data: {
    final_room_url: string;
    index?: number;
  };
  className: string;
};

const TabComments = ({ data, className }: TComponentProps) => {
  const final_room_url = data?.final_room_url;
  return (
    <div className={cn("h-full p-[10px]", className)}>
      {/* BG : IMAGE */}
      <Image
        className={cn(
          "Background",
          "h-full w-full",
          "object-cover object-right",
          "scale-x-[-1]"
        )}
        src={final_room_url}
        alt={`styled_product_url`}
        fill
      />
      {/* BG : STAINED GLASS */}
      <div
        className={cn(
          "BackgroundStainedGlass",
          "absolute inset-0",
          "bg-[#a98d6e99]/60 backdrop-blur-[13px]",
          "overflow-hidden",
          "lg:rounded-[16px]"
        )}
      />

      {/* COMMENTS */}
      <Comments
        className={cn("relative", "h-full", "w-full", "p-[0px]")}
        data={data}
      />
    </div>
  );
};

export default TabComments;
