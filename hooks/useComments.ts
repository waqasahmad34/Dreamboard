// Temporary re-export to prevent build errors
// TODO: Update components to use queries and mutations directly:
// - useCommentsQuery from '@/queries/comments.queries'
// - useCreateCommentMutation from '@/queries/comments.mutations'

export { useCommentsContext as useComments } from '@/providers/CommentsProvider';

