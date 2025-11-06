'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import cn from '@/utils/cn';
import getStyleImage from '@/utils/getStyleImage';

interface IComponentProps {
  className?: string;
  style: string;
}

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

const items = [
  {
    id: 'cloud',
    title: 'Cloud',
    subtitle: 'Comfort',
    classNameTitle: cn([
      // '[&>h2]:text-[100px]',
      // '[&>span]:text-[10px]'
      '[&>h4]:pl-[50px]',
    ]),
    classNameContent: cn([
      // '[&>h2]:text-[100px]',
    ]),
    imageLeft: imageTab1.src,
    imageRight: imageProductTab1.src,
    badgeFoam: '2.0 Density Foam | ILD 21',
    text1: 'Soft and relaxed with a lived-in feel.',
    text2:
      'Soft and sink-in cozy, Cloud brings a relaxed, lived-in feel ideal for light lounging.',
    badgeRecommendedFor: 'Occasional Use, Reading Nooks, Shabby Chic Spaces',
    sliderComfort: 90,
    sliderDurability: 50,
    sliderSupport: 30,
  },
  {
    id: 'wave',
    title: 'Wave',
    subtitle: 'Comfort',
    classNameTitle: cn([
      // '[&>h2]:text-[100px]',
      // '[&>span]:text-[10px]'
    ]),
    classNameContent: cn([
      // '[&>h2]:text-[100px]',
    ]),
    imageLeft: imageTab2,
    imageRight: imageProductTab2,
    badgeFoam: '2.0 Density Foam | ILD 26',
    text1: 'Balanced and breathable, never too firm.',
    text2:
      'Wave strikes the perfect balance, supportive yet cushioned, with a clean, tailored sit.',
    badgeRecommendedFor: 'Family Rooms, Everyday Lounging, Crisp Look Lovers',
    sliderComfort: 80,
    sliderDurability: 70,
    sliderSupport: 80,
  },
  {
    id: 'plush',
    title: 'Plush',
    subtitle: 'Comfort',
    classNameTitle: cn([
      // '[&>h2]:text-[100px]',
      // '[&>span]:text-[10px]'
    ]),
    classNameContent: cn([
      // '[&>h2]:text-[100px]',
    ]),
    imageLeft: imageTab3,
    imageRight: imageProductTab3,
    badgeFoam: '2.5 Density Foam | ILD 28',
    text1: 'Layered with coils for lasting support.',
    text2:
      'Plush combines high-density foam with an inner coil system for superior comfort, crisp structure, and long-term durability that holds up beautifully over 15+ years.',
    badgeRecommendedFor: 'Lounging Spaces, Long-term Comfort, Busy Homes',
    sliderComfort: 80,
    sliderDurability: 90,
    sliderSupport: 90,
  },
  {
    id: 'performance',
    title: 'Performance',
    subtitle: 'Comfort',
    classNameTitle: cn(['[&>h2]:lg:text-[120px]']),
    classNameContent: cn([
      // '[&>h2]:text-[100px]',
    ]),
    imageLeft: imageTab4,
    imageRight: imageProductTab4,
    badgeFoam: '2.5 Density Foam | ILD 41',
    text1: 'Extra-firm and built for durability.',
    text2:
      'Extra-firm and ultra-durable, Performance is built for structure and high-traffic use.',
    badgeRecommendedFor: 'Commercial Use, Formal Spaces, Upright Seating',
    sliderComfort: 40,
    sliderDurability: 100,
    sliderSupport: 40,
  },
];

