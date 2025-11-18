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
  // API Integration props
  type?: "comment" | "combination"; // Type of reaction
  commentId?: string; // For comment reactions
  sessionId?: string; // For combination reactions
  combinationId?: string; // For combination reactions
  initialLikes?: number; // Initial like count
  initialDislikes?: number; // Initial dislike count
  onReactionUpdate?: (likes: number, dislikes: number) => void; // Callback when reaction counts change
};

const SocialReactions = ({
  className,
  classNameSocialReactionsList,
  classNameReactionItem,
  idData = "default", // Default ID if not provided
  idAnimation, // ID for animation rendering
  classNameFloatingIcon,
  type,
  commentId,
  sessionId,
  combinationId,
  initialLikes,
  initialDislikes,
  onReactionUpdate,
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
    setScopedState,
  } = useSocialReactions();

  // Initialize the scoped state when component mounts
  useEffect(() => {
    initializeScopedState(idData);
    
    // Set initial counts if provided
    if (initialLikes !== undefined || initialDislikes !== undefined) {
      setScopedState(idData, {
        likeCount: initialLikes || 0,
        dislikeCount: initialDislikes || 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idData, initialLikes, initialDislikes]);

  // Fetch initial counts from API
  useEffect(() => {
    const fetchReactionCounts = async () => {
      if (!type) return; // No API integration if type not specified

      try {
        let response;
        
        if (type === "comment" && commentId) {
          // For comments, we get counts from the comment itself
          // This would be fetched when loading comments
          return;
        } else if (type === "combination" && sessionId && combinationId) {
          // Fetch combination reactions
          response = await fetch(
            `/your-dreamboard-results/api/combination-reactions?sessionId=${sessionId}&combinationId=${combinationId}`
          );
          
          if (response.ok) {
            const data = await response.json();
            setScopedState(idData, {
              likeCount: data.reaction.likes,
              dislikeCount: data.reaction.dislikes,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch reaction counts:", error);
      }
    };

    fetchReactionCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, commentId, sessionId, combinationId, idData]);

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
  const sendReaction = async (reaction: string) => {
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

    // Determine if this is a like or dislike
    const isLike = ["like", "heart", "smile", "love", "laugh"].includes(reaction);
    const reactionType = isLike ? "like" : "dislike";

    // Optimistically update count based on reaction type
    if (isLike) {
      incrementScopedLikeCount(idData);
    } else {
      incrementScopedDislikeCount(idData);
    }

    // Send to API if type is specified
    if (type) {
      try {
        let response;
        
        if (type === "comment" && commentId) {
          // Add reaction to comment
          response = await fetch(`/your-dreamboard-results/api/comments/${commentId}/reactions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: reactionType }),
          });
        } else if (type === "combination" && sessionId && combinationId) {
          // Add reaction to combination
          response = await fetch("/your-dreamboard-results/api/combination-reactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              combinationId,
              type: reactionType,
            }),
          });
        }

        if (response && response.ok) {
          const data = await response.json();
          
          // Get counts based on response structure
          let likes, dislikes;
          if (type === "combination" && data.reaction) {
            // Combination reactions return { reaction: { likes, dislikes } }
            likes = data.reaction.likes;
            dislikes = data.reaction.dislikes;
          } else {
            // Comment reactions return { likes, dislikes }
            likes = data.likes;
            dislikes = data.dislikes;
          }
          
          // Update with actual counts from server
          console.log(`🎉 Updated reaction counts for ${idData}:`, { likes, dislikes });
          setScopedState(idData, {
            likeCount: likes,
            dislikeCount: dislikes,
          });
          
          // Call callback if provided
          if (onReactionUpdate) {
            onReactionUpdate(likes, dislikes);
          }
        }
      } catch (error) {
        console.error("Failed to send reaction to API:", error);
        // Revert optimistic update on error
        if (isLike) {
          setScopedState(idData, { likeCount: likeCount - 1 });
        } else {
          setScopedState(idData, { dislikeCount: dislikeCount - 1 });
        }
      }
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
