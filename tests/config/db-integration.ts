import { MongoMemoryReplSet } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryReplSet;
let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) {
    return;
  }

  try {
    mongoServer = await MongoMemoryReplSet.create({
      replSet: { count: 1, storageEngine: "wiredTiger" },
    });
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
      dbName: "testdb",
    });

    if (global.mongoose) {
      global.mongoose.conn = mongoose;
      global.mongoose.promise = Promise.resolve(mongoose);
    }

    isConnected = true;
  } catch (error) {
    console.error("Failed to connect to integration DB:", error);
    throw error;
  }
}

export async function disconnectDB(): Promise<void> {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    if (mongoServer) {
      await mongoServer.stop();
    }

    if (global.mongoose) {
      global.mongoose.conn = null;
      global.mongoose.promise = null;
    }

    isConnected = false;
  } catch (error) {
    console.error("Error disconnecting integration DB:", error);
    throw error;
  }
}

export async function clearDB(): Promise<void> {
  if (!isConnected) {
    throw new Error("Database not connected");
  }

  try {
    await mongoose.connection.dropDatabase();
  } catch (error) {
    console.error("Error clearing integration DB:", error);
    throw error;
  }
}

export function isDBConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
