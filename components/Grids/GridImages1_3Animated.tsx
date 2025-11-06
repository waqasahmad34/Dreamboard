import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FcLike } from 'react-icons/fc';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { LuSendHorizontal } from 'react-icons/lu';
import BoxShadow from '@/components/BoxShadow';
import ButtonGlassed from '@/components/Buttons/ButtonGlassed';
import Comments from '@/components/Comments';
import DetailsSwatch from '@/components/Details/DetailsSwatch';
import { IconSofa } from '@/components/icons';
import ListColorsAndSwatches from '@/components/Lists/ListColorsAndSwatches';
import ListShareSocial2 from '@/components/Lists/ListShareSocial2';
import ListSquareItems from '@/components/Lists/ListSquareItems';
import TitleGridItem from '@/components/Titles/TitleGridItem';
import TitleWithSubtitle from '@/components/Titles/TitleWithSubtitle';

import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

const GridImages1_3Animated = ({ data }: TComponentProps) => {
  // console.log(data);
  const room_style_string = data?.room_style_string;
  const swatch_url = data?.swatch_url;
  const swatch_filename_string = data?.swatch_filename_string;
  const final_room_url = data?.final_room_url;
  const styled_product_url = data?.styled_product_url;
  const product_filename_string = data?.product_filename_string;
  const portrait = data?.portrait;
  const colorPalette = data?.colorPalette;
  // const colorPalleteFirstItem = data?.colorPalleteFirstItem;
  const mood_board_url = data?.mood_board_url;
  // const sofa_type_url = data?.sofa_type;

  const className3ImageWrapper = [
    'ImageGrid',
    'relative flex shrink items-center justify-center rounded-[16px] overflow-hidden',
    'shadow-lg',
  ];

  // const swatch_static_url =
  //   'https://d3m7r2hywaso4h.cloudfront.net/temp_assets/need_static_1.jpg';

  // Animation configurations
  const containerAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const [variant, setVariant] = useState<number>(1);
  const [floatingThumbs, setFloatingThumbs] = useState<
    { id: number; x: number }[]
  >([]);
  const [floatingThumbsDown, setFloatingThumbsDown] = useState<
    { id: number; x: number }[]
  >([]);
  const [isLikeDislikeButtonsDisabled, setIsLikeDislikeButtonsDisabled] =
    useState<boolean>(false);
  const [isDislikePopoverOpen, setIsDislikePopoverOpen] =
    useState<boolean>(false);
  const [isCommentsPopoverOpen, setIsCommentsPopoverOpen] =
    useState<boolean>(false);

  const Controls = () => {
    return (
      <div
        className={cn(
          'TabsControls',
          'absolute',
          'flex',
          'top-[-39px] left-[0px] md:top-[-47px]',
          'md:-translate-x-1/2 md:-translate-y-1/2 z-[20] md:top-1/2 md:left-[-22px]',
          'md:rotate-[-90deg]',
          'text-[12px] md:text-[16px]',
        )}
      >
        <button
          type="button"
          className={cn(
            'cursor-pointer p-[10px] px-[20px]',
            'skew-x-[12deg]',
            'bg-red-200/40',
            'backdrop-blur-lg',
            'uppercase',
            'relative',
            'transition-all duration-300',
            variant === 0 && 'scale-110',
            variant === 0 && 'z-[10]',
          )}
          onClick={() => setVariant(0)}
        >
          <span className="flex skew-x-[-12deg]">Swatches</span>
        </button>
        <button
          type="button"
          className={cn(
            'cursor-pointer p-[10px] px-[20px]',
            'skew-x-[12deg]',
            'bg-blue-200/40',
            'backdrop-blur-lg',
            'uppercase',
            'relative',
            'transition-all duration-300',
            variant === 1 && 'scale-110',
            variant === 1 && 'z-[10]',
          )}
          onClick={() => setVariant(1)}
        >
          <span className="flex skew-x-[-12deg]">Moodboard</span>
        </button>
        <button
          type="button"
          className={cn(
            'cursor-pointer p-[10px] px-[20px]',
            'skew-x-[12deg]',
            'bg-green-200/40',
            'backdrop-blur-lg',
            'uppercase',
            'relative',
            'transition-all duration-300',
            variant === 2 && 'scale-110',
            variant === 2 && 'z-[10]',
          )}
          onClick={() => setVariant(2)}
        >
          <span className="flex skew-x-[-12deg]">Suggestions</span>
        </button>
        <button
          type="button"
          className={cn(
            'cursor-pointer p-[10px] px-[20px]',
            'skew-x-[12deg]',
            'bg-yellow-200/40',
            'backdrop-blur-lg',
            'uppercase',
            'relative',
            'transition-all duration-300',
            variant === 3 && 'scale-110',
            variant === 3 && 'z-[10]',
          )}
          onClick={() => setVariant(3)}
        >
          <span className="flex skew-x-[-12deg]">Comments</span>
        </button>
      </div>
    );
  };

  const sendLike = () => {
    if (isLikeDislikeButtonsDisabled) return; // Prevent multiple clicks during cooldown

    // Disable the button for 3 seconds
    setIsLikeDislikeButtonsDisabled(true);
    setTimeout(() => {
      setIsLikeDislikeButtonsDisabled(false);
    }, 3000);

    // Create a new floating thumb with random horizontal position
    const newThumb = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // Random position between 10% and 90% from left
    };
    setFloatingThumbs((prev) => [...prev, newThumb]);

    // Remove the thumb after animation completes
    setTimeout(() => {
      setFloatingThumbs((prev) =>
        prev.filter((thumb) => thumb.id !== newThumb.id),
      );
    }, 3000);
  };

  const sendDislike = () => {
    if (isLikeDislikeButtonsDisabled) return; // Prevent multiple clicks during cooldown

    // Disable the button for 3 seconds
    setIsLikeDislikeButtonsDisabled(true);
    setTimeout(() => {
      setIsLikeDislikeButtonsDisabled(false);
    }, 3000);

    // Create a new floating thumb down with random horizontal position
    const newThumbDown = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // Random position between 10% and 90% from left
    };
    setFloatingThumbsDown((prev) => [...prev, newThumbDown]);

    // Remove the thumb down after animation completes
    setTimeout(() => {
      setFloatingThumbsDown((prev) =>
        prev.filter((thumb) => thumb.id !== newThumbDown.id),
      );
    }, 3000);

    // Close the popover after showing it briefly
    setTimeout(() => {
      setIsDislikePopoverOpen(false);
    }, 2000);
  };

  const FloatingThumbsUp = () => {
    return (
      <div className="pointer-events-none absolute inset-0 z-[1000] overflow-hidden">
        {/* Looping test thumb */}
        {/* <motion.div
          className="absolute"
          style={{
            bottom: '0px',
            left: `${Math.random() * 80 + 10}%`, // Random starting position between 10% and 90%
          }}
          animate={{
            y: [0, '-1000px'],
            x: [0, 30, -20, 40, -10, 25, 0], // Chaotic left-right movement
            rotate: [0, 15, -10, 20, -15, 10, 0], // Add rotation for more chaos
          }}
          transition={{
            duration: 3,
            ease: 'easeOut',
            // repeat: Infinity,
            // repeatDelay: 1,
          }}
        >
          <FiThumbsUp
            className="text-blue-500 drop-shadow-lg"
            size={48}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
            }}
          />
        </motion.div> */}

        {floatingThumbs.map((thumb) => (
          <motion.div
            key={thumb.id}
            className="absolute"
            style={{
              bottom: '0px',
              left: `${Math.random() * 80 + 10}%`,
            }}
            // initial={{
            //   y: 0,
            //   x: 0,
            //   opacity: 0,
            //   scale: 0.5,
            //   rotate: -20,
            // }}
            animate={{
              y: [0, '-1000px'],
              x: [0, 30, -20, 40, -10, 25, 0], // Chaotic left-right movement
              rotate: [0, 15, -10, 20, -15, 10, 0], // Add rotation for more chaos
            }}
            transition={{
              duration: 3,
              ease: 'easeOut',
              // repeat: Infinity,
              // repeatDelay: 1,
            }}
          >
            <FiThumbsUp
              className={cn('text-blue-500 drop-shadow-lg')}
              size={32}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  const FloatingThumbsDown = () => {
    return (
      <div className="pointer-events-none absolute inset-0 z-[1000] overflow-hidden">
        {floatingThumbsDown.map((thumb) => (
          <motion.div
            key={thumb.id}
            className="absolute"
            style={{
              bottom: '0px',
              left: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              y: [0, '-1000px'],
              x: [0, 30, -20, 40, -10, 25, 0], // Chaotic left-right movement
              rotate: [0, 15, -10, 20, -15, 10, 0], // Add rotation for more chaos
            }}
            transition={{
              duration: 3,
              ease: 'easeOut',
            }}
          >
            <FiThumbsDown
              className={cn('text-red-500 drop-shadow-lg')}
              size={32}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  const SocialActions = () => {
    return (
      <div
        className={cn(
          'SocialActions',
          'absolute',
          'z-[30]',
          'lg:-translate-x-1/2 lg:bottom-[40px] lg:left-1/2',
          '-translate-y-1/2 top-1/2 right-[20px] lg:top-auto lg:right-auto lg:translate-y-0',
          'flex items-center gap-[10px]',
          'flex-col lg:flex-row',
        )}
      >
        <ListShareSocial2
          className={cn()}
          url={final_room_url}
          media={final_room_url}
        />

        <ButtonGlassed
          className={cn('group relative')}
          onClick={() => {
            sendLike();
          }}
          disabled={isLikeDislikeButtonsDisabled}
        >
          <FiThumbsUp
            className={cn('text-blue-500 drop-shadow-lg')}
            size={16}
          />
          <span className="absolute right-1/2 bottom-[-30px] z-[10] translate-x-1/2 text-blue-500">
            5
          </span>
          <span className="sr-only">Like</span>
          <div
            className={cn(
              'absolute top-[-50px] right-1/2 z-[10] translate-x-1/2',
              'pb-[0px]',
            )}
          >
            <div
              className={cn(
                'rounded-[16px]',
                'bg-white/20 backdrop-blur-[16px]',
                'p-[10px]',
                'border-none shadow-lg',
                'hidden group-hover:flex',
                'items-center gap-[10px]',
              )}
            >
              <button
                type="button"
                className="cursor-pointer transition-all duration-300 hover:scale-110"
              >
                <BiSolidLike className="text-blue-500" size={30} />
              </button>
              <button
                type="button"
                className="cursor-pointer transition-all duration-300 hover:scale-110"
              >
                <FcLike className="text-blue-500" size={30} />
              </button>
              <button
                type="button"
                className={cn(
                  'flex cursor-pointer items-center justify-center transition-all duration-300 hover:scale-110',
                  'h-[30px] w-[30px] overflow-hidden',
                )}
              >
                <span className="text-[25px]">😀</span>
              </button>
              {/* <button
								type="button"
								className="flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
							>
								<span className="text-[30px]">😍</span>
							</button>
							<button
								type="button"
								className="flex items-center justify-center h-[30px] w-[30px] cursor-pointer transition-all duration-300 hover:scale-110"
							>
								<span className="text-[30px]">😁</span>
							</button>
							<button
								type="button"
								className="flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
							>
								<span className="text-[30px]">🥲</span>
							</button>
							<button
								type="button"
								className="flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
							>
								<span className="text-[30px]">😡</span>
							</button> */}
            </div>
          </div>
        </ButtonGlassed>

        <Popover
          open={isDislikePopoverOpen}
          onOpenChange={setIsDislikePopoverOpen}
        >
          <PopoverTrigger asChild>
            <ButtonGlassed
              className={cn('relative')}
              disabled={isLikeDislikeButtonsDisabled}
              onClick={() => {
                setIsDislikePopoverOpen(true);
              }}
            >
              <FiThumbsDown
                className={cn('text-red-500 drop-shadow-lg')}
                size={16}
              />
              <span className="absolute right-1/2 bottom-[-30px] z-[10] translate-x-1/2 text-red-500">
                0
              </span>
              <span className="sr-only">Dislike</span>
            </ButtonGlassed>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="center"
            className={cn(
              // 'relative z-[100]',
              'rounded-[16px]',
              'p-[10px]',
              'border-none shadow-lg',
              'text-black',
              'bg-white/20 backdrop-blur-[16px]',
              'flex items-center gap-[10px]',
              'w-auto',
            )}
          >
            <button
              type="button"
              className="cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <BiSolidLike className="text-blue-500" size={30} />
            </button>
            <button
              type="button"
              className="cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <FcLike className="text-blue-500" size={30} />
            </button>
            <button
              type="button"
              className="cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <span className="text-[30px]">😀</span>
            </button>
            <button
              type="button"
              className="cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <span className="text-[30px]">😍</span>
            </button>
            <button
              type="button"
              className="cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <span className="text-[30px]">😁</span>
            </button>
            <button
              type="button"
              className="cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <span className="text-[30px]">🥲</span>
            </button>
            <button
              type="button"
              className="cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <span className="text-[30px]">😡</span>
            </button>
          </PopoverContent>
        </Popover>

        <Popover
          open={isCommentsPopoverOpen}
          onOpenChange={setIsCommentsPopoverOpen}
        >
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                'bg-white/20 backdrop-blur-[16px]',
                'p-[10px]',
                'rounded-[16px]',
                'hover:scale-105',
                'transition-all duration-300',
                'cursor-pointer',
              )}
              onClick={() => {
                setVariant(3);
                setIsCommentsPopoverOpen(true);
              }}
            >
              <MessageCircle className="" size={16} />
              <span className="absolute right-1/2 bottom-[-30px] z-[10] translate-x-1/2 text-black">
                10
              </span>
              <span className="sr-only">Comments</span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className={cn(
              'w-[400px]',
              'bg-white text-black',
              'px-[20px] py-[20px]',
              'rounded-[16px]',
              'border-0 shadow-lg',
              'bg-white/20 backdrop-blur-[16px]',
            )}
          >
            <div className="flex gap-2">
              <Input
                placeholder="What do you think about this design?"
                className={cn('w-full text-[12px] lg:text-[16px]', 'bg-white')}
              />
              <button
                type="button"
                className={cn(
                  'rounded bg-primary px-3 py-1 text-white text-xs transition-colors',
                  'hover:bg-primary/80',
                  // 'cursor-not-allowed opacity-50',
                  'cursor-pointer',
                )}
              >
                <LuSendHorizontal />
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  const variants = [
    // SCREEN 1
    {
      component: (
        <div className="relative">
          {/* TAB CONTROLS */}
          <Controls />

          {/* GRID : 3 IMAGES */}
          <motion.div
            key={`variant-0-${variant}`}
            className={cn(
              'relative col-span-1 bg-gray-100 p-[15px]',
              'h-[200px] md:h-full',
            )}
            {...containerAnimation}
          >
            {/* BG : IMAGE */}
            <Image
              className={cn('Background', 'h-full w-full', 'object-cover')}
              src={final_room_url}
              alt={`styled_product_url`}
              fill
            />

            {/* BG : STAINED GLASS */}
            <div className="absolute inset-0 bg-[#a98d6e99]/60 backdrop-blur-[13px]" />

            {/* TABS CONTROLS : TAB 1, TAB 2*/}

            <Tabs defaultValue="style" className="relative">
              <TabsList className="flex w-full justify-center bg-transparent">
                <TabsTrigger
                  value="style"
                  className={cn(
                    'group cursor-pointer',
                    '!shadow-none',
                    'rounded-none',
                    'border-transparent border-t-0 border-r-0 border-b-2 border-l-0',
                    'data-[state=active]:bg-transparent data-[state=active]:text-white',
                    // 'data-[state=active]:border-white',
                  )}
                >
                  <span
                    className={cn(
                      'text-white uppercase',
                      'underline-offset-[8px]',
                      'group-data-[state=active]:underline',
                    )}
                  >
                    Style
                  </span>
                </TabsTrigger>
                <span className="text-white">|</span>
                <TabsTrigger
                  value="fabric"
                  className={cn(
                    'group cursor-pointer',
                    '!shadow-none',
                    'rounded-none',
                    'border-transparent border-t-0 border-r-0 border-b-2 border-l-0',
                    'data-[state=active]:bg-transparent data-[state=active]:text-white',
                    // 'data-[state=active]:border-white',
                  )}
                >
                  <span
                    className={cn(
                      'text-white uppercase',
                      'underline-offset-[8px]',
                      'group-data-[state=active]:underline',
                    )}
                  >
                    Fabric
                  </span>
                </TabsTrigger>
              </TabsList>

              {/* TAB 1 */}
              <TabsContent value="style">
                <div
                  className={cn(
                    'TabContent Tab1',
                    'grid grid-cols-3 grid-rows-1 gap-[15px] md:grid-cols-1 md:grid-rows-3',
                    'h-full',
                  )}
                >
                  {/* IMAGE 1 : SWATCH */}
                  <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <motion.div
                        key={`image-1-${variant}`}
                        className={cn(
                          className3ImageWrapper,
                          'bg-white',
                          'p-[20px]',
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
                          className={cn(
                            'object-contain',
                            // 'h-[90%] w-[90%] max-w-[200px]',
                            // 'scale-110'
                          )}
                          // fill
                          width={200}
                          height={200}
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
                      )}
                      arrowClassName="bg-white fill-white"
                    >
                      <DetailsSwatch data={data} />
                    </TooltipContent>
                  </Tooltip>

                  {/* IMAGE 2 : PRODUCT */}
                  <motion.div
                    key={`image-2-${variant}`}
                    initial={{ opacity: 0, x: 100, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    // whileHover={{ scale: 1.02 }}
                  >
                    <a
                      href="https://www.dreamsofa.com/product/sofa/bordeaux-cosmo-steel-sofa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        className3ImageWrapper,
                        'flex-col',
                        'bg-white',
                        'transition-all duration-300',
                        'hover:scale-102',
                        'shadow-lg',
                        'h-full w-full',
                      )}
                    >
                      <TitleWithSubtitle
                        title={product_filename_string}
                        subTitle="Xxxxx"
                        className="absolute top-[10px] left-[10px] z-[20] text-[#333333]"
                      />
                      <div className="relative mt-auto mb-0 h-[80%] w-[80%] overflow-hidden">
                        <Image
                          className={cn(
                            'object-contain',
                            'scale-110',
                            'h-full w-full',
                          )}
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
                    key={`image-3-${variant}`}
                    className={cn(className3ImageWrapper)}
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
                    <ListColorsAndSwatches
                      className="absolute right-[10px] bottom-[10px]"
                      items={colorPalette?.map((color) => ({ color }))}
                    />
                  </motion.div>
                </div>
              </TabsContent>

              {/* TAB 2 */}
              <TabsContent value="fabric">
                <div
                  className={cn(
                    'TabContent Tab2',
                    'grid grid-cols-3 grid-rows-1 gap-[15px] md:grid-cols-1 md:grid-rows-3',
                    'h-full',
                  )}
                >
                  {/* IMAGE 1 : SWATCH */}
                  <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <motion.div
                        key={`image-1-${variant}`}
                        className={cn(className3ImageWrapper)}
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
                          className={cn(
                            'h-full w-full',
                            'object-cover',
                            'scale-110',
                          )}
                          fill
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
                      )}
                      arrowClassName="bg-white fill-white"
                    >
                      <DetailsSwatch data={data} />
                    </TooltipContent>
                  </Tooltip>

                  {/* IMAGE 2 : PRODUCT */}
                  <motion.div
                    key={`image-2-${variant}`}
                    initial={{ opacity: 0, x: 100, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    // whileHover={{ scale: 1.02 }}
                  >
                    <a
                      href="https://www.dreamsofa.com/product/sofa/bordeaux-cosmo-steel-sofa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        className3ImageWrapper,
                        'flex-col',
                        'bg-white',
                        'transition-all duration-300',
                        'hover:scale-102',
                        'shadow-lg',
                        'h-full w-full',
                      )}
                    >
                      <TitleWithSubtitle
                        title={product_filename_string}
                        subTitle="Xxxxx"
                        className="absolute top-[10px] left-[10px] z-[20] text-[#333333]"
                      />
                      <div className="relative mt-auto mb-0 h-[80%] w-[80%] overflow-hidden">
                        <Image
                          className={cn(
                            'object-contain',
                            'scale-110',
                            'h-full w-full',
                          )}
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
                    key={`image-3-${variant}`}
                    className={cn(className3ImageWrapper)}
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
                    <ListColorsAndSwatches
                      className="absolute right-[10px] bottom-[10px]"
                      items={colorPalette?.map((color) => ({ color }))}
                    />
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      ),
    },
    // SCREEN 2
    {
      component: (
        <div className="relative h-full">
          {/* CONTROLS */}
          <Controls />

          {/* 2 IMAGES */}
          <motion.div
            key={`variant-1-${variant}`}
            className={cn('relative p-[15px]', 'bg-gray-100', 'h-full')}
            {...containerAnimation}
          >
            {/* BG : IMAGE */}
            <Image
              className={cn('Background', 'h-full w-full', 'object-cover')}
              src={final_room_url}
              alt={`styled_product_url`}
              fill
            />

            {/* BG : STAINED GLASS */}
            <div className="absolute inset-0 bg-[#a98d6e99]/60 backdrop-blur-[13px]" />

            <div
              className={cn(
                'flex flex-row justify-around gap-[15px] md:flex-col',
                // 'grid grid-cols-3 grid-rows-1 md:grid-cols-1 md:grid-rows-3',
                'h-full',
                'md:gap-y-[15px]',
                'gap-x-[15px] md:gap-x-[0px]',
              )}
            >
              {/* IMAGE 1 : MOODBOARD */}
              <motion.div
                key={`image-1-variant-1-${variant}`}
                className={cn(
                  className3ImageWrapper,
                  'col-span-2 md:row-span-2',
                  'max-w-full',
                  // 'aspect-[3/2] md:aspect-[2/3]',
                )}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                // whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={mood_board_url}
                  alt={`mood_board_url`}
                  className={cn(
                    'h-full w-full',
                    'object-cover',
                    'aspect-[2/3]',
                  )}
                  // fill
                  width={1535}
                  height={1024}
                />
              </motion.div>

              {/* IMAGE 2 : PRODUCT*/}
              <motion.div
                key={`image-2-variant-1-${variant}`}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                // whileHover={{ scale: 1.02 }}
              >
                <a
                  href="https://www.dreamsofa.com/product/sofa/bordeaux-cosmo-steel-sofa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    className3ImageWrapper,
                    'flex-col',
                    'bg-white',
                    'aspect-[3/2]',
                    'transition-all duration-300',
                    'hover:scale-102',
                    'shadow-lg',
                    'h-full w-full',
                  )}
                >
                  <TitleWithSubtitle
                    title={product_filename_string}
                    subTitle="Xxxxx"
                    className="absolute top-[10px] left-[10px] z-[20] text-[#333333]"
                  />
                  <div className="relative mt-auto mb-0 h-[80%] w-[80%] overflow-hidden">
                    <Image
                      // className="object-contain object-size"
                      className={cn(
                        'object-contain',
                        'scale-110',
                        'h-full w-full',
                      )}
                      src={styled_product_url}
                      alt={`styled_product_url`}
                      // fill
                      width={1535}
                      height={1024}
                    />
                    <BoxShadow className="" />
                  </div>
                  <ListSquareItems
                    className="absolute top-[10px] right-[10px] z-[10]"
                    classNameItem=""
                    items={[
                      {
                        // image: sofa_type_url,
                        // image_alt: 'sofa_type_url',
                        // className:
                        //   '!left-1/2 -translate-x-1/2 !top-1/2 -translate-y-1/2 scale-none !w-[38px] !h-[38px]',
                        icon: (
                          <IconSofa
                            size={50}
                            className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 bg-[#b0aca7] fill-[#6a6464]"
                          />
                        ),
                      },
                      { image: swatch_url },
                    ]}
                  />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ),
    },
    // SCREEN 3
    {
      component: (
        <div className="relative">
          {/* TAB CONTROLS */}
          <Controls />

          {/* 3 IMAGES */}
          <motion.div
            key={`variant-0-${variant}`}
            className={cn(
              'relative col-span-1 bg-gray-100 p-[15px]',
              'h-[200px] md:h-full',
            )}
            {...containerAnimation}
          >
            {/* BG : IMAGE */}
            <Image
              className={cn('Background', 'h-full w-full', 'object-cover')}
              src={final_room_url}
              alt={`styled_product_url`}
              fill
            />
            {/* BG : STAINED GLASS */}
            <div className="absolute inset-0 bg-[#a98d6e99]/60 backdrop-blur-[13px]" />
            <div
              className={cn(
                // 'flex flex-col justify-around gap-[15px]'
                'grid grid-cols-3 grid-rows-1 gap-[15px] md:grid-cols-1 md:grid-rows-3',
                'h-full',
              )}
            >
              {/* IMAGE 1 : SWATCH */}
              <motion.div
                key={`image-1-${variant}`}
                className={cn(className3ImageWrapper, 'bg-white', 'p-[20px]')}
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
                  className={cn(
                    'object-contain',
                    // 'h-[90%] w-[90%] max-w-[200px]',
                    // 'scale-110'
                  )}
                  // fill
                  width={200}
                  height={200}
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
                key={`image-2-${variant}`}
                className={cn(className3ImageWrapper, 'bg-white', 'p-[20px]')}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
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
                  className={cn(
                    'object-contain',
                    // 'h-[90%] w-[90%] max-w-[200px]',
                    // 'scale-110'
                  )}
                  // fill
                  width={200}
                  height={200}
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
                key={`image-3-${variant}`}
                className={cn(className3ImageWrapper, 'bg-white', 'p-[20px]')}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
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
                  className={cn(
                    'object-contain',
                    // 'h-[90%] w-[90%] max-w-[200px]',
                    // 'scale-110'
                  )}
                  // fill
                  width={200}
                  height={200}
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
        </div>
      ),
    },
    // SCREEN 4
    {
      component: (
        <div className="relative max-h-[750px]">
          {/* TAB CONTROLS */}
          <Controls />

          {/* 3 IMAGES */}
          <motion.div
            key={`variant-0-${variant}`}
            className={cn(
              'relative col-span-1 bg-gray-100 p-[15px]',
              'h-[200px] md:h-full',
              // 'overflow-y-scroll',
            )}
            {...containerAnimation}
          >
            {/* BG : IMAGE */}
            <Image
              className={cn('Background', 'h-full w-full', 'object-cover')}
              src={final_room_url}
              alt={`styled_product_url`}
              fill
            />
            {/* BG : STAINED GLASS */}
            <div className="absolute inset-0 bg-[#a98d6e99]/60 backdrop-blur-[13px]" />

            <Comments
              className={cn(
                // 'bg-white/60',
                'relative',
                // 'backdrop-blur-[13px]',
                'h-full',
                'p-[0px]',
                'pr-[5px]',
              )}
            />
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div
      className={cn(
        'GridImages1_3Animated',
        'grid grid-cols-1 md:grid-cols-4',
        'overflow-hidden rounded-[15px]',
        'w-[70vw]',
      )}
    >
      {/* MAIN IMAGE */}

      <div
        className={cn(
          'col-span-3 bg-gray-100',
          'max-h-[700px]',
          'overflow-y-scroll',
          // 'md:max-h-full'
        )}
      >
        <div
          className={cn(
            'relative',
            // 'max-h-[600px]',
            // 'h-full'
          )}
        >
          <Image
            src={final_room_url}
            alt={`final_room_url`}
            className={cn('aspect-[3/2]', 'w-full', 'object-cover')}
            width={1535}
            height={1024}
          />
          <SocialActions />
          <FloatingThumbsUp />
          <FloatingThumbsDown />
        </div>
      </div>
      {variants[variant].component}
    </div>
  );
};

export default GridImages1_3Animated;
