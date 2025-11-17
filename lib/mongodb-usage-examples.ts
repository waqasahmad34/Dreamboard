/**
 * MongoDB Usage Examples
 * 
 * This file demonstrates how to use the MongoDB client in your Next.js app.
 * These are example patterns - adapt them to your specific needs.
 */

import { getDatabase } from "./mongodb";
import type { Collection, Document } from "mongodb";

// Example 1: Basic CRUD operations
export async function createDocument(
	collectionName: string,
	document: Document
) {
	const db = await getDatabase();
	const collection = db.collection(collectionName);
	const result = await collection.insertOne(document);
	return result;
}

export async function findDocuments(
	collectionName: string,
	query: Document = {}
) {
	const db = await getDatabase();
	const collection = db.collection(collectionName);
	const documents = await collection.find(query).toArray();
	return documents;
}

export async function findOneDocument(
	collectionName: string,
	query: Document
) {
	const db = await getDatabase();
	const collection = db.collection(collectionName);
	const document = await collection.findOne(query);
	return document;
}

export async function updateDocument(
	collectionName: string,
	query: Document,
	update: Document
) {
	const db = await getDatabase();
	const collection = db.collection(collectionName);
	const result = await collection.updateOne(query, { $set: update });
	return result;
}

export async function deleteDocument(
	collectionName: string,
	query: Document
) {
	const db = await getDatabase();
	const collection = db.collection(collectionName);
	const result = await collection.deleteOne(query);
	return result;
}

// Example 2: Typed collection helper
interface SessionMetadata {
	sessionId: string;
	combinationId: string;
	metadata: Record<string, any>;
	createdAt: Date;
	updatedAt: Date;
}

export async function getSessionsCollection(): Promise<Collection<SessionMetadata>> {
	const db = await getDatabase();
	return db.collection<SessionMetadata>("sessions");
}

// Example 3: Save session metadata to MongoDB
export async function saveSessionMetadata(
	sessionId: string,
	combinationId: string,
	metadata: Record<string, any>
) {
	const collection = await getSessionsCollection();
	
	const result = await collection.updateOne(
		{ sessionId, combinationId },
		{
			$set: {
				metadata,
				updatedAt: new Date(),
			},
			$setOnInsert: {
				sessionId,
				combinationId,
				createdAt: new Date(),
			},
		},
		{ upsert: true }
	);
	
	return result;
}

// Example 4: Retrieve session metadata from MongoDB
export async function getSessionMetadata(
	sessionId: string,
	combinationId: string
) {
	const collection = await getSessionsCollection();
	const session = await collection.findOne({ sessionId, combinationId });
	return session;
}

// Example 5: List all sessions
export async function listSessions(limit = 100, skip = 0) {
	const collection = await getSessionsCollection();
	const sessions = await collection
		.find({})
		.sort({ createdAt: -1 })
		.limit(limit)
		.skip(skip)
		.toArray();
	return sessions;
}

// Example 6: Delete old sessions
export async function deleteOldSessions(daysOld: number) {
	const collection = await getSessionsCollection();
	const cutoffDate = new Date();
	cutoffDate.setDate(cutoffDate.getDate() - daysOld);
	
	const result = await collection.deleteMany({
		createdAt: { $lt: cutoffDate },
	});
	
	return result;
}

// Example 7: Aggregation example
export async function getSessionStats() {
	const collection = await getSessionsCollection();
	
	const stats = await collection
		.aggregate([
			{
				$group: {
					_id: null,
					totalSessions: { $sum: 1 },
					avgCombinations: { $avg: "$combinationId" },
				},
			},
		])
		.toArray();
	
	return stats[0] || { totalSessions: 0, avgCombinations: 0 };
}

// Example 8: Create indexes for better performance
export async function createIndexes() {
	const collection = await getSessionsCollection();
	
	// Create compound index for faster queries
	await collection.createIndex(
		{ sessionId: 1, combinationId: 1 },
		{ unique: true }
	);
	
	// Create index for date-based queries
	await collection.createIndex({ createdAt: -1 });
	
	console.log("✅ Indexes created successfully");
}

