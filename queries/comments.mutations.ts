import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi, type CommentsResponse } from '@/lib/api/comments';
import type { TComment } from '@/types/TComment';
import { commentsKeys } from './comments.queries';

/**
 * Hook to create a new comment with optimistic updates
 * 
 * @example
 * ```tsx
 * const createComment = useCreateCommentMutation();
 * 
 * await createComment.mutateAsync({
 *   id: 'comment-123',
 *   author: 'John Doe',
 *   content: 'Great design!',
 *   sessionId: 'session-123',
 *   combinationId: 'combo-456'
 * });
 * ```
 */
export function useCreateCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentsApi.createComment,
    onMutate: async (newComment) => {
      const filters = {
        sessionId: newComment.sessionId,
        combinationId: newComment.combinationId,
      };
      
      // Cancel any outgoing refetches for both list and count
      const listQueryKey = commentsKeys.list(filters);
      const countQueryKey = commentsKeys.count(filters);
      
      await queryClient.cancelQueries({ queryKey: listQueryKey });
      await queryClient.cancelQueries({ queryKey: countQueryKey });

      // Type for infinite query data
      type InfiniteData = {
        pages: CommentsResponse[];
        pageParams: (string | null)[];
      };

      // Snapshot the previous values for infinite query
      const previousInfiniteData = queryClient.getQueryData<InfiniteData>(listQueryKey);
      const previousCount = queryClient.getQueryData<number>(countQueryKey);

      // Optimistically update the infinite query (add to first page)
      const optimisticComment: TComment = {
        ...newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        commentId: `${newComment.sessionId}_${newComment.combinationId}`,
      };

      queryClient.setQueryData<InfiniteData>(listQueryKey, (old) => {
        if (!old || !old.pages || !old.pages[0]) {
          // No pages yet, create first page with the new comment
          return {
            pages: [{
              success: true,
              comments: [optimisticComment],
              count: 1,
              pageCount: 1,
              hasMore: false,
              nextCursor: null,
            }],
            pageParams: [null],
          };
        }

        // Add comment to the first page
        return {
          ...old,
          pages: old.pages.map((page, index) => {
            if (index === 0) {
              return {
                ...page,
                comments: [optimisticComment, ...page.comments],
                count: page.count + 1,
                pageCount: (page.pageCount || page.comments.length) + 1,
              };
            }
            return page;
          }),
        };
      });

      // Optimistically update the count
      queryClient.setQueryData<number>(countQueryKey, (old) => {
        return (old || 0) + 1;
      });

      // Return a context object with the snapshotted values
      return { previousInfiniteData, previousCount, listQueryKey, countQueryKey };
    },
    onError: (err, newComment, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context) {
        if (context.previousInfiniteData) {
          queryClient.setQueryData(context.listQueryKey, context.previousInfiniteData);
        }
        if (context.previousCount !== undefined) {
          queryClient.setQueryData(context.countQueryKey, context.previousCount);
        }
      }
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success to ensure we have the latest data
      const filters = {
        sessionId: variables.sessionId,
        combinationId: variables.combinationId,
      };
      
      // Invalidate both the comments list and the count
      queryClient.invalidateQueries({
        queryKey: commentsKeys.list(filters),
      });
      queryClient.invalidateQueries({
        queryKey: commentsKeys.count(filters),
      });
      
      // Also invalidate all counts queries if no specific filter provided
      if (!variables.sessionId && !variables.combinationId) {
        queryClient.invalidateQueries({
          queryKey: commentsKeys.counts(),
        });
      }
    },
  });
}

/**
 * Hook to update comment reactions (likes/dislikes) with optimistic updates
 * 
 * @example
 * ```tsx
 * const updateReaction = useUpdateCommentReactionMutation();
 * 
 * await updateReaction.mutateAsync({
 *   commentId: 'comment-123',
 *   type: 'like',
 *   action: 'add'
 * });
 * ```
 */
export function useUpdateCommentReactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      type,
      action,
    }: {
      commentId: string;
      type: 'like' | 'dislike';
      action: 'add' | 'remove';
    }) => commentsApi.updateCommentReaction(commentId, type, action),
    onMutate: async ({ commentId, type, action }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: commentsKeys.lists() });

      // Snapshot the previous value
      const previousData = queryClient.getQueriesData<TComment[]>({
        queryKey: commentsKeys.lists(),
      });

      // Optimistically update all comment lists
      queryClient.setQueriesData<TComment[]>(
        { queryKey: commentsKeys.lists() },
        (old) => {
          if (!old) return old;
          return old.map((comment) => {
            if (comment.id === commentId) {
              const delta = action === 'add' ? 1 : -1;
              return {
                ...comment,
                likes: type === 'like' 
                  ? Math.max(0, (comment.likes || 0) + delta)
                  : comment.likes || 0,
                dislikes: type === 'dislike'
                  ? Math.max(0, (comment.dislikes || 0) + delta)
                  : comment.dislikes || 0,
              };
            }
            return comment;
          });
        }
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, roll back all changes
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData(queryKey, data);
        }
      }
    },
    onSettled: () => {
      // Refetch all comment lists and counts after mutation
      // This ensures UI shows updated like/dislike counts
      queryClient.invalidateQueries({ queryKey: commentsKeys.lists() });
      // No need to invalidate counts here as they don't change with reactions
    },
  });
}

