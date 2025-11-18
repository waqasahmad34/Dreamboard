import { MongoClient, ServerApiVersion, type Db } from "mongodb";
import mongoose from "mongoose";


const uri = process.env.MONGODB_URI!;
const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	const globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>;
		_mongooseConnection?: typeof mongoose;
	};

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(uri, options);
		globalWithMongo._mongoClientPromise = client.connect();
	}
	clientPromise = globalWithMongo._mongoClientPromise;
} else {
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;


/**
 * Connect to MongoDB using Mongoose
 * Handles connection caching in development to prevent connection overload
 */
export async function connectMongoose(): Promise<typeof mongoose> {
	// Check if already connected
	if (mongoose.connection.readyState === 1) {
		return mongoose;
	}

	const mongooseUri = `${uri}`;

	if (process.env.NODE_ENV === "development") {
		// In development, cache the connection in global to prevent multiple connections
		const globalWithMongo = global as typeof globalThis & {
			_mongooseConnection?: typeof mongoose;
		};

		if (!globalWithMongo._mongooseConnection) {
			globalWithMongo._mongooseConnection = await mongoose.connect(mongooseUri);
			console.log("✅ Mongoose connected to MongoDB (development)");
		}
		return globalWithMongo._mongooseConnection;
	}

	// In production, create a new connection
	await mongoose.connect(mongooseUri);
	console.log("✅ Mongoose connected to MongoDB (production)");
	return mongoose;
}

/**
 * Disconnect Mongoose (useful for testing or graceful shutdown)
 */
export async function disconnectMongoose(): Promise<void> {
	if (mongoose.connection.readyState !== 0) {
		await mongoose.disconnect();
		console.log("✅ Mongoose disconnected from MongoDB");
	}
}

