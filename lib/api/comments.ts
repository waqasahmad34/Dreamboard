import type { TComment } from '@/types/TComment';

// API Response types
export type CommentsResponse = {
  success: boolean;
  comments: TComment[];
  count: number; // Total count of all comments
  pageCount?: number; // Count of comments in this page
  nextCursor?: string | null;
  hasMore?: boolean;
};

export type CommentResponse = {
  success: boolean;
  comment: TComment;
  message?: string;
};

export type ErrorResponse = {
  success: false;
  error: string;
  details?: string;
};

// API service functions
export const commentsApi = {
  /**
   * Fetch comments with optional filters
   */
  async getComments(params?: {
    sessionId?: string;
    combinationId?: string;
    limit?: number;
  }): Promise<TComment[]> {
    const searchParams = new URLSearchParams();
    
    if (params?.sessionId) {
      searchParams.append('sessionId', params.sessionId);
    }
    if (params?.combinationId) {
      searchParams.append('combinationId', params.combinationId);
    }
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }

    const url = `/your-dreamboard-results/api/comments${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.error || 'Failed to fetch comments');
    }

    const data: CommentsResponse = await response.json();
    return data.comments;
  },

  /**
   * Fetch comments with pagination support (for infinite queries)
   */
  async getInfiniteComments(params: {
    sessionId?: string;
    combinationId?: string;
    limit?: number;
    pageParam?: string | null;
  }): Promise<CommentsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.sessionId) {
      searchParams.append('sessionId', params.sessionId);
    }
    if (params.combinationId) {
      searchParams.append('combinationId', params.combinationId);
    }
    if (params.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    if (params.pageParam) {
      searchParams.append('cursor', params.pageParam);
    }

    const url = `/your-dreamboard-results/api/comments${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.error || 'Failed to fetch comments');
    }

    const data: CommentsResponse = await response.json();
    return data;
  },

  /**
   * Create a new comment
   */
  async createComment(comment: {
    id: string;
    author: string;
    content: string;
    sessionId?: string;
    combinationId?: string;
    avatar?: string;
  }): Promise<TComment> {
    const response = await fetch('/your-dreamboard-results/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.error || 'Failed to create comment');
    }

    const data: CommentResponse = await response.json();
    return data.comment;
  },

  /**
   * Update a comment's reactions (likes/dislikes)
   */
  async updateCommentReaction(
    commentId: string,
    type: 'like' | 'dislike',
    action: 'add' | 'remove'
  ): Promise<TComment> {
    const response = await fetch(`/your-dreamboard-results/api/comments/${commentId}/reactions`, {
      method: action === 'add' ? 'POST' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type }),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.error || 'Failed to update comment reaction');
    }

    const data: CommentResponse = await response.json();
    return data.comment;
  },
};

