/**
 * Migration: Create Comments Collection
 * 
 * This migration creates the 'comments' collection with:
 * - Schema validation
 * - Indexes for performance
 * - Initial seed data (optional)
 */

import { getDatabase } from "../mongodb";
import type { Db } from "mongodb";

export async function createCommentsCollection() {
	try {
		const db: Db = await getDatabase();

		// Check if collection already exists
		const collections = await db.listCollections({ name: "comments" }).toArray();
		
		if (collections.length > 0) {
			console.log("✅ Comments collection already exists");
			return { success: true, message: "Collection already exists" };
		}

		// Create the collection with schema validation
		await db.createCollection("comments", {
			validator: {
				$jsonSchema: {
					bsonType: "object",
					required: ["id", "author", "content", "timestamp", "createdAt"],
					properties: {
						id: {
							bsonType: "string",
							description: "Unique comment ID (UUID) is required",
							minLength: 1,
						},
						author: {
							bsonType: "string",
							description: "Author name is required and must be a string",
							minLength: 1,
							maxLength: 100,
						},
						content: {
							bsonType: "string",
							description: "Comment content is required and must be a string",
							minLength: 1,
							maxLength: 5000,
						},
					timestamp: {
						bsonType: "string",
						description: "ISO 8601 timestamp string is required",
						pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{1,3})?Z?$",
					},
						avatar: {
							bsonType: ["string", "null"],
							description: "Optional avatar URL",
						},
						combinationId: {
							bsonType: ["string", "null"],
							description: "Combination ID to link comment to specific dreamboard combination",
						},
						sessionId: {
							bsonType: ["string", "null"],
							description: "Optional session ID to link comment to specific dreamboard session",
						},
						createdAt: {
							bsonType: "date",
							description: "MongoDB creation date",
						},
						updatedAt: {
							bsonType: "date",
							description: "MongoDB last update date",
						},
						isDeleted: {
							bsonType: "bool",
							description: "Soft delete flag",
						},
						metadata: {
							bsonType: "object",
							description: "Optional metadata object for additional fields",
						},
					},
				},
			},
			validationLevel: "moderate", // Allow updates that don't match schema (for flexibility)
			validationAction: "error", // Reject inserts/updates that don't match schema
		});

		console.log("✅ Comments collection created successfully");

		// Create indexes for better query performance
		const commentsCollection = db.collection("comments");

		// Unique index on id field
		await commentsCollection.createIndex(
			{ id: 1 },
			{ name: "id_unique", unique: true }
		);

		// Index on timestamp for sorting
		await commentsCollection.createIndex(
			{ timestamp: -1 },
			{ name: "timestamp_desc" }
		);

		// Index on combinationId for filtering comments by specific combination
		await commentsCollection.createIndex(
			{ combinationId: 1, timestamp: -1 },
			{ name: "combinationId_timestamp" }
		);

		// Index on sessionId for filtering comments by dreamboard session
		await commentsCollection.createIndex(
			{ sessionId: 1, timestamp: -1 },
			{ name: "sessionId_timestamp" }
		);

		// Index on createdAt for administrative queries
		await commentsCollection.createIndex(
			{ createdAt: -1 },
			{ name: "createdAt_desc" }
		);

		// Index for soft delete queries
		await commentsCollection.createIndex(
			{ isDeleted: 1, timestamp: -1 },
			{ name: "isDeleted_timestamp" }
		);

		console.log("✅ Indexes created successfully");

		return {
			success: true,
			message: "Comments collection and indexes created successfully",
		};
	} catch (error) {
		console.error("❌ Error creating comments collection:", error);
		throw error;
	}
}

/**
 * Seed initial comments (optional)
 */
