'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import cn from '@/utils/cn';

type TComponentProps = {
  className?: string;
};

import { useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import imageTab1 from '@/public/images/tabs/bg-tab-1.jpg';
import imageTab2 from '@/public/images/tabs/bg-tab-2.jpg';
import imageTab3 from '@/public/images/tabs/bg-tab-3.jpg';
import imageTab4 from '@/public/images/tabs/bg-tab-4.jpg';
import imageBgTabsContent from '@/public/images/tabs/bg-tabs-content.jpg';
import imageProductTab1 from '@/public/images/tabs/image-tab-1.jpg';
import imageProductTab2 from '@/public/images/tabs/image-tab-2.jpg';
import imageProductTab3 from '@/public/images/tabs/image-tab-3.jpg';
import imageProductTab4 from '@/public/images/tabs/image-tab-4.jpg';

// const items = [
//   {
//     title: 'Cloud',
//     subtitle: 'Comfort',
//     imageLeft: imageTab1,
//     imageRight: imageProductTab1,
//     badgeComponents: '2.0 Density Foam | ILD 21',
//     text1: 'Soft and relaxed with a lived-in feel.',
//     text2:
//       'Soft and sink-in cozy, Cloud brings a relaxed, lived-in feel ideal for light lounging.',
//     badgeRecommendedFor: 'Occasional Use, Reading Nooks, Shabby Chic Spaces',
//     sliderComfort: 90,
//     sliderDurability: 50,
//     sliderSupport: 30,
//   },
//   {
//     title: 'Wave',
//     subtitle: 'Comfort',
//     imageBig: imageTab2,
//     imageProduct: imageProductTab2,
//   },
//   {
//     title: 'Plush',
//     subtitle: 'Comfort',
//     imageBig: imageTab3,
//     imageProduct: imageProductTab3,
//   },
//   {
//     title: 'Performance',
//     subtitle: 'Comfort',
//     imageBig: imageTab4,
//     imageProduct: imageProductTab4,
//   },
// ];

const TabsDreamComfortCustom = ({ className }: TComponentProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isExiting, setIsExiting] = useState(false);
  const [currentTab, setCurrentTab] = useState('cloud');

  const handleTabChange = (newTab: string) => {
    if (newTab !== currentTab) {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentTab(newTab);
        setIsExiting(false);
      }, 400); // Duration should match the exit animation duration
    }
  };

  const classNameTabTrigger = cn(
    'w-[163px] h-[37px]',
    '!bg-[#f5ede2]',
    'uppercase',
    // '!grow-1',
    // '!shrink-1',
    'cursor-pointer',
    'hover:!bg-[#d0c2b3]',
    '!w-[163px]',
  );

  return (
    <div
      ref={ref}
      className={cn(
        className,
        'flex flex-col',
        'gap-[20px] lg:gap-[40px]',
        'items-center',
      )}
    >
      {/* TABS */}
      <div
        className={cn(
          'flex items-center justify-center',
          'gap-[10px] lg:gap-[20px]',
          'flex-col lg:flex-row',
          'bg-transparent',
          'h-auto',
        )}
      >
        <button
          type="button"
          onClick={() => handleTabChange('cloud')}
          className={cn(
            classNameTabTrigger,
            currentTab === 'cloud' && '!bg-[#d0c2b3]',
          )}
        >
          Cloud
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('wave')}
          className={cn(
            classNameTabTrigger,
            currentTab === 'wave' && '!bg-[#d0c2b3]',
          )}
        >
          Wave
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('plush')}
          className={cn(
            classNameTabTrigger,
            currentTab === 'plush' && '!bg-[#d0c2b3]',
          )}
        >
          Plush
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('performance')}
          className={cn(
            classNameTabTrigger,
            currentTab === 'performance' && '!bg-[#d0c2b3]',
          )}
        >
          Performance
        </button>
      </div>

      {/* CONTENT */}
      <div
        className={cn(
          'relative',
          'w-full',
          'h-[800px] lg:h-auto',
          'lg:aspect-[1300/867]',
          'relative',
          'rounded-[16px]',
          'overflow-hidden',
        )}
      >
        <AnimatePresence
        // mode="wait"
        >
          {/* TAB 1 */}
          {currentTab === 'cloud' && (
            <motion.div
              key="cloud"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div
                className={cn(
                  'flex items-center justify-center gap-[20px]',
                  'flex-col lg:flex-row',
                )}
              >
                {/* TITLE */}
                <TabTitle
                  isInView={isInView}
                  isExiting={isExiting}
                  title="Cloud"
                  subtitle="Comfort"
                />

                {/* CONTENT */}
                <TabContent
                  isInView={isInView}
                  isExiting={isExiting}
                  imageBig={imageTab1}
                  imageProduct={imageProductTab1}
                />
              </div>
            </motion.div>
          )}

          {/* TAB 2 */}
          {currentTab === 'wave' && (
            <motion.div
              key="wave"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div
                className={cn(
                  'flex items-center justify-center gap-[20px]',
                  'flex-col lg:flex-row',
                )}
              >
                {/* TITLE */}
                <TabTitle
                  isInView={isInView}
                  isExiting={isExiting}
                  title="Wave"
                  subtitle="Comfort"
                />

                {/* CONTENT */}
                <TabContent
                  isInView={isInView}
                  isExiting={isExiting}
                  imageBig={imageTab2}
                  imageProduct={imageProductTab2}
                />
              </div>
            </motion.div>
          )}

          {/* TAB 3 */}
          {currentTab === 'plush' && (
            <motion.div
              key="plush"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div
                className={cn(
                  'flex items-center justify-center gap-[20px]',
                  'flex-col lg:flex-row',
                )}
              >
                {/* TITLE */}
                <TabTitle
                  isInView={isInView}
                  isExiting={isExiting}
                  title="Plush"
                  subtitle="Comfort"
                  className={cn('[&>h2]:text-[150px]', '[&>span]:pl-[0px]')}
                />

                {/* CONTENT */}
                <TabContent
                  isInView={isInView}
                  isExiting={isExiting}
                  imageBig={imageTab3}
                  imageProduct={imageProductTab3}
                />
              </div>
            </motion.div>
          )}

          {/* TAB 4 */}
          {currentTab === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div
                className={cn(
                  'flex items-center justify-center gap-[20px]',
                  'flex-col lg:flex-row',
                )}
              >
                {/* TITLE */}
                <TabTitle
                  isInView={isInView}
                  isExiting={isExiting}
                  title="Performance"
                  subtitle="Comfort"
                  className={cn(
                    '[&>h2]:text-[100px]',
                    '[&>span]:pl-[0px]',
                    // '[&>span]:text-[40px]'
                  )}
                />

                {/* CONTENT */}
                <TabContent
                  isInView={isInView}
                  isExiting={isExiting}
                  imageBig={imageTab4}
                  imageProduct={imageProductTab4}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BACKGROUND */}
        <Image
          src={imageBgTabsContent}
          alt="imageBgTabsContent"
          fill
          className="hidden object-contain lg:block"
          // width={1300}
          // height={867}
        />
      </div>
    </div>
  );
};

