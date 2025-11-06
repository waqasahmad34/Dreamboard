import { XIcon } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ListShareSocial from './Lists/ListShareSocial';

type TComponentProps = {
  children: React.ReactNode;
  className?: string;
  classNameDialogContent?: string;
  classNameTrigger?: string;
};

const ImageWithDialog = ({
  children,
  classNameTrigger,
  classNameDialogContent,
}: TComponentProps) => {
  return (
    <Dialog>
      {/* TRIGGER */}
      <DialogTrigger asChild>
        <div
          className={cn(
            'ImageWithDialog',
            'flex items-center justify-center',
            'hover:scale-101 hover:shadow-md',
            'transition-all duration-300',
            'rounded-[16px] shadow-lg',
            'relative',
            'cursor-pointer',
            classNameTrigger,
          )}
        >
          {children}
        </div>
      </DialogTrigger>
      <DialogOverlay className="bg-black/50" />

      {/* DIALOG */}
      <DialogContent
        className={cn(
          '!max-h-[100vh]',
          '!max-w-[100vw]',
          'overflow-hidden',
          'border-none',
          'bg-white/50 backdrop-blur-lg',
          'backdrop-blur-lg',
          'rounded-[16px]',
          'py-[40px] lg:py-[50px]',
          'px-[40px] lg:px-[50px]',
          // 'flex items-center justify-center',
          'grid place-items-center',

          'h-auto w-auto',
          // 'sm:!w-[350px] w-full',

          '[&_.ListShareSocial]:absolute [&_.ListShareSocial]:right-1/2 [&_.ListShareSocial]:translate-x-1/2',

          // '[&_img]:h-auto [&_img]:w-auto',
          // '[&_img]:max-h-[90%] [&_img]:w-auto',
          // '[&_img]:max-h-full [&_img]:max-w-full',
          // '[&_img]:h-auto [&_img]:w-auto',
          // '[&_img]:shrink-1 [&_img]:grow-0 [&_img]:object-contain',
        )}
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Swatch Image</DialogTitle>
        </DialogHeader>

        {/* CONTENT */}
        <div
          className={cn(
            'ImageWithDialogContent',
            'grid place-items-center',
            'overflow-hidden',
            // 'h-full w-full',
            'h-auto w-auto',
            classNameDialogContent,
          )}
        >
          {children}
          {/* <ListShareSocial
            className={cn(
              'absolute z-[10]',
              'flex-row gap-[5px]',
              'bottom-[10px]',
              'lg:-translate-x-1/2 left-[10px] lg:left-1/2',
            )}
          /> */}
        </div>

        {/* BUTTON CLOSE DIALOG */}
        <DialogClose asChild>
          <button
            type="button"
            className={cn(
              'absolute z-10 flex justify-end',
              'top-[5px] right-[5px] lg:top-[15px] lg:right-[15px]',
              'h-[20px] w-[20px] lg:h-[30px] lg:w-[30px]',
              'flex items-center justify-center',
              'rounded-[6px]',
              'cursor-pointer bg-gray-100/90 font-medium text-gray-700 text-sm backdrop-blur-sm hover:bg-gray-200/90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-0',
              'bg-white',
              // 'border border-white/20 shadow-lg',
            )}
          >
            <XIcon className="h-[20px] w-[20px]" />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ImageWithDialog;
