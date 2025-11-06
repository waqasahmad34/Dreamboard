type TComponentProps = {
  title: string;
  subTitle: string;
  className?: string;
};

import cn from '@/utils/cn';

const TitleWithSubtitle = ({ title, subTitle, className }: TComponentProps) => {
  return (
    <div
      className={cn(
        'TitleWithSubtitle',
        'flex flex-col items-start gap-[5px]',
        className,
      )}
    >
      <h2
        className={cn(
          'font-semibold uppercase',
          'text-[10px] sm:text-[14px] lg:text-[18px]',
          'leading-none',
        )}
      >
        {title}
      </h2>
      <h3 className={cn('font-[200] text-[10px] leading-none', 'uppercase')}>
        {subTitle}
      </h3>
    </div>
  );
};

export default TitleWithSubtitle;
