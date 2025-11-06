import { Upload } from 'lucide-react';
import { forwardRef } from 'react';
import cn from '@/utils/cn';

interface IComponentProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
}

const InputFile = forwardRef<HTMLInputElement, IComponentProps>(
  (
    { className, id = 'file-input', accept = 'image/*', ...inputProps },
    ref,
  ) => {
    return (
      <div className={cn('relative', 'h-[38px]', className)}>
        <input
          type="file"
          id={id}
          className="absolute inset-0 z-[0] h-full w-full cursor-pointer opacity-0"
          accept={accept}
          onClick={(e) => {
            (e.currentTarget as HTMLInputElement).value = '';
            if (typeof inputProps.onClick === 'function') {
              inputProps.onClick(e);
            }
          }}
          ref={ref}
          {...inputProps}
        />
        <label
          htmlFor={id}
          className={cn(
            'flex items-center justify-center gap-2',
            'rounded-[10px]',
            'h-full w-full',
            'px-[10px]',
            'transition-colors',
            'bg-white',
            'cursor-pointer',
            'shadow-lg hover:shadow-xl',
          )}
        >
          <Upload className="h-[15px] w-[15px] text-[#000000]" />
          <span className="text-[#000000] text-[14px] uppercase tracking-[-1px]">
            Choose from device
          </span>
        </label>
      </div>
    );
  },
);

InputFile.displayName = 'InputFile';

export default InputFile;
