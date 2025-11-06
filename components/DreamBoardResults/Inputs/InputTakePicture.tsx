import { Camera } from 'lucide-react';
import { forwardRef } from 'react';
import cn from '@/utils/cn';

interface IComponentProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
}

const InputTakePicture = forwardRef<HTMLInputElement, IComponentProps>(
  (
    {
      className,
      id = 'camera-input',
      accept = 'image/*',
      capture = 'environment',
      ...inputProps
    },
    ref,
  ) => {
    return (
      <div className={cn('relative', 'h-[38px]', className)}>
        <input
          type="file"
          id={id}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          accept={accept}
          {...({ capture } as unknown as Record<string, unknown>)}
          ref={ref}
          {...inputProps}
        />
        <label
          htmlFor={id}
          className={cn(
            'flex items-center justify-center gap-2',
            'h-full w-full',
            'rounded-[10px]',
            'cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50',
          )}
        >
          <Camera className="h-[15px] w-[15px] text-[#000000]" />
          <span className="text-[#000000] text-[14px] uppercase tracking-[-1px]">
            Take a picture
          </span>
        </label>
      </div>
    );
  },
);

InputTakePicture.displayName = 'InputTakePicture';

export default InputTakePicture;
