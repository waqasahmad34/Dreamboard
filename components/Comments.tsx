"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";

dayjs.extend(relativeTime);

import { Button } from "@/components/ui/button";
import { useInfiniteCommentsQuery, useCommentCountQuery } from "@/queries/comments.queries";
import { useCreateCommentMutation } from "@/queries/comments.mutations";
import { cn } from "@/lib/utils";
import FloatingReactions from "./Grids/GridImagesAnimated/SocialReactions/FloatingReactions";
import SocialReactions from "./Grids/GridImagesAnimated/SocialReactions/SocialReactions";
import { LuSendHorizontal } from "react-icons/lu";
import { Loader2 } from "lucide-react";

type TComponentProps = {
  className?: string;
  onAddComment?: (content: string) => void;
  showAddForm?: boolean;
  showCount?: boolean; // Whether to show total comment count in header
  currentUserName?: string;
  sortOrder?: "asc" | "desc";
  data?: Record<string, any>;
  sessionId?: string;
  combinationId?: string;
};

const Comments = ({
  className,
  onAddComment,
  showAddForm = true,
  showCount = false,
  currentUserName = "You",
  sortOrder = "desc", // Changed to desc - newest comments first
  data,
  sessionId,
  combinationId = "1",
}: TComponentProps) => {
  // Ensure combinationId is always a string
  const combinationIdString = combinationId ? String(combinationId) : "1";
  
  // Use infinite query for comments with 10 per page
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteCommentsQuery({
    sessionId,
    combinationId: combinationIdString,
    limit: 10,
    enabled: !!sessionId || !!combinationIdString,
  });

  // Get total comment count (optional)
  const { data: totalCount = 0 } = useCommentCountQuery({
    sessionId,
    combinationId: combinationIdString,
    enabled: showCount && (!!sessionId || !!combinationIdString),
  });

  // Create comment mutation
  const createCommentMutation = useCreateCommentMutation();

  // Local state for form input
  const [newComment, setNewComment] = useState("");
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Intersection observer for infinite scroll
  const { ref: infiniteScrollRef, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the element is visible
    rootMargin: "100px", // Start loading 100px before the element comes into view
  });

  // Flatten all pages into a single array of comments
  const allComments = useMemo(() => {
    return infiniteData?.pages.flatMap((page) => page.comments) ?? [];
  }, [infiniteData]);

  // Sort comments
  const commentsSorted = useMemo(() => {
    return [...allComments].sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }, [allComments, sortOrder]);

  // Prevent hydration mismatch by only rendering time-based content on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track user scroll to prevent auto-triggering on mount
  useEffect(() => {
    const container = commentsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setHasScrolled(true);
    };

    container.addEventListener('scroll', handleScroll, { once: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-fetch next page when scroll sentinel comes into view
  // Only trigger after user has scrolled at least once
  useEffect(() => {
    if (hasScrolled && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasScrolled, inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const formatDate = (date: Date | string) => {
    if (!isClient) {
      // Return a static format during SSR to prevent hydration mismatch
      return dayjs(date).format('MMM D, YYYY');
    }
    return dayjs(date).fromNow();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || createCommentMutation.isPending) return;

    try {
      // Generate unique ID
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 9);
      const id = `comment_${timestamp}_${random}`;

      await createCommentMutation.mutateAsync({
        id,
        author: currentUserName,
        content: newComment.trim(),
        sessionId,
        combinationId: combinationIdString,
      });
      
      // Call external handler if provided
      if (onAddComment) {
        await onAddComment(newComment.trim());
      }

      // Clear the input
      setNewComment("");
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  // Note: Removed auto-scroll effect to prevent triggering intersection observer
  // and to keep the view at the top showing latest comments
  // If you need to scroll to a specific comment, implement it manually when needed

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
      suppressHydrationWarning
    >
      {/* Comments Header */}
      {showCount && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">
            Comments ({totalCount})
          </h3>
        </div>
      )}

      {/* Comments List */}
      <div
        ref={commentsContainerRef}
        className={cn(
          "grow",
          "space-y-4 pr-[5px]",
          "overflow-x-hidden",
          "overflow-y-scroll",
          "scrollbar-rounded-track",
          "overflow-y-scroll"
          // 'overflow-x-visible',
          // 'max-w-[217px]',
        )}
      >
        {isLoading ? (
          <motion.div
            className="py-8 text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin" />
            <p>Loading comments...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            className="py-8 text-center text-red-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>Error loading comments. Please try again.</p>
          </motion.div>
        ) : commentsSorted.length === 0 ? (
          <motion.div
            className="py-8 text-center text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>No comments yet. Be the first to comment!</p>
          </motion.div>
        ) : (
          <>
            {commentsSorted.map((comment, index) => (
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
                      type="comment"
                      commentId={comment.id}
                      initialLikes={comment.likes || 0}
                      initialDislikes={comment.dislikes || 0}
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
            ))}

          {/* Infinite Scroll Sentinel & Loading Indicator */}
          {hasNextPage && (
            <div ref={infiniteScrollRef} className="py-4 text-center">
              {isFetchingNextPage && (
                <motion.div
                  className="flex items-center justify-center gap-2 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading more comments...</span>
                </motion.div>
              )}
            </div>
          )}
          </>
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
            disabled={createCommentMutation.isPending}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!newComment?.trim() || createCommentMutation.isPending}
              size="sm"
              className="cursor-pointer sm:h-8 h-11"
            >
              <span className="sm:block hidden">
                {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
              </span>
              <span className="sm:hidden block">
                {createCommentMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
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
