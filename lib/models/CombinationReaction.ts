import mongoose, { Schema, Model, Document } from "mongoose";

// Mongoose document type
export interface ICombinationReactionDocument extends Document {
  id: string;
  sessionId: string;
  combinationId: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the CombinationReaction schema
const CombinationReactionSchema = new Schema<ICombinationReactionDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    combinationId: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "combination_reactions",
  }
);

// Create compound unique index on sessionId + combinationId
CombinationReactionSchema.index({ sessionId: 1, combinationId: 1 }, { unique: true });

// Prevent model recompilation in development (Next.js hot reload)
const CombinationReaction: Model<ICombinationReactionDocument> = 
  mongoose.models.CombinationReaction || 
  mongoose.model<ICombinationReactionDocument>("CombinationReaction", CombinationReactionSchema);

export default CombinationReaction;