export default TabsDreamComfortCustom;

type TTabTitleProps = {
  isInView: boolean;
  isExiting: boolean;
  title: string;
  subtitle: string;
  className?: string;
};

const TabTitle = ({
  isInView,
  isExiting,
  title,
  subtitle,
  className,
}: TTabTitleProps) => {
  return (
    <div
      className={cn(
        'z-[10] flex flex-col items-center justify-center lg:items-start',
        'text-black lg:text-white',
        'lg:-translate-y-1/2 lg:absolute lg:top-1/2 lg:left-[50px] lg:z-[11]',
        className,
      )}
    >
      <motion.h2
        className={cn(
          'leading-[1.5] lg:leading-none',
          'font-[400] font-es-wf',
          'text-[100px] lg:text-[200px]',
        )}
        initial={{ opacity: 0, x: -50 }}
        animate={
          isInView && !isExiting ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
        }
        transition={{
          duration: 0.8,
          delay: isExiting ? 0 : 0.2,
          ease: 'easeOut',
        }}
      >
        {title}
      </motion.h2>
      <motion.span
        className={cn(
          'font-semibold uppercase tracking-[30px]',
          'text-[20px] lg:text-[40px]',
          'lg:pl-[100px]',
        )}
        initial={{ opacity: 0, x: -30 }}
        animate={
          isInView && !isExiting ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
        }
        transition={{
          duration: 0.6,
          delay: isExiting ? 0 : 0.2,
          ease: 'easeOut',
        }}
      >
        {subtitle}
      </motion.span>
    </div>
  );
};

type TTabContentProps = {
  isInView: boolean;
  isExiting: boolean;
  imageBig: StaticImageData;
  imageProduct: StaticImageData;
};

