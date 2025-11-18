import { useQuery } from '@tanstack/react-query';
import { reactionsApi } from '@/lib/api/reactions';

// Query keys factory
export const reactionsKeys = {
  all: ['reactions'] as const,
  combinations: () => [...reactionsKeys.all, 'combination'] as const,
  combination: (sessionId: string, combinationId: string) =>
    [...reactionsKeys.combinations(), { sessionId, combinationId }] as const,
};

/**
 * Hook to fetch reactions for a specific combination
 * 
 * @example
 * ```tsx
 * const { data: reaction, isLoading } = useReactionQuery({
 *   sessionId: 'session-123',
 *   combinationId: 'combo-456',
 *   enabled: true
 * });
 * ```
 */
export function useReactionQuery(params: {
  sessionId: string;
  combinationId: string;
  enabled?: boolean;
}) {
  const { sessionId, combinationId, enabled = true } = params;

  return useQuery({
    queryKey: reactionsKeys.combination(sessionId, combinationId),
    queryFn: () => reactionsApi.getReaction({ sessionId, combinationId }),
    enabled: enabled && !!sessionId && !!combinationId,
    staleTime: 30 * 1000, // 30 seconds - keep consistent with comments
    gcTime: 5 * 60 * 1000, // 5 minutes cache time
    retry: 2, // Retry failed requests twice
    retryDelay: 1000, // Wait 1 second between retries
    // Return default values if no data exists yet
    placeholderData: {
      id: `${sessionId}_${combinationId}`,
      sessionId,
      combinationId,
      likes: 0,
      dislikes: 0,
    },
  });
}

