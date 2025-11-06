import cn from '@/utils/cn';

type TComponentProps = {
  className?: string;
  title: string;
  subtitle: string;
  text: string;
  imageUrl: string;
};

const TitleClippedText = ({
  className,
  title,
  subtitle,
  text,
  imageUrl,
}: TComponentProps) => {
  return (
    <div className={cn('TitleClippedText', 'flex flex-col', className)}>
      <span
        className={cn(
          'inline-block text-center align-top font-extrabold tracking-[0.6em]',
          'uppercase',
          'text-neutral-800',
          'text-[15px]',
          'selection:bg-[#F97352] selection:text-white',
          'leading-none',
          'mb-[20px]',
        )}
      >
        {subtitle}
      </span>
      <h2
        className={cn(
          'font-brand',
          'text-transparent uppercase',
          'text-[30px] sm:text-[60px] lg:text-[130px]',
          'text-center',
          'leading-none',
          'bg-clip-text',
        )}
        style={{
          backgroundImage: 'url(' + (imageUrl || '') + ')',
          backgroundSize: '2000px 1000px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {title}
      </h2>
      <p
        className={cn(
          'break-words p-0 text-center align-baseline text-neutral-400 text-xs opacity-100',
          'selection:bg-[#F97352] selection:text-white',
          'leading-[1.2]',
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default TitleClippedText;
