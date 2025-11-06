import cn from '@/utils/cn';

type TComponentProps = {
  className?: string;
  subTitle: string;
  title: string;
};

const TitleBigWithSubtitle = ({
  className,
  subTitle,
  title,
}: TComponentProps) => {
  return (
    <div
      className={cn(
        'TitleBigWithSubtitle',
        'flex flex-col items-start justify-start gap-[10px]',
        className,
      )}
    >
      <span
        className={cn(
          'font-extrabold text-[15px] uppercase leading-none tracking-[6px]',
        )}
      >
        {subTitle}
      </span>
      <h2
        className={cn(
          'font-extrabold uppercase leading-none',
          'text-[25px] lg:text-[70px]',
          'text-[#7d7d7f]',
          'tracking-[10px]',
        )}
      >
        {title}
      </h2>
    </div>
  );
};

export default TitleBigWithSubtitle;
