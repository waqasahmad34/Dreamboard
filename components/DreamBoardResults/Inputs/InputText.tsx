import { forwardRef } from 'react';
import cn from '@/utils/cn';

interface IComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  className?: string;
}

const InputText = forwardRef<HTMLInputElement, IComponentProps>(
  ({ id, placeholder, className, ...rest }, ref) => {
    return (
      <input
        id={id}
        name={id}
        type="text"
        className={cn(
          'flex items-center',
          'bg-[#f0eae6]',
          'text-[15px]',
          'rounded-[18px]',
          'px-[10px]',
          'h-[35px]',
          'min-w-[380px]',
          className,
        )}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
    );
  },
);

InputText.displayName = 'InputText';

export default InputText;
