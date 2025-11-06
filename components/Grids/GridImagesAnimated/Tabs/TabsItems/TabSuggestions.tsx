import { motion } from "framer-motion";
import Image from "next/image";
import TitleWithSubtitle from "@/components/Titles/TitleWithSubtitle";
import cn from "@/utils/cn";

type TComponentProps = {
  data: {
    final_room_url: string;
    swatch_filename_string: string;
    swatch_url: string;
  };
  className?: string;
  containerAnimation?: any;
  className3ImageWrapper?: string[] | string;
};

const TabSuggestions = ({
  data,
  className,
  containerAnimation,
  className3ImageWrapper,
}: TComponentProps) => {
  const final_room_url = data?.final_room_url;
  // const swatch_filename_string = data?.swatch_filename_string;
  const swatch_url = data?.swatch_url;

  return (
    <motion.div
      key={"animation-container-suggestions"}
      className={cn(
        "relative",
        "p-[15px]",
        "col-span-1",
        // 'h-[170px]',
        // 'sm:h-full',
        "h-full",
        "bg-gray-100",
        "overflow-hidden"
      )}
      {...containerAnimation}
    >
      {/* BG : IMAGE */}
      <Image
        className={cn(
          "Background",
          "h-full w-full",
          "object-cover object-right",
          "scale-x-[-1]"
        )}
        src={final_room_url}
        alt={`final_room_url`}
        fill
      />
      {/* BG : STAINED GLASS */}
      <div
        className={cn(
          "BackgroundStainedGlass",
          "absolute inset-0",
          "bg-[#a98d6e99]/60 backdrop-blur-[13px]",
          "overflow-hidden",
          "rounded-[16px]"
        )}
      />
      <div
        className={cn(
          "flex flex-col",
          "sm:grid",
          "sm:grid-cols-3 sm:grid-rows-1",
          "lg:grid-cols-1 lg:grid-rows-3",
          "gap-[15px]",
          "overflow-hidden",
          "overflow-y-auto",
          "h-full",
          "relative",
          "p-[5px] lg:p-[0px]"
          // 'max-h-[170px] lg:max-h-none',
        )}
      >
        {/* IMAGE 1 : SWATCH */}
        <motion.div
          key={`image-1-suggestions`}
          className={cn(
            className3ImageWrapper,
            "items-end",
            "bg-white",
            "p-[20px]",
            "h-[150px] shrink-0 lg:h-auto"
          )}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          // whileHover={{ scale: 1.02 }}
        >
          <TitleWithSubtitle
            title={"!!XX_"}
            // title={ swatch_filename_string}
            subTitle="!!XX_"
            className="absolute top-[10px] left-[10px] z-[10] text-black"
          />
          <Image
            src={swatch_url}
            alt={`styled_product_url`}
            className={cn("object-contain", "max-h-[80%]")}
            width={150}
            height={150}
          />
          {/* <ListSquareItems
							className="absolute right-[10px] bottom-[10px]"
							items={[
								{ image: swatch_static_url },
								{ image: swatch_static_url },
								{ color: colorPalleteFirstItem },
							]}
						/> */}
        </motion.div>

        {/* IMAGE 2 : PRODUCT */}
        <motion.div
          key={`image-2-suggestions`}
          className={cn(
            className3ImageWrapper,
            "items-end",
            "bg-white",
            "p-[20px]",
            "h-[150px] shrink-0 lg:h-auto"
          )}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          // whileHover={{ scale: 1.02 }}
        >
          <TitleWithSubtitle
            title={"!!XX_"}
            // title={ swatch_filename_string}
            subTitle="!!XX_"
            className="absolute top-[10px] left-[10px] z-[10] text-black"
          />
          <Image
            src={swatch_url}
            alt={`styled_product_url`}
            className={cn("object-contain", "max-h-[80%]")}
            // fill
            width={150}
            height={150}
          />
          {/* <ListSquareItems
							className="absolute right-[10px] bottom-[10px]"
							items={[
								{ image: swatch_static_url },
								{ image: swatch_static_url },
								{ color: colorPalleteFirstItem },
							]}
						/> */}
        </motion.div>

        {/* IMAGE 3 : STYLE */}
        <motion.div
          key={`image-3-suggestions`}
          className={cn(
            className3ImageWrapper,
            "items-end",
            "bg-white",
            "p-[20px]",
            "h-[150px] shrink-0 lg:h-auto"
          )}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          // whileHover={{ scale: 1.02 }}
        >
          <TitleWithSubtitle
            title={"!!XX_"}
            // title={ swatch_filename_string}
            subTitle="!!XX_"
            className="absolute top-[10px] left-[10px] z-[10] text-black"
          />
          <Image
            src={swatch_url}
            alt={`styled_product_url`}
            className={cn("object-contain", "max-h-[80%]")}
            // fill
            width={150}
            height={150}
          />
          {/* <ListSquareItems
							className="absolute right-[10px] bottom-[10px]"
							items={[
								{ image: swatch_static_url },
								{ image: swatch_static_url },
								{ color: colorPalleteFirstItem },
							]}
						/> */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TabSuggestions;
