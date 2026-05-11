const mongoose = require("mongoose");
require("dotenv").config();

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected successfully.");
}

module.exports = connectDatabase;
