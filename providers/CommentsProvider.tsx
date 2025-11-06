'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';
import type { TComment } from '@/types/TComment';

// Static comments that will be shown initially
const staticComments: TComment[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    content:
      'This design looks absolutely stunning! The color combination is perfect for a modern living room. I love how the textures complement each other.',
    timestamp: '2025-09-14T09:12:00Z',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face&auto=format',
  },
  {
    id: '2',
    author: 'Michael Chen',
    content:
      'Great work! The fabric choice is excellent. How long does the delivery usually take for custom orders like this?',
    timestamp: '2025-09-14T04:12:00Z',
  },
  {
    id: '3',
    author: 'Emily Rodriguez',
    content:
      'I have been looking for something exactly like this for months! The bohemian style really captures what I was envisioning. Would this work well in a smaller space?',
    timestamp: '2025-09-01T10:00:00Z',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face&auto=format',
  },
  {
    id: '4',
    author: 'David Thompson',
    content:
      'The attention to detail is impressive. Can you share more information about the materials used?',
    timestamp: '2025-09-01T10:00:00Z',
  },
  {
    id: '5',
    author: 'Lisa Park',
    content:
      'Wow! This is exactly what I need for my home renovation project. The neutral tones will work perfectly with my existing decor. Bookmarking this for sure! 💫',
    timestamp: '2025-09-01T10:00:00Z',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format',
  },
  {
    id: '6',
    author: 'James Wilson',
    content:
      'Professional quality as always! I have ordered from DreamSofa before and the craftsmanship is consistently excellent. Highly recommend to anyone looking for premium furniture.',
    timestamp: '2025-09-01T10:00:00Z',
  },
];

type CommentsContextType = {
  comments: TComment[];
  addComment: (content: string, author?: string) => Promise<TComment>;
  clearComments: () => void;
  isSubmitting: boolean;
  commentsCount: number;
};

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined,
);

type CommentsProviderProps = {
  children: ReactNode;
};

export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const [comments, setComments] = useState<TComment[]>(staticComments);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addComment = async (
    content: string,
    author: string = 'You',
  ): Promise<TComment> => {
    if (!content.trim()) {
      throw new Error('Comment content cannot be empty');
    }

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newComment: TComment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        author,
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      setComments((prevComments) => [newComment, ...prevComments]);
      return newComment;
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearComments = () => {
    setComments([]);
  };

  const value: CommentsContextType = {
    comments,
    addComment,
    clearComments,
    isSubmitting,
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
