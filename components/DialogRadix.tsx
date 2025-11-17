import { Dialog } from "radix-ui";
import { MdOutlineClose } from "react-icons/md";
import cn from "@/utils/cn";

interface IComponentProps {
  className?: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

const DialogRadix = ({ className, trigger, content }: IComponentProps) => (
  <Dialog.Root>
    <Dialog.Trigger
      asChild
      className={cn("DialogRadixTrigger", "cursor-pointer")}
    >
      {trigger}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn(
          "DialogRadixOverlay",
          "fixed inset-0 z-[9999]",
          "bg-black/50"
          // 'data-[state=open]:animate-overlayShow'
        )}
      />

      <Dialog.Content
        className={cn(
          "DialogRadixContent",
          "animate-[fadeIn_0.2s_ease-out_forwards]",
          "fixed",
          "-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2",
          "z-[9999]",
          "overflow-hidden lg:w-[90vw] md:w-[70%] w-[90vw]",

          "rounded-[16px]",
          "backdrop-blur-[5px]",
          "bg-white/50",

          "py-[30px]",
          "px-[30px]",

          "focus:outline-none",

          "flex items-center justify-center",
          // 'data-[state=open]:animate-contentShow',

          "max-w-[100vw]",
          // 'md:max-w-[90vw]',
          // 'lg:max-w-[1000px]',
          // 'aspect-[2.90/2]', // correct aspect ratio

          className
        )}
      >
        <Dialog.Title className="sr-only"></Dialog.Title>
        <Dialog.Description className="sr-only"></Dialog.Description>

        {/* CONTENT */}
        {content}

        <Dialog.Close asChild>
          <button
            className={cn(
              "DialogRadixButtonClose",
              "absolute",
              "top-[5px] right-[5px]",
              "inline-flex items-center justify-center",
              "appearance-none",
              "size-[25px]",
              "text-black",
              "focus:shadow-lg focus:outline-none",
              "transition-all duration-300",
              "cursor-pointer"
            )}
            aria-label="Close"
            type="button"
          >
            <MdOutlineClose />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogRadix;
