import capitalizeEachWord from '@/utils/capitalizeEachWord';
import cn from '@/utils/cn';
import removeCharsFromString from '@/utils/removeCharsFromString';

type TComponentProps = {
  title: string;
  subTitle: string;
  className?: string;
  color?: string;
  classNameTitle?: string;
  classNameSubtitle?: string;
};

const TitleGridItem = ({
  title,
  subTitle,
  className,
  color = '#000000',
  classNameTitle,
  classNameSubtitle,
}: TComponentProps) => {
  const processedTitle = capitalizeEachWord(removeCharsFromString(title));
  const processedSubTitle = removeCharsFromString(subTitle);

  return (
    <div
      className={cn(
        'TitleGridItem',
        'flex flex-col items-center gap-[5px]',
        '-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2',
        className,
      )}
      style={{
        color: color,
      }}
    >
      <span
        className={cn(
          'whitespace-nowrap font-es-wf text-[45px]',
          classNameTitle,
        )}
      >
        {processedTitle}
      </span>
      <span
        className={cn(
          'font-semibold text-[13px] uppercase tracking-[10px]',
          classNameSubtitle,
        )}
      >
        {processedSubTitle}
      </span>
    </div>
  );
};

export default TitleGridItem;
