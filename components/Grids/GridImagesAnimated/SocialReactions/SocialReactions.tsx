"use client";

// import { motion } from 'framer-motion';
import { useEffect } from "react";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { useSocialReactions } from "@/hooks/useSocialReactions";
import cn from "@/utils/cn";

// import FloatingReactions from './FloatingReactions';

type TComponentProps = {
  className?: string;
  classNameSocialReactionsList?: string;
  classNameReactionItem?: string;
  idData?: string; // ID for state management
  idAnimation?: string; // ID for animation rendering (defaults to idData if not provided)
  classNameFloatingIcon?: string;
};

const SocialReactions = ({
  className,
  classNameSocialReactionsList,
  classNameReactionItem,
  idData = "default", // Default ID if not provided
  idAnimation, // ID for animation rendering
  classNameFloatingIcon,
}: TComponentProps) => {
  // Use idAnimation if provided, otherwise fall back to idData
  const effectiveAnimationId = idAnimation || idData;
  // Use the social reactions context
  const {
    getScopedState,
    initializeScopedState,
    addScopedFloatingReaction,
    removeFloatingReaction,
    setScopedReactionButtonsDisabled,
    incrementScopedLikeCount,
    incrementScopedDislikeCount,
  } = useSocialReactions();

  // Initialize the scoped state when component mounts
  useEffect(() => {
    initializeScopedState(idData);
  }, [idData, initializeScopedState]);

  // Get scoped state for this component
  const { isReactionButtonsDisabled, likeCount, dislikeCount } =
    getScopedState(idData);

  const reactionsLike = [
    {
      reaction: "like",
      icon: "👍",
    },
    {
      reaction: "heart",
      icon: "♥️",
    },
    {
      reaction: "smile",
      icon: "😀",
    },
    {
      reaction: "love",
      icon: "😍",
    },
    {
      reaction: "laugh",
      icon: "😁",
    },
  ];
  const reactionsDisLike = [
    {
      reaction: "dislike",
      icon: "👎",
    },
    {
      reaction: "sad",
      icon: "🥲",
    },
    {
      reaction: "angry",
      icon: "😡",
    },
  ];

  // HANDLERS
  const sendReaction = (reaction: string) => {
    // https://emojipedia.org/heart-suit
    if (isReactionButtonsDisabled) return; // Prevent multiple clicks during cooldown

    const reactionsMap = {
      like: "👍",
      heart: "♥️",
      smile: "😀",
      love: "😍",
      laugh: "😁",
      dislike: "👎",
      sad: "🥲",
      angry: "😡",
    };

    // Update count based on reaction type
    if (["like", "heart", "smile", "love", "laugh"].includes(reaction)) {
      incrementScopedLikeCount(idData);
    } else if (["dislike", "sad", "angry"].includes(reaction)) {
      incrementScopedDislikeCount(idData);
    }

    // Disable the button for 3 seconds
    setScopedReactionButtonsDisabled(idData, true);
    setTimeout(() => {
      setScopedReactionButtonsDisabled(idData, false);
    }, 3000);

    // Create a new floating thumb with random horizontal position
    const newReaction = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // Random position between 10% and 90% from left
      icon: (
        <span className={cn("text-[50px]", classNameFloatingIcon)}>
          {reactionsMap[reaction as keyof typeof reactionsMap]}
        </span>
      ),
    };
    addScopedFloatingReaction(effectiveAnimationId, newReaction);

    // Remove the thumb after animation completes
    setTimeout(() => {
      removeFloatingReaction(newReaction.id);
    }, 3000);
  };

  type TComponentProps = {
    reaction: string;
    icon: React.ReactNode;
    className?: string;
  };

  const ReactionButton = ({ reaction, icon, className }: TComponentProps) => {
    return (
      <button
        type="button"
        className={cn(
          "cursor-pointer transition-all duration-300 hover:scale-110 ",
          "flex items-center justify-center",
          "h-[15px] w-[15px] lg:h-[30px] lg:w-[30px]",
          isReactionButtonsDisabled &&
            "cursor-not-allowed opacity-50 hover:scale-100"
        )}
        disabled={isReactionButtonsDisabled}
        onClick={() => {
          sendReaction(reaction);
        }}
      >
        <span
          className={cn("text-[15px] lg:text-[30px]", "mt-[3px]", className)}
        >
          {icon}
        </span>
      </button>
    );
  };

  const BadgeReaction = ({
    count,
    className,
  }: {
    count: number;
    className: string;
  }) => {
    return (
      <span
        className={cn(
          "BadgeReaction",
          "absolute",
          "z-[30]",
          "top-[-12px] right-[-8px]",
          "flex items-center justify-center",
          "h-[22px] w-[22px]",
          // 'p-[5px]',
          "text-white",
          "text-[12px]",
          "rounded-full",
          "bg-blue-500",
          className
        )}
      >
        <span className="mt-[2px] ml-[1px]">{count}</span>
      </span>
    );
  };

  return (
    <>
      {/* <FloatingReactions floatingReactions={floatingReactions} /> */}
      <div
        className={cn(
          "SocialReactions",
          "flex items-center",
          "flex-col lg:flex-row",
          "gap-[10px]",
          className
        )}
      >
        {/* LIKE */}
        <div
          className={cn(
            "group",
            "relative",
            "z-[1]",
            "hover:z-[20]",
            "bg-white",
            "rounded-[16px]",
            "hover:scale-105",
            "hover:bg-white",
            "transition-all duration-300",
            "cursor-pointer",
            "p-[10px]"
          )}
        >
          <FiThumbsUp
            className={cn(
              "text-blue-500 drop-shadow-lg",
              "h-[10px] w-[10px] lg:h-[15px] lg:w-[15px]"
            )}
          />
          <BadgeReaction count={likeCount} className="bg-blue-500" />

          <span className="sr-only">Like</span>
          <div
            className={cn(
              "absolute",
              "z-[50]",

              "top-[-0px] md:top-[-20px] lg:top-[-60px]",
              "lg:right-1/2",
              "lg:translate-x-1/2",
              "left-[30px] md:left-auto",

              "rounded-[16px]",
              "bg-white",
              "border-none shadow-lg",
              "hidden group-hover:flex",
              "items-center",
              "p-[8px] lg:p-[15px]",
              "gap-[10px] lg:gap-[15px]",
              "items-center justify-center",

              classNameSocialReactionsList
            )}
          >
            {reactionsLike.map((reaction) => (
              <ReactionButton
                key={reaction.reaction}
                reaction={reaction.reaction}
                icon={reaction.icon}
                className={cn(classNameReactionItem)}
              />
            ))}
          </div>
        </div>

        {/* DISLIKE */}
        <div
          className={cn(
            "group",
            "relative",
            "z-[1]",
            "hover:z-[20]",
            "bg-white",
            "p-[10px]",
            "rounded-[16px]",
            "hover:scale-105",
            "hover:bg-white",
            "transition-all duration-300",
            "cursor-pointer"
          )}
        >
          <FiThumbsDown
            className={cn(
              "text-red-500 drop-shadow-lg",
              "h-[10px] w-[10px] lg:h-[16px] lg:w-[16px]"
            )}
          />
          <BadgeReaction count={dislikeCount} className="bg-red-500" />
          <span className="sr-only">Dislike</span>
          <div
            className={cn(
              "absolute",
              "z-[50]",

              "top-[-0px] md:top-[-20px] lg:top-[-60px]",
              "lg:translate-x-1/2",
              "lg:right-1/2",
              "left-[30px] md:left-auto",

              "rounded-[16px]",
              "bg-white",
              "border-none",
              "shadow-lg",
              "hidden group-hover:flex",
              "items-center",
              "p-[8px] lg:p-[15px]",
              "gap-[10px] lg:gap-[15px]",
              "items-center justify-center",

              classNameSocialReactionsList
            )}
          >
            {reactionsDisLike.map((reaction) => (
              <ReactionButton
                key={reaction.reaction}
                reaction={reaction.reaction}
                icon={reaction.icon}
                className={classNameReactionItem}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialReactions;
