export type TCombinationReaction = {
  id: string;
  sessionId: string;
  combinationId: string;
  likes: number;
  dislikes: number;
};

export type TCombinationReactionDocument = TCombinationReaction & {
  createdAt: Date;
  updatedAt: Date;
};

