import cn from '@/utils/cn';
import TabComments from './TabsItems/TabComments';
import TabMoodboard from './TabsItems/TabMoodboard';
import TabSuggestions from './TabsItems/TabSuggestions';
import TabSwatches from './TabsItems/TabSwatches';

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
    index?: number;
    productMetadata?: Record<string, any>;
    swatchMetadata?: Record<string, any>;
  };
  tab: number;
};

const TabsItems = ({ data, tab }: TComponentProps) => {
  // console.log('data', data);
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

  const className3ImageWrapper = [
    'relative',
    'flex items-center justify-center',
    'rounded-[16px]',
    'overflow-hidden',
    'shadow-lg',
  ];

  const tabs = [
    // SWATCHES
    {
      component: (
        <TabSwatches
          data={data}
          className="h-full"
          containerAnimation={containerAnimation}
          className3ImageWrapper={className3ImageWrapper}
        />
      ),
    },
    // MOODBOARD
    {
      component: (
        <TabMoodboard
          data={data}
          className="h-full"
          containerAnimation={containerAnimation}
          className3ImageWrapper={className3ImageWrapper}
        />
      ),
    },
    // SUGGESTIONS
    {
      component: (
        <TabSuggestions
          data={data}
          className="h-full"
          containerAnimation={containerAnimation}
          className3ImageWrapper={className3ImageWrapper}
        />
      ),
    },
    // COMMENTS
    {
      component: <TabComments data={data} className="h-full" />,
    },
  ];

  return (
    <div className={cn('h-full w-full', 'rounded-[16px]')}>
      {tabs[tab].component}
    </div>
  );
};

export default TabsItems;
