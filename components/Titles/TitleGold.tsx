"use client";
import cn from "@/utils/cn";

type TComponentProps = {
  className?: string;
  title: string;
  subtitle: string;
  text: string;
};

const TitleGold = ({ className, title, subtitle, text }: TComponentProps) => {
  return (
    <section
      className={cn(
        "TitleGold",
        "flex flex-col items-center justify-center",
        "max-w-full",
        "overflow-hidden",
        className
      )}
    >
      {/* HEADING */}
      <h2
        className={cn(
          "text-center font-extrabold text-[#D2C4B7] uppercase opacity-100",
          "selection:bg-[#F97352] selection:text-white",
          "text-[22px] sm:text-[40px] lg:text-[75px]",
          "mb-[15px]",
          "leading-none",
          // 'break-all',
          "break-word"
        )}
      >
        {title}
      </h2>
      {/* SUBHEADING */}
      <span
        className={cn(
          "inline-block text-center align-top font-extrabold text-neutral-800 uppercase leading-none opacity-100",
          "tracking-[0.3em] lg:tracking-[0.6em]",
          "selection:bg-[#F97352] selection:text-white",
          "leading-none",
          "text-[10px] sm:text-[15px] lg:text-[15px]",
          "mb-[25px] lg:mb-[25px]"
        )}
      >
        {subtitle}
      </span>
      {/* TEXT */}
      <p
        className={cn(
          "text-neutral-400",
          "text-center",
          "break-words",
          "align-baseline",
          "selection:bg-[#F97352] selection:text-white",
          "leading-[1.2]",
          "text-[12px] sm:text-[15px] lg:text-[17px]"
        )}
      >
        {text}
      </p>
    </section>
  );
};

export default TitleGold;
