/**
 * Migration: Update Comments Collection Validation
 * 
 * This updates the timestamp validation pattern to accept ISO 8601 timestamps
 * with milliseconds and timezone (e.g., "2025-11-17T17:24:21.151Z")
 */

import { getDatabase } from "../mongodb";
import type { Db } from "mongodb";

export async function updateCommentsValidation() {
	try {
		const db: Db = await getDatabase();

		console.log("🔄 Updating comments collection validation...");

		// Update collection validation
		await db.command({
			collMod: "comments",
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
			validationLevel: "moderate",
			validationAction: "error",
		});

		console.log("✅ Comments collection validation updated successfully");

		return {
			success: true,
			message: "Validation pattern updated to accept ISO 8601 timestamps with milliseconds",
		};
	} catch (error) {
		console.error("❌ Error updating validation:", error);
		throw error;
	}
}

// If running this file directly
if (require.main === module) {
	updateCommentsValidation()
		.then(() => {
			console.log("Migration completed");
			process.exit(0);
		})
		.catch((error) => {
			console.error("Migration failed:", error);
			process.exit(1);
		});
}

