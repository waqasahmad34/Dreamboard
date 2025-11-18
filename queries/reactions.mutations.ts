import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reactionsApi, type CombinationReaction } from '@/lib/api/reactions';
import { reactionsKeys } from './reactions.queries';

/**
 * Hook to add a reaction (like or dislike) with optimistic updates
 * 
 * @example
 * ```tsx
 * const addReaction = useAddReactionMutation();
 * 
 * await addReaction.mutateAsync({
 *   sessionId: 'session-123',
 *   combinationId: 'combo-456',
 *   type: 'like'
 * });
 * ```
 */
export function useAddReactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reactionsApi.addReaction,
    onMutate: async ({ sessionId, combinationId, type }) => {
      // Cancel any outgoing refetches
      const queryKey = reactionsKeys.combination(sessionId, combinationId);
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousReaction = queryClient.getQueryData<CombinationReaction>(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData<CombinationReaction>(queryKey, (old) => {
        if (!old) {
          return {
            id: `${sessionId}_${combinationId}`,
            sessionId,
            combinationId,
            likes: type === 'like' ? 1 : 0,
            dislikes: type === 'dislike' ? 1 : 0,
          };
        }

        return {
          ...old,
          likes: type === 'like' ? old.likes + 1 : old.likes,
          dislikes: type === 'dislike' ? old.dislikes + 1 : old.dislikes,
        };
      });

      // Return a context object with the snapshotted value
      return { previousReaction, queryKey };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousReaction) {
        queryClient.setQueryData(context.queryKey, context.previousReaction);
      }
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({
        queryKey: reactionsKeys.combination(variables.sessionId, variables.combinationId),
      });
    },
  });
}

/**
 * Hook to remove a reaction (unlike or undislike) with optimistic updates
 * 
 * @example
 * ```tsx
 * const removeReaction = useRemoveReactionMutation();
 * 
 * await removeReaction.mutateAsync({
 *   sessionId: 'session-123',
 *   combinationId: 'combo-456',
 *   type: 'like'
 * });
 * ```
 */
export function useRemoveReactionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reactionsApi.removeReaction,
    onMutate: async ({ sessionId, combinationId, type }) => {
      // Cancel any outgoing refetches
      const queryKey = reactionsKeys.combination(sessionId, combinationId);
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousReaction = queryClient.getQueryData<CombinationReaction>(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData<CombinationReaction>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          likes: type === 'like' ? Math.max(0, old.likes - 1) : old.likes,
          dislikes: type === 'dislike' ? Math.max(0, old.dislikes - 1) : old.dislikes,
        };
      });

      // Return a context object with the snapshotted value
      return { previousReaction, queryKey };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousReaction) {
        queryClient.setQueryData(context.queryKey, context.previousReaction);
      }
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({
        queryKey: reactionsKeys.combination(variables.sessionId, variables.combinationId),
      });
    },
  });
}

/**
 * Combined hook for easier usage - handles both add and remove
 * 
 * @example
 * ```tsx
 * const { addReaction, removeReaction, isPending } = useToggleReactionMutation();
 * 
 * await addReaction.mutateAsync({ sessionId, combinationId, type: 'like' });
 * await removeReaction.mutateAsync({ sessionId, combinationId, type: 'like' });
 * ```
 */
export function useToggleReactionMutation() {
  const addReaction = useAddReactionMutation();
  const removeReaction = useRemoveReactionMutation();

  return {
    addReaction,
    removeReaction,
    isPending: addReaction.isPending || removeReaction.isPending,
  };
}