export async function seedInitialComments() {
	try {
		const db: Db = await getDatabase();
		const commentsCollection = db.collection("comments");

		// Check if comments already exist
		const existingCount = await commentsCollection.countDocuments();
		
		if (existingCount > 0) {
			console.log(`✅ Comments collection already has ${existingCount} documents`);
			return { success: true, message: "Comments already seeded" };
		}

		// Initial seed data
		const seedComments = [
			{
				id: "seed-session_example-1_1725439920000",
				author: "Sarah Johnson",
				content:
					"This design looks absolutely stunning! The color combination is perfect for a modern living room. I love how the textures complement each other.",
				timestamp: new Date("2025-09-14T09:12:00Z").toISOString(),
				avatar:
					"https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=32&h=32&fit=crop&crop=face&auto=format",
				combinationId: "example-1",
				sessionId: "seed-session",
				createdAt: new Date("2025-09-14T09:12:00Z"),
				updatedAt: new Date("2025-09-14T09:12:00Z"),
				isDeleted: false,
			},
			{
				id: "seed-session_example-1_1725421920000",
				author: "Michael Chen",
				content:
					"Great work! The fabric choice is excellent. How long does the delivery usually take for custom orders like this?",
				timestamp: new Date("2025-09-14T04:12:00Z").toISOString(),
				avatar: null,
				combinationId: "example-1",
				sessionId: "seed-session",
				createdAt: new Date("2025-09-14T04:12:00Z"),
				updatedAt: new Date("2025-09-14T04:12:00Z"),
				isDeleted: false,
			},
			{
				id: "seed-session_example-2_1725192000000",
				author: "Emily Rodriguez",
				content:
					"I have been looking for something exactly like this for months! The bohemian style really captures what I was envisioning. Would this work well in a smaller space?",
				timestamp: new Date("2025-09-01T10:00:00Z").toISOString(),
				avatar:
					"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face&auto=format",
				combinationId: "example-2",
				sessionId: "seed-session",
				createdAt: new Date("2025-09-01T10:00:00Z"),
				updatedAt: new Date("2025-09-01T10:00:00Z"),
				isDeleted: false,
			},
			{
				id: "seed-session_example-2_1725192001000",
				author: "David Thompson",
				content:
					"The attention to detail is impressive. Can you share more information about the materials used?",
				timestamp: new Date("2025-09-01T10:00:00Z").toISOString(),
				avatar: null,
				combinationId: "example-2",
				sessionId: "seed-session",
				createdAt: new Date("2025-09-01T10:00:00Z"),
				updatedAt: new Date("2025-09-01T10:00:00Z"),
				isDeleted: false,
			},
			{
				id: "seed-session_example-3_1725192002000",
				author: "Lisa Park",
				content:
					"Wow! This is exactly what I need for my home renovation project. The neutral tones will work perfectly with my existing decor. Bookmarking this for sure! 💫",
				timestamp: new Date("2025-09-01T10:00:00Z").toISOString(),
				avatar:
					"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format",
				combinationId: "example-3",
				sessionId: "seed-session",
				createdAt: new Date("2025-09-01T10:00:00Z"),
				updatedAt: new Date("2025-09-01T10:00:00Z"),
				isDeleted: false,
			},
			{
				id: "seed-session_example-3_1725192003000",
				author: "James Wilson",
				content:
					"Professional quality as always! I have ordered from DreamSofa before and the craftsmanship is consistently excellent. Highly recommend to anyone looking for premium furniture.",
				timestamp: new Date("2025-09-01T10:00:00Z").toISOString(),
				avatar: null,
				combinationId: "example-3",
				sessionId: "seed-session",
				createdAt: new Date("2025-09-01T10:00:00Z"),
				updatedAt: new Date("2025-09-01T10:00:00Z"),
				isDeleted: false,
			},
		];

		const result = await commentsCollection.insertMany(seedComments);

		console.log(`✅ Seeded ${result.insertedCount} initial comments`);

		return {
			success: true,
			message: `Seeded ${result.insertedCount} comments successfully`,
			count: result.insertedCount,
		};
	} catch (error) {
		console.error("❌ Error seeding comments:", error);
		throw error;
	}
}

/**
 * Run the full migration
 */
export async function runCommentsMigration(seedData = false) {
	console.log("🚀 Starting comments migration...");

	try {
		// Step 1: Create collection with schema
		const createResult = await createCommentsCollection();
		console.log(createResult.message);

		// Step 2: Seed initial data (optional)
		if (seedData) {
			const seedResult = await seedInitialComments();
			console.log(seedResult.message);
		}

		console.log("✅ Comments migration completed successfully");
		return { success: true };
	} catch (error) {
		console.error("❌ Migration failed:", error);
		throw error;
	}
}

// If running this file directly
if (require.main === module) {
	runCommentsMigration(true)
		.then(() => {
			console.log("Migration completed");
			process.exit(0);
		})
		.catch((error) => {
			console.error("Migration failed:", error);
			process.exit(1);
		});
}