const TabContent = ({
  isInView,
  isExiting,
  imageBig,
  imageProduct,
}: TTabContentProps) => {
  return (
    <motion.div
      className={cn(
        'flex items-stretch justify-center',
        'gap-[20px]',
        'text-white',
        'lg:-translate-y-1/2 lg:absolute lg:top-1/2 lg:right-[50px] lg:z-[10]',
        'rounded-[16px]',
        'p-[10px] lg:p-[40px]',
        'bg-[rgba(169,141,110,0.7)]',
        'backdrop-blur-[5px]',
        'w-full lg:w-2/3',
      )}
      initial={{ opacity: 0, x: 100 }}
      animate={
        isInView && !isExiting ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
      }
      transition={{
        duration: 0.8,
        delay: isExiting ? 0 : 0.2,
        ease: 'easeOut',
      }}
    >
      {/* LEFT COL */}
      <Image
        src={imageBig}
        alt="Tab content image"
        width="775"
        height="1161"
        className={cn(
          'rounded-[16px] object-cover',
          'w-1/2',
          'hidden lg:block',
        )}
      />

      {/* RIGHT COL */}
      <div
        className={cn(
          'flex flex-col items-center justify-start',
          'px-[40px]',
          'py-[20px]',
          'bg-[rgba(169,141,110,0.7)]',
          'rounded-[16px]',
          'w-full lg:w-1/2',
        )}
      >
        <Image
          src={imageProduct}
          alt="Tab content image"
          width="221"
          height="178"
          className="mb-[20px] w-1/2 w-full rounded-[16px] object-contain"
        />

        <div className="mb-[10px] flex items-center justify-center gap-[10px] rounded-[11px] bg-[rgba(0,0,0,0.5)] px-[20px] text-center align-baseline font-semibold text-[11px] text-white uppercase leading-[30px] tracking-widest selection:bg-[#F97352] selection:text-white">
          <span className="">2.0</span> Density Foam | ILD{' '}
          <span className="">21</span>
        </div>
        <h4 className="mb-[20px] break-words text-center font-normal text-[9px] text-white uppercase leading-[1.3em] tracking-[0.04em] selection:bg-[#F97352] selection:text-white">
          Soft and relaxed with a lived-in feel.
        </h4>
        <p className="mb-[20px] w-4/5 break-words text-center align-baseline font-normal text-sm text-white leading-[1.2] selection:bg-[#F97352] selection:text-white">
          Soft and sink-in cozy, Cloud brings a relaxed, lived-in feel ideal for
          light lounging.
        </p>

        <p className="mb-[10px] break-words text-center align-baseline font-semibold text-[9px] text-white uppercase leading-[1.5em] tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
          Recommended For
        </p>
        <div className="mx-auto mt-0 mb-5 block rounded-[5px] border border-[#ffffff] bg-[rgba(255,255,255,0.4)] bg-auto bg-none bg-repeat bg-origin-padding px-1.5 pt-[7px] pb-1.5 text-center align-baseline font-semibold text-[11px] text-white uppercase leading-[1.2] selection:bg-[#F97352] selection:text-white">
          Occasional Use, Reading Nooks, Shabby Chic Spaces
        </div>

        <div className="mb-[10px] flex w-full flex-col items-center justify-center gap-[5px]">
          <span className="break-words text-center align-baseline text-[9px] text-white uppercase leading-[1.5em] tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
            Lounging Comfort
          </span>
          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            className={cn(
              'w-full',
              '[&_[data-slot=slider-range]]:bg-[#39d766] [&_[data-slot=slider-thumb]]:border-[#F97352] [&_[data-slot=slider-track]]:bg-gray-300',
              '[&_[data-slot=slider-thumb]]:bg-white',
              'pointer-events-none',
            )}
          />
        </div>

        <div className="mb-[10px] flex w-full flex-col items-center justify-center gap-[5px]">
          <span className="break-words text-center align-baseline text-[9px] text-white uppercase leading-[1.5em] tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
            Durability
          </span>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={cn(
              'w-full',
              '[&_[data-slot=slider-range]]:bg-[#8eecf8] [&_[data-slot=slider-thumb]]:border-[#F97352] [&_[data-slot=slider-track]]:bg-gray-300',
              '[&_[data-slot=slider-thumb]]:bg-white',
              'pointer-events-none',
            )}
          />
        </div>

        <div className="mb-[10px] flex w-full flex-col items-center justify-center gap-[5px]">
          <span className="break-words text-center align-baseline text-[9px] text-white uppercase leading-[1.5em] tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
            Support
          </span>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={cn(
              'w-full',
              '[&_[data-slot=slider-range]]:bg-[#ea8c8c] [&_[data-slot=slider-thumb]]:border-[#F97352] [&_[data-slot=slider-track]]:bg-gray-300',
              '[&_[data-slot=slider-thumb]]:bg-white',
              'pointer-events-none',
            )}
          />
        </div>
      </div>
    </motion.div>
  );
};
