import { MdOutlineChat } from 'react-icons/md';
import cn from '@/utils/cn';

type TComponentProps = {
  className?: string;
};

const ButtonChat = ({ className }: TComponentProps) => {
  return (
    <button
      className={cn(
        'ButtonChat',
        'fixed',
        'z-[10]',
        'right-[50px] bottom-[40px] lg:right-[150px]',
        'flex items-center justify-center',
        'size-[40px] lg:size-[60px]',
        'rounded-tl-[50%] rounded-tr-[6px]',
        'rounded-br-[50%] rounded-bl-[50%]',
        'shadow-xl',
        'cursor-pointer',
        'shrink-0',
        'bg-[#35CDCE]',
        className,
      )}
      tabIndex={0}
      type="button"
    >
      <MdOutlineChat className="size-[15px] text-white lg:size-[35px]" />
    </button>
  );
};

export default ButtonChat;
