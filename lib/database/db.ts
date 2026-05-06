import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local',
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const globalCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = globalCache;

export const connectDB = async () => {
  if (globalCache.conn) {
    return globalCache.conn;
  }

  if (!globalCache.promise) {
    console.log('Connecting to MongoDB...');
    globalCache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: 'job-tracker',
    });
  }

  globalCache.conn = await globalCache.promise;
  console.log('MongoDB connected');

  return globalCache.conn;
};
