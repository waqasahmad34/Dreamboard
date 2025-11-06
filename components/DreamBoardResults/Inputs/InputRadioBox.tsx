import { forwardRef } from 'react';
import cn from '@/utils/cn';

interface IComponentProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  label: string;
  className?: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputRadioBox = forwardRef<HTMLInputElement, IComponentProps>(
  ({ label, className, name, value, onChange, ...rest }, ref) => {
    const options = [
      { value: 'modern', label: 'MODERN' },
      { value: 'contempo', label: 'CONTEMPO' },
      { value: 'midcentury', label: 'MIDCENTURY' },
      { value: 'classic', label: 'CLASSIC' },
      { value: 'boho', label: 'BOHO' },
      { value: 'minimal', label: 'MINIMAL' },
    ];

    return (
      <div
        className={cn(
          'flex items-center',
          'rounded-[10px] border border-[#60584f]',
          'overflow-hidden',
          className,
        )}
      >
        {options.map((option, index) => (
          <div
            key={option.value}
            className={cn(
              'flex items-center justify-center',
              'hover:bg-[#8c8478]',
              'text-[#60584f] hover:text-white',
              'transition-colors duration-200',
              'cursor-pointer',
              'grow',
              'h-[45px]',
              index < options.length - 1 && 'border-[#60584f] border-r',
              value === option.value && 'bg-[#60584f] text-white',
            )}
          >
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              className="sr-only"
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              ref={ref}
              {...rest}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={`flex h-full w-full cursor-pointer items-center justify-center font-bold text-[15px]`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  },
);

InputRadioBox.displayName = 'InputRadioBox';

export default InputRadioBox;
