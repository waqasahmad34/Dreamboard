import React from "react";
import cn from "@/utils/cn";

type TComponentProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: React.ReactNode;
};

const ButtonGlassed = React.forwardRef<HTMLButtonElement, TComponentProps>(
  ({ className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "ButtonGlassed",
          "bg-white backdrop-blur-[16px]",
          "p-[10px]",
          "rounded-[16px]",
          "hover:scale-105",
          "hover:bg-white/50",
          "transition-all duration-300",
          "cursor-pointer",
          disabled && "cursor-not-allowed opacity-50 hover:scale-100",
          className
        )}
        type="button"
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonGlassed.displayName = "ButtonGlassed";

export default ButtonGlassed;
