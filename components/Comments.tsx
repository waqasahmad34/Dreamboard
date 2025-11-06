"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

dayjs.extend(relativeTime);

import { FaShare } from "react-icons/fa";
import ButtonGlassed from "@/components/Buttons/ButtonGlassed";
import { Button } from "@/components/ui/button";
import { useComments } from "@/hooks/useComments";
import { cn } from "@/lib/utils";
import FloatingReactions from "./Grids/GridImagesAnimated/SocialReactions/FloatingReactions";
import SocialReactions from "./Grids/GridImagesAnimated/SocialReactions/SocialReactions";
import { LuSendHorizontal } from "react-icons/lu";
import { Loader2 } from "lucide-react";

type TComponentProps = {
  className?: string;
  onAddComment?: (content: string) => void;
  showAddForm?: boolean;
  currentUserName?: string;
  sortOrder?: "asc" | "desc";
  data?: Record<string, any>;
};

const Comments = ({
  className,
  onAddComment,
  showAddForm = true,
  currentUserName = "You",
  sortOrder = "asc",
  data,
}: TComponentProps) => {
  const {
    comments: commentsSorted,
    newComment,
    setNewComment,
    isSubmitting,
    handleSubmit,
  } = useComments({
    sortOrder,
    onAddComment,
    currentUserName,
  });

  const commentsContainerRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date | string) => {
    return dayjs(date).fromNow();
  };

  // Scroll to bottom when new comments are added
  useEffect(() => {
    if (commentsContainerRef.current && commentsSorted.length > 0) {
      // Use setTimeout to ensure the DOM has updated after the animation
      setTimeout(() => {
        commentsContainerRef.current?.scrollTo({
          top: commentsContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [commentsSorted.length]);

  return (
    <div
      className={cn(
        "Comments",
        "w-full space-y-6",
        "p-[15px]",
        "rounded-[16px]",
        "relative",
        "h-full",
        "flex flex-col",
        className
      )}
    >
      {/* Comments Header */}
      {/* <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Comments ({comments.length})</h3>
      </div> */}

      {/* Comments List */}
      <div
        ref={commentsContainerRef}
        className={cn(
          "grow",
          "space-y-4 pr-[5px]",
          "overflow-x-hidden",
          "overflow-y-scroll"
          // 'overflow-x-visible',
          // 'max-w-[217px]',
        )}
      >
        {commentsSorted.length === 0 ? (
          <motion.div
            className="py-8 text-center text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>No comments yet. Be the first to comment!</p>
          </motion.div>
        ) : (
          commentsSorted.map((comment, index) => {
            // Debug: Check if comment.id exists
            console.log("Comment ID:", comment.id, "Type:", typeof comment.id);
            return (
              <motion.div
                key={comment.id}
                className="flex gap-[6px] rounded-lg border bg-gray-200 p-[10px] lg:gap-[12px] lg:p-[16px]"
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Comment Content */}
                <div className={cn("relative min-w-0 flex-1")}>
                  <div
                    className={cn(
                      "flex flex-wrap items-center",
                      "gap-[6px]",
                      "mb-[10px]"
                    )}
                  >
                    <div className="flex-shrink-0">
                      {comment.avatar ? (
                        // <Image
                        //   src={comment.avatar}
                        //   alt={comment.author}
                        //   className="h-8 w-8 rounded-full"
                        // />
                        <div className="h-8 w-8 rounded-full bg-primary/10" />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <span className="font-medium text-primary text-xs">
                            {comment.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-sm">
                      {comment.author}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {formatDate(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-[1.3] max-w-[300px] text-wrap break-words">
                    {comment.content}
                  </p>

                  <div className={cn("mt-[20px] flex items-center gap-[10px]")}>
                    <SocialReactions
                      className={cn(
                        "flex-row"
                        // 'fixed',
                        // 'left-[0px] bottom-[0px]',
                      )}
                      classNameSocialReactionsList={cn(
                        "top-[-50px] left-[0px]",
                        "lg:right-auto lg:left-[-13px] lg:translate-x-0 lg:top-[-40px]",
                        "!gap-[5px] !p-[5px]",
                        "bg-white/85"
                      )}
                      classNameReactionItem={cn("!text-[15px]")}
                      classNameFloatingIcon="text-[20px]"
                      idData={`comment-state-${comment.id || "unknown"}`}
                      idAnimation={`comment-animation-${
                        comment.id || "unknown"
                      }`}
                    />
                    {/* <ButtonGlassed onClick={() => () => {}}>
                    <FaShare
                      className={cn('text-gray-500 drop-shadow-lg')}
                      size={16}
                    />
                    <span className="sr-only">Share</span>
                  </ButtonGlassed> */}
                  </div>

                  <FloatingReactions
                    duration={6}
                    className="pointer-events-none absolute inset-0"
                    id={`comment-animation-${comment.id || "unknown"}`}
                  />
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Add Comment Form */}
      {showAddForm && (
        <motion.form
          onSubmit={handleSubmit}
          className={cn(
            "space-y-3 sm:block flex items-center gap-1 justify-between"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className={cn(
              "sm:h-[50px] h-11 lg:min-h-[80px] sm:mb-4 mb-0",
              "w-full",
              "max-w-full",
              "bg-background",
              "sm:p-3 p-2 text-sm",
              "rounded-md",
              "placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring",
              "resize-none border border-input"
            )}
            disabled={isSubmitting}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              size="sm"
              className="cursor-pointer sm:h-8 h-11"
            >
              <span className="sm:block hidden">
                {isSubmitting ? "Posting..." : "Post Comment"}
              </span>
              <span className="sm:hidden block">
                {isSubmitting ? (
                  <Loader2 size={16} />
                ) : (
                  <LuSendHorizontal size={16} />
                )}
              </span>
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default Comments;
