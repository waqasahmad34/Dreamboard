import { motion } from "framer-motion";
import Image from "next/image";
import BoxShadow from "@/components/BoxShadow";
import { IconSofa } from "@/components/icons";
import ListSquareItems from "@/components/Lists/ListSquareItems";
import TitleWithSubtitle from "@/components/Titles/TitleWithSubtitle";
import cn from "@/utils/cn";

type TComponentProps = {
  data: {
    mood_board_url: string;
    product_filename_string: string;
    styled_product_url: string;
    final_room_url: string;
    swatch_url: string;
    productMetadata?: Record<string, any>;
    swatchMetadata?: Record<string, any>;
  };
  className: string;
  containerAnimation: any;
  className3ImageWrapper: string[] | string;
};

const TabMoodboard = ({
  data,
  className,
  containerAnimation,
  className3ImageWrapper,
}: TComponentProps) => {
  console.log("TabMoodboard ->data:", data);

  const mood_board_url = data?.mood_board_url;
  // const product_filename_string = data?.product_filename_string;
  const styled_product_url = data?.styled_product_url;
  const final_room_url = data?.final_room_url;
  const swatch_url = data?.swatch_url;

  const productFamily = data?.productMetadata?.family;
  const productType = data?.productMetadata?.type;
  const swatchFamily = data?.swatchMetadata?.family;
  const swatchChild = data?.swatchMetadata?.child;
  const productUrl = `https://www.dreamsofa.com/products/${productFamily?.toLowerCase()}-${productType?.toLowerCase()}?fabric=${swatchFamily}-${swatchChild}`;

  return (
    <motion.div
      key={"animation-container-moodboard"}
      className={cn(
        "TabMoodboard",
        "relative h-full",
        "relative p-[15px]",
        "h-full w-full",
        // 'bg-gray-100',
        className
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
          "rounded-b-[16px] lg:rounded-[16px]"
        )}
      />

      <div
        className={cn(
          "flex justify-start",
          "items-center",
          "flex-row lg:flex-col",
          "h-full lg:overflow-auto md:overflow-hidden",
          "gap-y-[0px] lg:gap-y-[20px]",
          "gap-x-[20px] lg:gap-x-[0px]"
        )}
      >
        {/* IMAGE 1 : MOODBOARD */}
        <motion.div
          key={"moodboard-image-1"}
          className={cn(
            className3ImageWrapper,
            "relative",
            "w-[calc(50%-10px)] lg:w-full",
            "max-h-[280px]  h-full",
            "min-[600px]:max-h-[400px]",
            "min-h-auto",
            "aspect-[2/3]"
          )}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          // whileHover={{ scale: 1.02 }}
        >
          <Image
            src={mood_board_url}
            alt={`mood_board_url`}
            className={cn("h-full w-full", "object-cover")}
            fill
            // width={1535}
            // height={1024}
          />
        </motion.div>

        {/* IMAGE 2 : PRODUCT*/}
        <motion.a
          key={"moodboard-image-2"}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={cn(
            "relative",
            "grow-1",
            // 'h-[200px]',
            "h-full lg:h-auto",
            "lg:aspect-[3/2]",
            "w-[calc(50%-10px)] lg:w-full",
            className3ImageWrapper,
            "bg-white",
            "group"
          )}
          // href="https://www.dreamsofa.com/product/sofa/bordeaux-cosmo-steel-sofa/"
          href={productUrl}
          // target="_blank"
          rel="noopener noreferrer"
          // whileHover={{ scale: 1.02 }}
        >
          <div
            className={cn(
              "transition-all duration-300",
              "h-full",
              "w-full",
              "flex justify-center",
              "items-center lg:items-end",
              "shadow-lg"
            )}
          >
            <TitleWithSubtitle
              // title={product_filename_string}
              title={data?.productMetadata?.family}
              subTitle={data?.productMetadata?.type}
              className="absolute top-[10px] left-[10px] z-[20] text-[#333333]"
            />
            <div
              className={cn(
                "relative",
                "overflow-hidden",
                "h-[100px]",
                "group-hover:scale-110",
                "transition-all duration-300"
              )}
            >
              <Image
                // className="object-contain object-size"
                className={cn("object-contain", "w-full", "h-full")}
                src={styled_product_url}
                alt={`styled_product_url`}
                // fill
                width={1535}
                height={1024}
              />
              <BoxShadow className="" />
            </div>
            <ListSquareItems
              className={cn(
                "absolute",
                "z-[10]",
                "left-1/2 lg:left-auto",
                "-translate-x-1/2 lg:-translate-x-0",
                "lg:right-[10px]",
                "bottom-[20px] lg:top-[10px] lg:bottom-[0px]"
              )}
              classNameItem=""
              items={[
                {
                  // image: sofa_type_url,
                  // image_alt: 'sofa_type_url',
                  // className:
                  //   '!left-1/2 -translate-x-1/2 !top-1/2 -translate-y-1/2 scale-none !w-[38px] !h-[38px]',
                  icon: (
                    <IconSofa
                      className={cn(
                        "absolute",
                        "-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2",
                        "bg-[#b0aca7] fill-[#6a6464]",
                        "size-[50px] lg:size-[40px]"
                      )}
                    />
                  ),
                },
                { image: swatch_url },
              ]}
            />
          </div>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default TabMoodboard;
