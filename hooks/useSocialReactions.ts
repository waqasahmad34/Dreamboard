// Re-export the UI state management hook from the provider
// This is for floating reactions animations and UI state only
// For data fetching (likes/dislikes counts), use the queries and mutations directly:
// - useReactionQuery from '@/queries/reactions.queries'
// - useAddReactionMutation, useRemoveReactionMutation from '@/queries/reactions.mutations'

export { useSocialReactions } from '@/providers/SocialReactionsProvider';

