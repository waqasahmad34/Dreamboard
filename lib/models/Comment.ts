import mongoose, { Schema, Model, Document } from "mongoose";

// Mongoose document type
export interface ICommentDocument extends Document {
  id: string;
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
}

// Define the Comment schema
const CommentSchema = new Schema<ICommentDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    commentId: {
      type: String,
      required: true,
      index: true,
    },
    author: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000,
      trim: true,
    },
    timestamp: {
      type: String,
      required: true,
      index: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    combinationId: {
      type: String,
      default: null,
      index: true,
    },
    sessionId: {
      type: String,
      default: null,
      index: true,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "comments",
  }
);

// Create indexes for better query performance
CommentSchema.index({ sessionId: 1, combinationId: 1 });
CommentSchema.index({ isDeleted: 1, timestamp: -1 });

// Prevent model recompilation in development (Next.js hot reload)
const Comment: Model<ICommentDocument> = 
  mongoose.models.Comment || mongoose.model<ICommentDocument>("Comment", CommentSchema);

export default Comment;

