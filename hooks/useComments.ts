import { useState } from 'react';
import { useCommentsContext } from '@/providers/CommentsProvider';
import type { TComment } from '@/types/TComment';

// Sorting function for comments
const sortComments = (
  comments: TComment[],
  sortOrder: 'asc' | 'desc' = 'desc',
): TComment[] => {
  return [...comments].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();

    if (sortOrder === 'asc') {
      return timeA - timeB; // oldest first
    }
    return timeB - timeA; // newest first (desc)
  });
};

type UseCommentsProps = {
  sortOrder?: 'asc' | 'desc';
  onAddComment?: (content: string) => void;
  currentUserName?: string;
};

export const useComments = ({
  sortOrder = 'asc',
  onAddComment,
  currentUserName = 'You',
}: UseCommentsProps = {}) => {
  const { comments, addComment, isSubmitting, commentsCount } =
    useCommentsContext();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async (content: string) => {
    if (!content.trim()) return;

    try {
      const newCommentObj = await addComment(content, currentUserName);

      // Call external handler if provided
      if (onAddComment) {
        await onAddComment(content.trim());
      }

      return newCommentObj;
    } catch (error) {
      console.error('Failed to add comment:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await handleAddComment(newComment);
    setNewComment('');
  };

  const commentsSorted = sortComments(comments, sortOrder);

  return {
    comments: commentsSorted,
    newComment,
    setNewComment,
    isSubmitting,
    handleSubmit,
    addComment: handleAddComment,
    commentsCount,
  };
};

// Export helper functions for external use
export { sortComments };
