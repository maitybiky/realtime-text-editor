import mongoose from "mongoose";

const MONGODB_URI = process.env.Next_PUBLIC_MONGO_URI;
console.log('MONGODB_URI', MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose).catch((err)=>console.log('err :>> ', err));
  }

  cached.conn = await cached.promise;
  return cached.conn;
}