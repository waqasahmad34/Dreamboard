import cn from '@/utils/cn';

type TComponentProps = {
  className?: string;
  title?: string;
};

const ImageMissing = ({
  className,
  title = 'Image missing',
}: TComponentProps) => {
  // console.log('src', src);

  return (
    <div
      className={cn(
        'ImageMissing',
        'bg-gray-200',
        'flex items-center justify-center',
        'flex-col',
        'rounded-[16px]',
        className,
      )}
    >
      <h1 className="text-center">{title}</h1>
    </div>
  );
};

export default ImageMissing;
