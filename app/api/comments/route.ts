import { NextRequest, NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongodb";
import Comment from "@/lib/models/Comment";
import type { TCommentDocument } from "@/types/TComment";

/**
 * GET /api/comments
 * Fetch comments with optional filters
 * Query params:
 *  - sessionId: filter by session
 *  - combinationId: filter by combination
 *  - limit: number of comments to return (default: 50)
 */
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const sessionId = searchParams.get("sessionId");
		const combinationId = searchParams.get("combinationId");
		const limit = Number.parseInt(searchParams.get("limit") || "50", 10);

		// Connect to MongoDB using Mongoose
		await connectMongoose();

		// Build query filter
		const filter: Record<string, unknown> = { isDeleted: false };
		
		if (sessionId) {
			filter.sessionId = sessionId;
		}
		
		if (combinationId) {
			filter.combinationId = String(combinationId); // Ensure string
		}

		// Fetch comments using Mongoose
		const comments = await Comment
			.find(filter)
			.sort({ timestamp: -1 }) // Newest first
			.limit(limit)
			.lean(); // Convert to plain JavaScript objects

		// Convert to client format (remove MongoDB _id, keep our id)
		const clientComments = comments.map((doc) => ({
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
		}));

		return NextResponse.json({
			success: true,
			comments: clientComments,
			count: clientComments.length,
		});
	} catch (error) {
		console.error("❌ Error fetching comments:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to fetch comments",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

/**
 * POST /api/comments
 * Create a new comment
 * Body: { id, author, content, sessionId, combinationId, avatar? }
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		let { id, author, content, sessionId, combinationId, avatar } = body;
		
		// Ensure combinationId is a string (convert if it's a number)
		if (combinationId !== null && combinationId !== undefined) {
			combinationId = String(combinationId);
		}

		// Validation
		if (!id || !author || !content) {
			return NextResponse.json(
				{
					success: false,
					error: "Missing required fields: id, author, content",
				},
				{ status: 400 }
			);
		}

		if (content.trim().length === 0) {
			return NextResponse.json(
				{
					success: false,
					error: "Comment content cannot be empty",
				},
				{ status: 400 }
			);
		}

		if (author.length > 100) {
			return NextResponse.json(
				{
					success: false,
					error: "Author name must be 100 characters or less",
				},
				{ status: 400 }
			);
		}

		if (content.length > 5000) {
			return NextResponse.json(
				{
					success: false,
					error: "Comment content must be 5000 characters or less",
				},
				{ status: 400 }
			);
		}

		// Connect to MongoDB using Mongoose
		await connectMongoose();

		// Check if comment ID already exists
		const existingComment = await Comment.findOne({ id });
		if (existingComment) {
			return NextResponse.json(
				{
					success: false,
					error: "Comment with this ID already exists",
				},
				{ status: 409 }
			);
		}

		// Create comment document using Mongoose
		const commentDocument = {
			id,
			commentId: `${sessionId}_${combinationId}`,
			author: author.trim(),
			content: content.trim(),
			timestamp: new Date().toISOString(), // Format: "2025-11-17T17:24:21.151Z" (with milliseconds)
			avatar: avatar || null,
			combinationId: combinationId || null,
			sessionId: sessionId || null,
			likes: 0,
			dislikes: 0,
			isDeleted: false,
		};

		// Insert into database using Mongoose
		console.log("📝 Attempting to insert comment:", JSON.stringify(commentDocument, null, 2));
		
		const newComment = await Comment.create(commentDocument);

		if (!newComment) {
			throw new Error("Failed to insert comment into database");
		}
		
		console.log("✅ Comment inserted successfully:", newComment._id);

		// Return client-formatted comment
		const clientComment = {
			id: newComment.id,
			commentId: newComment.commentId,
			author: newComment.author,
			content: newComment.content,
			timestamp: newComment.timestamp,
			avatar: newComment.avatar || undefined,
			combinationId: newComment.combinationId || undefined,
			sessionId: newComment.sessionId || undefined,
			likes: newComment.likes || 0,
			dislikes: newComment.dislikes || 0,
		};

		return NextResponse.json(
			{
				success: true,
				comment: clientComment,
				message: "Comment created successfully",
			},
			{ status: 201 }
		);
	} catch (error: any) {
		console.error("❌ Error creating comment:", error);
		
		// Check if it's a Mongoose validation error
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		const isValidationError = error.name === "ValidationError" || errorMessage.includes("validation");
		
		// Log detailed validation error
		if (isValidationError && error.errors) {
			console.error("📋 Validation error details:", JSON.stringify(error.errors, null, 2));
		}
		
		return NextResponse.json(
			{
				success: false,
				error: isValidationError ? "Document failed validation" : "Failed to create comment",
				details: errorMessage,
				validationDetails: isValidationError && error.errors ? error.errors : undefined,
				hint: isValidationError 
					? "The comment data doesn't match schema. Check timestamp format and required fields."
					: undefined,
			},
			{ status: isValidationError ? 400 : 500 }
		);
	}
}