const TabsDreamComfort = ({ className, style }: IComponentProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isExiting, setIsExiting] = useState(false);
  const [currentTab, setCurrentTab] = useState('cloud');

  // console.log('TabsDreamComfort -> style:', style);

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
    'w-auto lg:w-[163px]',
    'h-[37px]',
    '!bg-[#f5ede2]',
    'uppercase',
    'cursor-pointer',
    'hover:!bg-[#d0c2b3]',
    'data-[state=active]:!bg-[#d0c2b3]',
    // '!grow-1',
    // '!shrink-1',
  );

  return (
    <Tabs
      ref={ref}
      value={currentTab}
      onValueChange={handleTabChange}
      className={cn(
        'TabsDreamComfort',
        'flex flex-col',
        'gap-[20px] lg:gap-[40px]',
        'items-center',
        className,
      )}
    >
      {/* TABS */}
      <TabsList
        className={cn(
          // '!flex items-center justify-center',
          // 'flex-col lg:flex-row',
          'grid',
          'grid-cols-2 sm:grid-cols-4',
          'gap-[10px] lg:gap-[20px]',
          'bg-transparent',
          'h-auto',
        )}
      >
        <TabsTrigger value="cloud" className={cn(classNameTabTrigger)}>
          Cloud
        </TabsTrigger>

        <TabsTrigger value="wave" className={cn(classNameTabTrigger)}>
          Wave
        </TabsTrigger>
        <TabsTrigger value="plush" className={cn(classNameTabTrigger)}>
          Plush
        </TabsTrigger>
        <TabsTrigger value="performance" className={cn(classNameTabTrigger)}>
          Performance
        </TabsTrigger>
      </TabsList>

      {/* CONTENT */}
      <div
        className={cn(
          'TabsContent relative',
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
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <TabsContent value={item.id} className="Tab p-[20px]">
                {/* BG MOBILE*/}
                <motion.div
                  key={`bg-${item.id}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentTab === item.id && !isExiting ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.imageLeft}
                    alt="Tab content image"
                    fill
                    className={cn('inset-0', 'object-cover', 'opacity-50')}
                  />
                </motion.div>

                <div
                  className={cn(
                    'flex items-center justify-center',
                    'gap-[20px]',
                    'flex-col lg:flex-row',
                  )}
                >
                  {/* TITLE */}
                  <TabTitle
                    isInView={isInView}
                    isExiting={isExiting}
                    title={item.title}
                    subtitle={item.subtitle}
                    classNameTitle={item.classNameTitle}
                  />

                  {/* CONTENT */}
                  <TabContent
                    isInView={isInView}
                    isExiting={isExiting}
                    imageLeft={item.imageLeft}
                    imageRight={item.imageRight}
                    badgeFoam={item.badgeFoam}
                    text1={item.text1}
                    text2={item.text2}
                    badgeRecommendedFor={item.badgeRecommendedFor}
                    sliderComfort={item.sliderComfort}
                    sliderDurability={item.sliderDurability}
                    sliderSupport={item.sliderSupport}
                    className={cn(
                      '[&>h2]:text-[100px]',
                      '[&>span]:pl-[0px]',
                      item.classNameContent,
                      // '[&>span]:text-[40px]'
                    )}
                  />
                </div>
              </TabsContent>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* BG DESKTOP */}
        <Image
          src={getStyleImage(style, 'landscape').src}
          alt="imageBgTabsContent"
          fill
          className="hidden object-contain lg:block"
        />
      </div>
    </Tabs>
  );
};

export default TabsDreamComfort;

type TTabTitleProps = {
  isInView: boolean;
  isExiting: boolean;
  title: string;
  subtitle: string;
  classNameTitle?: string;
};

const TabTitle = ({
  isInView,
  isExiting,
  title,
  subtitle,
  classNameTitle,
}: TTabTitleProps) => {
  return (
    <div
      className={cn(
        'TabTitle',
        'flex flex-col items-center justify-center lg:items-start',
        'text-white',
        'lg:-translate-y-1/2 lg:absolute lg:top-1/2 lg:left-[50px]',
        'z-[11]',
        classNameTitle,
      )}
    >
      <motion.h2
        className={cn(
          'font-[600] font-es-wf',
          'text-[60px] md:text-[100px] lg:text-[150px]',
          // '!leading-none',
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
      <motion.h4
        className={cn(
          'font-[700] uppercase tracking-[30px]',
          'text-[20px] lg:text-[40px]',
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
      </motion.h4>
    </div>
  );
};

type TTabContentProps = {
  isInView: boolean;
  isExiting: boolean;
  imageLeft: string | StaticImageData;
  imageRight: string | StaticImageData;
  badgeFoam: string;
  text1: string;
  text2: string;
  badgeRecommendedFor: string;
  sliderComfort: number;
  sliderDurability: number;
  sliderSupport: number;
  className: string;
};

const TabContent = ({
  isInView,
  isExiting,
  imageLeft,
  imageRight,
  badgeFoam,
  text1,
  text2,
  badgeRecommendedFor,
  sliderComfort,
  sliderDurability,
  sliderSupport,
  className,
}: TTabContentProps) => {
  const arraySliders = [
    {
      label: 'Lounging Comfort',
      value: sliderComfort,
      rangeColor: '#39d766',
    },
    {
      label: 'Durability',
      value: sliderDurability,
      rangeColor: '#8eecf8',
    },
    {
      label: 'Support',
      value: sliderSupport,
      rangeColor: '#ea8c8c',
    },
  ];
  return (
    <motion.div
      className={cn(
        'TabContent',
        'flex items-stretch justify-center',
        'gap-[20px]',
        'text-white',
        'z-[10]',

        'lg:absolute',
        'lg:top-[20px] lg:bottom-[20px]',
        'lg:right-[20px]',

        'rounded-[16px]',
        'p-[10px] lg:p-[20px]',
        'bg-[rgba(169,141,110,0.7)]',
        'backdrop-blur-[5px]',

        'w-full lg:w-2/3',
        className,
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
        src={imageLeft}
        alt="Tab content image"
        width="775"
        height="1161"
        className={cn(
          'rounded-[16px] object-cover',
          'w-[40%]',
          'hidden lg:block',
        )}
      />

      {/* RIGHT COL */}
      <div
        className={cn(
          'flex flex-col items-center justify-start',
          'px-[0px]',
          'py-[20px]',
          'bg-[rgba(169,141,110,0.7)]',
          'rounded-[16px]',
          'w-full lg:w-[60%]',
        )}
      >
        <Image
          src={imageRight}
          alt="Tab content image"
          width="221"
          height="178"
          className={cn(
            'rounded-[16px]',
            'object-contain',
            'h-[150px]',
            'mb-[15px]',
          )}
        />

        <div
          className={cn(
            'mb-[10px] flex items-center justify-center gap-[10px] rounded-[11px] bg-[rgba(0,0,0,0.5)] px-[20px] text-center align-baseline font-semibold text-[11px] text-white uppercase leading-[30px] tracking-widest',
            'selection:bg-[#F97352] selection:text-white',
            'whitespace-nowrap',
          )}
        >
          <span className="mt-[2px]">{badgeFoam}</span>
        </div>
        <h4 className="mb-[20px] break-words text-center font-normal text-[9px] text-white uppercase leading-[1.3em] tracking-[0.04em] selection:bg-[#F97352] selection:text-white">
          {text1}
        </h4>
        <p className="mb-[20px] w-4/5 break-words text-center align-baseline font-normal text-sm text-white leading-[1.2] selection:bg-[#F97352] selection:text-white">
          {text2}
        </p>

        <p className="mb-[10px] break-words text-center align-baseline font-semibold text-[9px] text-white uppercase leading-[1.5em] tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
          Recommended For
        </p>
        <div
          className={cn(
            'mx-auto mt-0 mb-5 rounded-[5px] border border-[#ffffff] bg-[rgba(255,255,255,0.4)] bg-auto bg-none bg-repeat bg-origin-padding px-1.5 pt-[7px] pb-1.5 text-center align-baseline font-semibold text-[11px] text-white uppercase leading-[1.2]',
            'selection:bg-[#F97352] selection:text-white',
            'max-w-2/3',
          )}
        >
          {badgeRecommendedFor}
        </div>

        {arraySliders.map((slider) => (
          <div
            key={slider.label}
            className={cn(
              'mb-[10px] flex w-full flex-col items-center justify-center gap-[5px]',
              'px-[20px]',
            )}
          >
            <span className="break-words text-center align-baseline text-[9px] text-white uppercase leading-[1.5em] tracking-[0.2em] selection:bg-[#F97352] selection:text-white">
              {slider.label}
            </span>
            <Slider
              defaultValue={[slider.value]}
              max={100}
              step={1}
              className={cn(
                'w-full',
                `[&_[data-slot=slider-range]]:bg-[${slider.rangeColor}] [&_[data-slot=slider-thumb]]:border-[#F97352] [&_[data-slot=slider-track]]:bg-gray-300`,
                '[&_[data-slot=slider-thumb]]:bg-white',
                'pointer-events-none',
                'max-w-[300px]',
              )}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
