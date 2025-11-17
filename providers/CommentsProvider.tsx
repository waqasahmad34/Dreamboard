'use client';

import { createContext, type ReactNode, useCallback, useContext, useState } from 'react';
import type { TComment } from '@/types/TComment';

// Static comments that will be shown initially
// const staticComments: TComment[] = [
//   {
//     id: '1',
//     author: 'Sarah Johnson',
//     content:
//       'This design looks absolutely stunning! The color combination is perfect for a modern living room. I love how the textures complement each other.',
//     timestamp: '2025-09-14T09:12:00Z',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face&auto=format',
//   },
//   {
//     id: '2',
//     author: 'Michael Chen',
//     content:
//       'Great work! The fabric choice is excellent. How long does the delivery usually take for custom orders like this?',
//     timestamp: '2025-09-14T04:12:00Z',
//   },
//   {
//     id: '3',
//     author: 'Emily Rodriguez',
//     content:
//       'I have been looking for something exactly like this for months! The bohemian style really captures what I was envisioning. Would this work well in a smaller space?',
//     timestamp: '2025-09-01T10:00:00Z',
//     avatar:
//       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face&auto=format',
//   },
//   {
//     id: '4',
//     author: 'David Thompson',
//     content:
//       'The attention to detail is impressive. Can you share more information about the materials used?',
//     timestamp: '2025-09-01T10:00:00Z',
//   },
//   {
//     id: '5',
//     author: 'Lisa Park',
//     content:
//       'Wow! This is exactly what I need for my home renovation project. The neutral tones will work perfectly with my existing decor. Bookmarking this for sure! 💫',
//     timestamp: '2025-09-01T10:00:00Z',
//     avatar:
//       'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format',
//   },
//   {
//     id: '6',
//     author: 'James Wilson',
//     content:
//       'Professional quality as always! I have ordered from DreamSofa before and the craftsmanship is consistently excellent. Highly recommend to anyone looking for premium furniture.',
//     timestamp: '2025-09-01T10:00:00Z',
//   },
// ];

type CommentsContextType = {
  comments: TComment[];
  addComment: (
    content: string,
    author?: string,
    sessionId?: string,
    combinationId?: string
  ) => Promise<TComment>;
  loadComments: (sessionId?: string, combinationId?: string) => Promise<void>;
  clearComments: () => void;
  isSubmitting: boolean;
  isLoading: boolean;
  commentsCount: number;
};

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined,
);

type CommentsProviderProps = {
  children: ReactNode;
};

export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const [comments, setComments] = useState<TComment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addComment = async (
    content: string,
    author: string = 'You',
    sessionId?: string,
    combinationId?: string,
  ): Promise<TComment> => {
    if (!content.trim()) {
      throw new Error('Comment content cannot be empty');
    }

    setIsSubmitting(true);

    try {
      // Generate unique random commentId
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 9);
      const id = `comment_${timestamp}_${random}`;

      const newComment: TComment = {
        id,
        commentId: `${sessionId}_${combinationId}`,
        author: author.trim(),
        content: content.trim(),
        timestamp: new Date().toISOString(),
        sessionId: sessionId || null,
        combinationId: combinationId || null,
      };

      // Save to MongoDB via API
      const response = await fetch('/your-dreamboard-results/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save comment');
      }

      const data = await response.json();
      const savedComment = data.comment;

      // Add to local state
      setComments((prevComments) => [savedComment, ...prevComments]);
      
      return savedComment;
    } catch (error) {
      console.error('Failed to add comment:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadComments = useCallback(async (sessionId?: string, combinationId?: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (sessionId) params.append('sessionId', sessionId);
      if (combinationId) params.append('combinationId', combinationId);

      const response = await fetch(`/your-dreamboard-results/api/comments?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to load comments');
      }

      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Failed to load comments:', error);
      // Keep static comments on error
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty deps - function doesn't depend on any external values

  const clearComments = () => {
    setComments([]);
  };

  const value: CommentsContextType = {
    comments,
    addComment,
    loadComments,
    clearComments,
    isSubmitting,
    isLoading,
    commentsCount: comments.length,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  if (context === undefined) {
    throw new Error(
      'useCommentsContext must be used within a CommentsProvider',
    );
  }
  return context;
};
