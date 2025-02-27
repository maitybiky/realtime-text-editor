const mongoose = require("mongoose");
require("dotenv").config();

// const MONGODB_URI = process.env.MONGO_URI;
const MONGODB_URI = `mongodb+srv://mukeshguptagraymirror:bikikutta007@cluster0.mcqay.mongodb.net/gdocs?retryWrites=true&w=majority`;
console.log("MONGODB_URI", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose)
      .catch((err) => console.log("err :>> ", err));
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
module.exports = connectToDatabase;
