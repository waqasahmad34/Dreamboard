"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
// import { useState } from 'react';
import cn from "@/utils/cn";

interface IComponentProps {
  className?: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const TopBar = ({ className, isOpen, setIsOpen }: IComponentProps) => {
  const classNameLink = cn(
    "inline-flex",
    "items-center",
    "text-white",
    "hover:bg-[#dcf4f5] hover:text-black underline",
    "pt-3 pb-2 px-2"
  );

  return (
    <div
      className={cn(
        "TopBar",
        "bg-primary",
        "font-semibold text-white",
        "text-[9px] lg:text-[11px]",
        "uppercase",
        "relative",
        "z-[101]",
        "shadow-lg",
        "flex items-center",
        "lg:h-[40px]",
        isOpen && "h-[80px] lg:h-[40px]",
        className
        // 'py-[5px]',
        // 'lg:shadow-[-20px_20px_60px_-10px_rgba(0,0,0,0.5)]',
      )}
    >
      <div
        className={cn(
          "container",
          "relative",
          "flex items-stretch justify-center lg:justify-between",
          "flex-col lg:flex-row",
          isOpen ? "flex" : "hidden [@media(min-width:1100px)]:flex"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-center",
            "gap-2",
            "flex-col lg:flex-row",
            "mb-[0px]",
            "h-[40px]"
          )}
        >
          <p className="block text-center leading-[2]">
            Free Delivery <span className="px-[5px]">|</span>Lifetime Warranty
            <span className="px-[5px]">|</span>100% Satisfaction Guarantee
          </p>
        </div>

        <div
          className={cn(
            "flex items-stretch justify-center",
            "gap-[10px] lg:gap-[30px]",
            "h-[40px]"
            // 'lg:absolute lg:top-0 lg:right-[20px]',
          )}
        >
          <a
            className={cn(classNameLink, "dyn_phoneno")}
            href="tel:+18553753275"
          >
            855-375-3275
          </a>
          <Link
            className={classNameLink}
            href="https://www.dreamsofa.com/contact/"
          >
            Contact
          </Link>
          <Link
            className={classNameLink}
            href="https://www.dreamsofa.com/my-account/"
          >
            Login
          </Link>
        </div>
      </div>

      <button
        type="button"
        className={cn(
          "absolute",
          "bottom-[-20px]",
          "right-1/2 translate-x-1/2",
          "flex",
          "items-center justify-center",
          "[@media(min-width:1100px)]:hidden",
          "transition-all duration-300",
          "hover:scale-120"
        )}
        onClick={() => setIsOpen?.(!isOpen)}
      >
        <div className="bg-[#50c9ce] rounded-b-md px-3 pb-0.5">
          <ChevronDown
            className={cn("size-[20px] text-white", isOpen ? "rotate-180" : "")}
          />
        </div>
      </button>
    </div>
  );
};

export default TopBar;
