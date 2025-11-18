import type { ObjectId } from "mongodb";

// Client-side comment type (used in UI)
export type TComment = {
  id: string;
  commentId: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
  combinationId?: string | null;
  sessionId?: string | null;
  likes?: number;
  dislikes?: number;
};

// MongoDB document type (includes database-specific fields)
export type TCommentDocument = {
  _id?: ObjectId;
  id: string; // Unique comment ID (separate from MongoDB _id)
  commentId: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string | null;
  combinationId?: string | null;
  sessionId?: string | null;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  metadata?: Record<string, unknown>;
};

// Helper to convert MongoDB document to client comment
export function toClientComment(doc: TCommentDocument): TComment {
  return {
    id: doc.id,
    commentId: doc.commentId,
    author: doc.author,
    content: doc.content,
    timestamp: doc.timestamp,
    avatar: doc.avatar || undefined,
    combinationId: doc.combinationId || undefined,
    sessionId: doc.sessionId || undefined,
    likes: doc.likes || 0,
    dislikes: doc.dislikes || 0,
  };
}
