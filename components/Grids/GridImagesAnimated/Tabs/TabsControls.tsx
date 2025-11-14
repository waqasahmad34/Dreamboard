import cn from "@/utils/cn";

type TComponentProps = {
  className?: string;
  tab: number;
  setTab: (tab: number) => void;
};

const TabsControls = ({ className, tab, setTab }: TComponentProps) => {
  const classNamesButton = [
    "flex items-center justify-center",
    "h-[25px] sm:h-[35px] lg:h-auto",
    // 'w-auto lg:w-[35px] xl:w-[44px]',
    "skew-x-[-12deg]",
    // 'lg:skew-x-0 lg:skew-y-[-12deg]',
    "min-[1140px]:p-[10px] md:p-[6px] p-[10px]",
    // 'lg:px-0 lg:py-[10px]',
    "uppercase",
    "text-[8px] sm:text-[10px] md:text-[12px] min-[1140px]:text-[16px]",
    "transition-all duration-300",
    "backdrop-blur-[16px]",
    "cursor-pointer",
    "relative",
  ];

  const classNameText = cn(
    "skew-x-[12deg]"
    // 'lg:skew-x-0 lg:skew-y-[12deg]',
    // 'lg:[writing-mode:sideways-lr]'
  );

  return (
    <div
      className={cn(
        "TabsControls",
        "flex gap-0",
        "flex-row",
        // 'lg:flex-col',
        className
      )}
    >
      <button
        type="button"
        className={cn(
          classNamesButton,
          "bg-yellow-200",
          "order-4 lg:order-1",
          tab === 3 && "scale-110",
          tab === 3 && "z-[10]"
        )}
        onClick={() => setTab(3)}
      >
        <span className={classNameText}>Comments</span>
      </button>
      {/* <button
        type="button"
        className={cn(
          classNamesButton,
          'bg-green-200/40',
          'order-3 lg:order-2',
          tab === 2 && 'scale-110',
          tab === 2 && 'z-[10]',
        )}
        onClick={() => setTab(2)}
      >
        <span className={classNameText}>Suggestions</span>
      </button> */}
      <button
        type="button"
        className={cn(
          classNamesButton,
          "bg-blue-200",
          "order-2 lg:order-3",
          tab === 1 && "scale-110",
          tab === 1 && "z-[10]"
        )}
        onClick={() => setTab(1)}
      >
        <span className={classNameText}>Moodboard</span>
      </button>
      {/* <button
        type="button"
        className={cn(
          classNamesButton,
          'bg-red-200/40',
          'order-1 lg:order-4',
          tab === 0 && 'scale-110',
          tab === 0 && 'z-[10]',
        )}
        onClick={() => setTab(0)}
      >
        <span className={classNameText}>Swatches</span>
      </button> */}
    </div>
  );
};

export default TabsControls;
