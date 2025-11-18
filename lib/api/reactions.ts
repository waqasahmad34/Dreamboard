// Types for combination reactions
export type CombinationReaction = {
  id: string;
  sessionId: string;
  combinationId: string;
  likes: number;
  dislikes: number;
};

export type ReactionResponse = {
  success: boolean;
  reaction: CombinationReaction;
  message?: string;
};

export type ErrorResponse = {
  success: false;
  error: string;
  details?: string;
};

// API service functions for combination reactions
export const reactionsApi = {
  /**
   * Fetch reactions for a specific combination
   */
  async getReaction(params: {
    sessionId: string;
    combinationId: string;
  }): Promise<CombinationReaction> {
    const { sessionId, combinationId } = params;
    
    const searchParams = new URLSearchParams({
      sessionId,
      combinationId,
    });

    const response = await fetch(`/your-dreamboard-results/api/combination-reactions?${searchParams.toString()}`);
    
    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.error || 'Failed to fetch reactions');
    }

    const data: ReactionResponse = await response.json();
    return data.reaction;
  },

  /**
   * Add a like or dislike to a combination
   */
  async addReaction(params: {
    sessionId: string;
    combinationId: string;
    type: 'like' | 'dislike';
  }): Promise<CombinationReaction> {
    const response = await fetch('/your-dreamboard-results/api/combination-reactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.error || 'Failed to add reaction');
    }

    const data: ReactionResponse = await response.json();
    return data.reaction;
  },

  /**
   * Remove a like or dislike from a combination
   */
  async removeReaction(params: {
    sessionId: string;
    combinationId: string;
    type: 'like' | 'dislike';
  }): Promise<CombinationReaction> {
    const response = await fetch('/your-dreamboard-results/api/combination-reactions', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error: ErrorResponse = await response.json();
      throw new Error(error.error || 'Failed to remove reaction');
    }

    const data: ReactionResponse = await response.json();
    return data.reaction;
  },
};

