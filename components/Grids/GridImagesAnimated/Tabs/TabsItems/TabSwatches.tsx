import { motion } from "framer-motion";
import Image from "next/image";
import BoxShadow from "@/components/BoxShadow";
import DetailsSwatch from "@/components/Details/DetailsSwatch";
import ListColorsAndSwatches from "@/components/Lists/ListColorsAndSwatches";
import TitleGridItem from "@/components/Titles/TitleGridItem";
import TitleWithSubtitle from "@/components/Titles/TitleWithSubtitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
    productMetadata?: Record<string, any>;
    swatchMetadata?: Record<string, any>;
  };
  className: string;
  containerAnimation: any;
  className3ImageWrapper: string[] | string;
};

const TabSwatches = ({
  className,
  data,
  containerAnimation,
  className3ImageWrapper,
}: TComponentProps) => {
  console.log("TabSwatches -> data:", data);
  const room_style_string = data?.room_style_string;
  const swatch_url = data?.swatch_url;
  // const swatch_filename_string = data?.swatch_filename_string;
  const final_room_url = data?.final_room_url;
  const styled_product_url = data?.styled_product_url;
  // const product_filename_string = data?.product_filename_string;
  const portrait = data?.portrait;
  // const colorPalette = data?.colorPalette;
  // const colorPalleteFirstItem = data?.colorPalleteFirstItem;
  // const mood_board_url = data?.mood_board_url;
  // const sofa_type = data?.sofa_type;

  const productFamily = data?.productMetadata?.family;
  const productType = data?.productMetadata?.type;
  const swatchFamily = data?.swatchMetadata?.family;
  const swatchChild = data?.swatchMetadata?.child;
  const productUrl = `https://www.dreamsofa.com/products/${productFamily?.toLowerCase()}-${productType?.toLowerCase()}?fabric=${swatchFamily}-${swatchChild}`;

  return (
    <motion.div
      key={"animation-container-swatches"}
      className={cn(
        "relative",
        "col-span-1 bg-gray-100 p-[15px]",
        "rounded-[16px]",
        "h-[200px] md:h-full",
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
          // 'overflow-hidden',
          "rounded-[16px]"
        )}
      />

      {/* TABS CONTROLS : STYLE, FABRIC*/}

      <Tabs
        defaultValue="style"
        className={cn(
          "relative",
          "h-full",
          "overflow-y-auto",
          "overflow-x-hidden"
          // 'pr-[10px]',
        )}
      >
        <TabsList className="flex w-full justify-center bg-transparent">
          <TabsTrigger
            value="style"
            className={cn(
              "group cursor-pointer",
              "!shadow-none",
              "rounded-none",
              "border-transparent border-t-0 border-r-0 border-b-2 border-l-0",
              "data-[state=active]:bg-transparent data-[state=active]:text-white"
              // 'data-[state=active]:border-white',
            )}
          >
            <span
              className={cn(
                "text-white uppercase",
                "underline-offset-[8px]",
                "group-data-[state=active]:underline"
              )}
            >
              Style
            </span>
          </TabsTrigger>
          <span className="text-white">|</span>
          <TabsTrigger
            value="fabric"
            className={cn(
              "group cursor-pointer",
              "!shadow-none",
              "rounded-none",
              "border-transparent border-t-0 border-r-0 border-b-2 border-l-0",
              "data-[state=active]:bg-transparent data-[state=active]:text-white"
              // 'data-[state=active]:border-white',
            )}
          >
            <span
              className={cn(
                "text-white uppercase",
                "underline-offset-[8px]",
                "group-data-[state=active]:underline"
              )}
            >
              Fabric
            </span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1 */}
        <TabsContent
          value="style"
          className={cn(
            "TabContent Tab1",
            "flex flex-col",
            "sm:grid",
            "sm:grid-cols-3 sm:grid-rows-1",
            "lg:grid-cols-1 lg:grid-rows-3",
            "p-[5px] lg:p-[0px]",
            "gap-[15px]",
            "overflow-hidden",
            "overflow-y-auto",
            "h-full"
            // 'max-h-[170px] lg:max-h-none',
          )}
        >
          {/* IMAGE 1 : SWATCH */}
          <motion.div
            key={`image-1-swatches`}
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
              title={data?.swatchMetadata?.family}
              subTitle={data?.swatchMetadata?.child}
              // title={swatch_filename_string}
              className="absolute top-[10px] left-[10px] z-[10] text-black"
            />
            <Image
              src={swatch_url}
              alt={`styled_product_url`}
              className={cn("object-contain", "max-h-[80%]")}
              width={150}
              height={150}
            />
          </motion.div>
          {/* <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <motion.div
                key={`image-1-swatches`}
                className={cn(
                  className3ImageWrapper,
                  'items-end',
                  'bg-white',
                  'p-[20px]',
                  'h-[150px] shrink-0 lg:h-auto',
                )}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                // whileHover={{ scale: 1.02 }}
              >
                <TitleWithSubtitle
                  title={swatch_filename_string ?? 'Xxxxxx'}
                  subTitle="Xxxxx"
                  className="absolute top-[10px] left-[10px] z-[10] text-black"
                />
                <Image
                  src={swatch_url}
                  alt={`styled_product_url`}
                  className={cn('object-contain', 'max-h-[80%]')}
                  width={150}
                  height={150}
                />
              </motion.div>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className={cn(
                'max-w-[300px]',
                'bg-white text-black',
                'px-[20px] py-[30px]',
                'rounded-[16px]',
                'hidden lg:block',
								'z-[100]',
              )}
              arrowClassName="bg-white fill-white"
            >
              <DetailsSwatch data={data} />
            </TooltipContent>
          </Tooltip> */}

          {/* IMAGE 2 : PRODUCT */}
          <motion.div
            key={`image-2-swatches`}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            // whileHover={{ scale: 1.02 }}
            className="h-[150px] shrink-0 lg:h-auto"
          >
            <a
              // href="https://www.dreamsofa.com/product/sofa/bordeaux-cosmo-steel-sofa/"
              href={productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                className3ImageWrapper,
                "flex-col",
                "bg-white",
                "transition-all duration-300",
                "group",
                "shadow-lg",
                "h-full w-full"
              )}
            >
              <TitleWithSubtitle
                title={data?.productMetadata?.family}
                subTitle={data?.productMetadata?.type}
                // title={product_filename_string}
                className="absolute top-[10px] left-[10px] z-[20] text-[#333333]"
              />
              <div
                className={cn(
                  "relative",
                  "h-[100px]",
                  "top-[10px]",
                  "overflow-hidden",
                  "transition-all duration-300",
                  "group-hover:scale-110"
                )}
              >
                <Image
                  className={cn("object-contain", "h-full", "w-full")}
                  src={styled_product_url}
                  alt={`styled_product_url`}
                  // fill
                  width={1535}
                  height={1024}
                />
                <BoxShadow className="" />
              </div>
            </a>
          </motion.div>

          {/* IMAGE 3 : STYLE */}
          <motion.div
            key={`image-3-swatches`}
            className={cn(
              className3ImageWrapper,
              "h-[150px] shrink-0 lg:h-auto"
            )}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            // whileHover={{ scale: 1.02 }}
          >
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
              className="z-[10]"
              classNameTitle="text-[47px]"
              classNameSubtitle="text-[13px]"
            />
            {/* <ListColorsAndSwatches
              className="absolute right-[10px] bottom-[10px]"
              items={colorPalette?.map((color) => ({ color }))}
            /> */}
          </motion.div>
        </TabsContent>

        {/* TAB 2 */}
        <TabsContent value="fabric">
          <div
            className={cn(
              "TabContent Tab2",
              "flex flex-col",
              "sm:grid",
              "sm:grid-cols-3 sm:grid-rows-1",
              "lg:grid-cols-1 lg:grid-rows-3",
              "gap-[15px]",
              "overflow-x-hidden",
              "overflow-y-auto",
              "p-[5px] lg:p-[0px]",
              "h-full"
              // 'max-h-[170px] lg:max-h-none',
            )}
          >
            {/* IMAGE 1 : SWATCH */}
            <motion.div
              key={`image-1-swatches`}
              className={cn(
                className3ImageWrapper,
                "h-[150px] shrink-0 lg:h-auto"
              )}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              // whileHover={{ scale: 1.02 }}
            >
              <TitleWithSubtitle
                title={data?.swatchMetadata?.family}
                subTitle={data?.swatchMetadata?.child}
                // title={swatch_filename_string}
                className="absolute top-[10px] left-[10px] z-[10] text-white"
              />
              <Image
                src={swatch_url}
                alt={`styled_product_url`}
                className={cn("h-full w-full", "object-cover", "scale-110")}
                fill
                // width={150}
                // height={150}
              />
            </motion.div>

            {/* <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <motion.div
                  key={`image-1-swatches`}
                  className={cn(
                    className3ImageWrapper,
                    'h-[150px] shrink-0 lg:h-auto',
                  )}
                  initial={{ opacity: 0, x: 100, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  // whileHover={{ scale: 1.02 }}
                >
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
                    // width={150}
                    // height={150}
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className={cn(
                  'max-w-[300px]',
                  'bg-white text-black',
                  'px-[20px] py-[30px]',
                  'rounded-[16px]',
                  'hidden lg:block',
                )}
                arrowClassName="bg-white fill-white"
              >
                <DetailsSwatch data={data} />
              </TooltipContent>
            </Tooltip> */}

            {/* IMAGE 2 : PRODUCT */}
            <motion.div
              key={`image-2-swatches`}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-[150px] shrink-0 lg:h-auto"
              // whileHover={{ scale: 1.02 }}
            >
              <a
                // href="https://www.dreamsofa.com/product/sofa/bordeaux-cosmo-steel-sofa/"
                href={productUrl}
                // target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  className3ImageWrapper,
                  "flex-col",
                  "bg-white",
                  "transition-all duration-300",
                  "group",
                  "shadow-lg",
                  "h-full w-full"
                )}
              >
                <TitleWithSubtitle
                  title={data?.productMetadata?.family}
                  subTitle={data?.productMetadata?.type}
                  // title={product_filename_string}
                  className="absolute top-[10px] left-[10px] z-[20] text-[#333333]"
                />
                <div
                  className={cn(
                    "relative",
                    "h-[110px]",
                    "top-[10px]",
                    "overflow-hidden",
                    "transition-all duration-300",
                    "group-hover:scale-110"
                    // 'scale-110',
                  )}
                >
                  <Image
                    className={cn("object-contain", "h-full w-full")}
                    src={styled_product_url}
                    alt={`styled_product_url`}
                    // fill
                    width={1535}
                    height={1024}
                  />
                  <BoxShadow className="" />
                </div>
              </a>
            </motion.div>

            {/* IMAGE 3 : STYLE */}
            <motion.div
              key={`image-3-swatches`}
              className={cn(
                className3ImageWrapper,
                "h-[150px] shrink-0 lg:h-auto"
              )}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              // whileHover={{ scale: 1.02 }}
            >
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
                className="z-[10]"
                classNameTitle="text-[47px]"
                classNameSubtitle="text-[13px]"
              />
              {/* <ListColorsAndSwatches
                className="absolute right-[10px] bottom-[10px]"
                items={colorPalette?.map((color) => ({ color }))}
              /> */}
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default TabSwatches;
