'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

// Types
type FloatingReaction = {
  id: number;
  x: number;
  icon: React.ReactNode;
  scopeId: string; // Add scope ID to identify which component the reaction belongs to
};

type ScopedState = {
  isReactionButtonsDisabled: boolean;
  likeCount: number;
  dislikeCount: number;
};

type SocialReactionsContextType = {
  // State
  floatingReactions: FloatingReaction[];
  scopedStates: Record<string, ScopedState>; // Object with ID as key and state as value

  // Actions
  setFloatingReactions: (reactions: FloatingReaction[]) => void;
  setScopedState: (scopeId: string, state: Partial<ScopedState>) => void;

  // Helper functions
  addFloatingReaction: (reaction: FloatingReaction) => void;
  removeFloatingReaction: (id: number) => void;

  // Scoped helper functions
  getFloatingReactionsByScope: (scopeId: string) => FloatingReaction[];
  addScopedFloatingReaction: (
    scopeId: string,
    reaction: Omit<FloatingReaction, 'scopeId'>,
  ) => void;

  // Scoped state functions
  getScopedState: (scopeId: string) => ScopedState;
  initializeScopedState: (scopeId: string) => void;
  incrementScopedLikeCount: (scopeId: string) => void;
  incrementScopedDislikeCount: (scopeId: string) => void;
  setScopedReactionButtonsDisabled: (
    scopeId: string,
    disabled: boolean,
  ) => void;
  resetScopedReactionCounts: (scopeId: string) => void;
};

// Create context
const SocialReactionsContext = createContext<
  SocialReactionsContextType | undefined
>(undefined);

// Provider component
type SocialReactionsProviderProps = {
  children: ReactNode;
};

export const SocialReactionsProvider = ({
  children,
}: SocialReactionsProviderProps) => {
  // State
  const [floatingReactions, setFloatingReactions] = useState<
    FloatingReaction[]
  >([]);
  const [scopedStates, setScopedStates] = useState<Record<string, ScopedState>>(
    {},
  );

  // Helper functions
  const addFloatingReaction = (reaction: FloatingReaction) => {
    setFloatingReactions((prev) => [...prev, reaction]);
  };

  const removeFloatingReaction = (id: number) => {
    setFloatingReactions((prev) =>
      prev.filter((reaction) => reaction.id !== id),
    );
  };

  // Scoped state management
  const setScopedState = (scopeId: string, state: Partial<ScopedState>) => {
    setScopedStates((prev) => ({
      ...prev,
      [scopeId]: {
        ...prev[scopeId],
        ...state,
      },
    }));
  };

  const getScopedState = (scopeId: string): ScopedState => {
    const state = scopedStates[scopeId] || {
      isReactionButtonsDisabled: false,
      likeCount: 0,
      dislikeCount: 0,
    };

    // Ensure all values are valid numbers
    return {
      isReactionButtonsDisabled: Boolean(state.isReactionButtonsDisabled),
      likeCount: typeof state.likeCount === 'number' ? state.likeCount : 0,
      dislikeCount:
        typeof state.dislikeCount === 'number' ? state.dislikeCount : 0,
    };
  };

  const initializeScopedState = (scopeId: string) => {
    if (!scopedStates[scopeId]) {
      setScopedState(scopeId, {
        isReactionButtonsDisabled: false,
        likeCount: 0,
        dislikeCount: 0,
      });
    }
  };

  const incrementScopedLikeCount = (scopeId: string) => {
    const currentState = getScopedState(scopeId);
    const currentLikeCount =
      typeof currentState.likeCount === 'number' ? currentState.likeCount : 0;
    setScopedState(scopeId, { likeCount: currentLikeCount + 1 });
  };

  const incrementScopedDislikeCount = (scopeId: string) => {
    const currentState = getScopedState(scopeId);
    const currentDislikeCount =
      typeof currentState.dislikeCount === 'number'
        ? currentState.dislikeCount
        : 0;
    setScopedState(scopeId, { dislikeCount: currentDislikeCount + 1 });
  };

  const setScopedReactionButtonsDisabled = (
    scopeId: string,
    disabled: boolean,
  ) => {
    setScopedState(scopeId, { isReactionButtonsDisabled: disabled });
  };

  const resetScopedReactionCounts = (scopeId: string) => {
    setScopedState(scopeId, { likeCount: 0, dislikeCount: 0 });
  };

  // Scoped helper functions
  const getFloatingReactionsByScope = (scopeId: string) => {
    return floatingReactions.filter((reaction) => reaction.scopeId === scopeId);
  };

  const addScopedFloatingReaction = (
    scopeId: string,
    reaction: Omit<FloatingReaction, 'scopeId'>,
  ) => {
    const scopedReaction: FloatingReaction = {
      ...reaction,
      scopeId,
    };
    addFloatingReaction(scopedReaction);
  };

  const value: SocialReactionsContextType = {
    // State
    floatingReactions,
    scopedStates,

    // Actions
    setFloatingReactions,
    setScopedState,

    // Helper functions
    addFloatingReaction,
    removeFloatingReaction,

    // Scoped helper functions
    getFloatingReactionsByScope,
    addScopedFloatingReaction,

    // Scoped state functions
    getScopedState,
    initializeScopedState,
    incrementScopedLikeCount,
    incrementScopedDislikeCount,
    setScopedReactionButtonsDisabled,
    resetScopedReactionCounts,
  };

  return (
    <SocialReactionsContext.Provider value={value}>
      {children}
    </SocialReactionsContext.Provider>
  );
};

// Custom hook to use the context
export const useSocialReactions = () => {
  const context = useContext(SocialReactionsContext);
  if (context === undefined) {
    throw new Error(
      'useSocialReactions must be used within a SocialReactionsProvider',
    );
  }
  return context;
};
