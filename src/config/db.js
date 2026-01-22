const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(" Connecting to MongoDB...");
    console.log("db",process.env.MONGO_URI),
  await mongoose.connect(process.env.MONGO_URI, {

    
    serverSelectionTimeoutMS: 5000, // ⏱️ prevent hanging
  });
};

module.exports = connectDB;
