import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCommentCountQuery } from "@/queries/comments.queries";
import { useCreateCommentMutation } from "@/queries/comments.mutations";
import cn from "@/utils/cn";

type TBadgeReactionProps = {
  count: number;
  className: string;
};

type TComponentProps = {
  setTab: (tab: number) => void;
  className: string;
  combinationId?: string;
  sessionId?: string;
};

const ButtonComments = ({ setTab, className, combinationId, sessionId }: TComponentProps) => {
  const [isCommentsPopoverOpen, setIsCommentsPopoverOpen] =
    useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
 
  // Ensure IDs are strings
  const combinationIdString = combinationId ? String(combinationId) : undefined;
  const sessionIdString = sessionId ? String(sessionId) : undefined;

  // Use TanStack Query for comment count with automatic caching and refetching
  const { data: commentCount = 0 } = useCommentCountQuery({
    sessionId: sessionIdString,
    combinationId: combinationIdString,
    enabled: !!sessionIdString || !!combinationIdString,
  });

  // Use TanStack Query mutation for creating comments
  const createCommentMutation = useCreateCommentMutation();

  const handleCommentSubmit = async () => {
    if (!commentInput.trim() || createCommentMutation.isPending) return;

    try {
      // Generate unique ID for the comment
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 9);
      const id = `comment_${timestamp}_${random}`;

      await createCommentMutation.mutateAsync({
        id,
        author: 'You',
        content: commentInput.trim(),
        sessionId: sessionIdString,
        combinationId: combinationIdString,
      });
      
      setCommentInput(""); // Clear input after successful submission
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const BadgeReaction = ({ count, className }: TBadgeReactionProps) => {
    return (
      <span
        className={cn(
          "BadgeReaction",
          "absolute",
          "z-[10]",
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
    <Popover
      open={isCommentsPopoverOpen}
      onOpenChange={setIsCommentsPopoverOpen}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "ButtonComments relative",
            "bg-white",
            "p-[10px]",
            "rounded-[16px]",
            "hover:scale-105",
            "hover:bg-white",
            "transition-all duration-300",
            "cursor-pointer",
            className
          )}
          onClick={() => {
            setTab(3);
            setIsCommentsPopoverOpen(true);
          }}
        >
          <MessageCircle
            className={cn("h-[10px] w-[10px] lg:h-[16px] lg:w-[16px]")}
          />
          <BadgeReaction
            count={commentCount}
            className="bg-white text-black shadow-md"
          />
          <span className="sr-only">Comments</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className={cn(
          "w-[400px]",
          "bg-white text-black",
          "px-[20px] py-[20px]",
          "rounded-[16px]",
          "border-0 shadow-lg",
          "bg-white/50 backdrop-blur-[16px]",
          "z-[101]"
        )}
      >
        <div className="flex gap-2">
          <Input
            value={commentInput}
            onChange={(e) => {
              setCommentInput(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            placeholder="What do you think about this design?"
            className={cn("w-full text-[12px] lg:text-[16px]", "bg-white")}
            disabled={createCommentMutation.isPending}
          />
          <button
            type="button"
            onClick={handleCommentSubmit}
            disabled={!commentInput.trim() || createCommentMutation.isPending}
            className={cn(
              "ButtonSendComment",
              "rounded bg-primary px-3 py-1 text-white text-xs transition-colors",
              "hover:bg-primary/80",
              !commentInput.trim() || createCommentMutation.isPending
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            )}
          >
            <LuSendHorizontal />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ButtonComments;
