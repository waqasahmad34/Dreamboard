import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { commentsApi } from '@/lib/api/comments';

// Query keys factory
export const commentsKeys = {
  all: ['comments'] as const,
  lists: () => [...commentsKeys.all, 'list'] as const,
  list: (filters: { sessionId?: string; combinationId?: string }) => 
    [...commentsKeys.lists(), filters] as const,
  details: () => [...commentsKeys.all, 'detail'] as const,
  detail: (id: string) => [...commentsKeys.details(), id] as const,
  counts: () => [...commentsKeys.all, 'count'] as const,
  count: (filters: { sessionId?: string; combinationId?: string }) =>
    [...commentsKeys.counts(), filters] as const,
};

/**
 * Hook to fetch comments with optional filters
 * 
 * @example
 * ```tsx
 * const { data: comments, isLoading } = useCommentsQuery({
 *   sessionId: 'session-123',
 *   combinationId: 'combo-456',
 *   enabled: true
 * });
 * ```
 */
export function useCommentsQuery(params?: {
  sessionId?: string;
  combinationId?: string;
  limit?: number;
  enabled?: boolean;
}) {
  const { sessionId, combinationId, limit, enabled = true } = params || {};

  return useQuery({
    queryKey: commentsKeys.list({ sessionId, combinationId }),
    queryFn: () => commentsApi.getComments({ sessionId, combinationId, limit }),
    enabled,
    staleTime: 30 * 1000, // 30 seconds - comments are relatively fresh
    gcTime: 5 * 60 * 1000, // 5 minutes cache time
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // Wait 1 second between retries
  });
}

/**
 * Hook to fetch comment count for a specific combination
 * 
 * @example
 * ```tsx
 * const { data: count, isLoading } = useCommentCountQuery({
 *   sessionId: 'session-123',
 *   combinationId: 'combo-456',
 *   enabled: true
 * });
 * ```
 */
export function useCommentCountQuery(params?: {
  sessionId?: string;
  combinationId?: string;
  enabled?: boolean;
}) {
  const { sessionId, combinationId, enabled = true } = params || {};

  return useQuery({
    queryKey: commentsKeys.count({ sessionId, combinationId }),
    queryFn: async () => {
      // Use the infinite comments API to get the total count
      const response = await commentsApi.getInfiniteComments({ 
        sessionId, 
        combinationId,
        limit: 1, // Only need 1 comment to get the total count
      });
      return response.count; // This is the total count from the API
    },
    enabled: enabled && (!!sessionId || !!combinationId),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // Wait 1 second between retries
    placeholderData: 0, // Show 0 while loading
  });
}

/**
 * Hook to fetch comments with infinite scroll/pagination support
 * 
 * @example
 * ```tsx
 * const {
 *   data,
 *   fetchNextPage,
 *   hasNextPage,
 *   isFetchingNextPage,
 *   isLoading,
 * } = useInfiniteCommentsQuery({
 *   sessionId: 'session-123',
 *   combinationId: 'combo-456',
 *   limit: 10,
 *   enabled: true
 * });
 * 
 * // Access all comments from all pages
 * const allComments = data?.pages.flatMap(page => page.comments) ?? [];
 * 
 * // Load more
 * <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
 *   Load More
 * </button>
 * ```
 */
export function useInfiniteCommentsQuery(params?: {
  sessionId?: string;
  combinationId?: string;
  limit?: number;
  enabled?: boolean;
}) {
  const { sessionId, combinationId, limit = 10, enabled = true } = params || {};

  return useInfiniteQuery({
    queryKey: commentsKeys.list({ sessionId, combinationId }),
    queryFn: ({ pageParam }) => 
      commentsApi.getInfiniteComments({
        sessionId,
        combinationId,
        limit,
        pageParam,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      // Return the next cursor if there are more pages, otherwise undefined to stop
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
    enabled,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
}

