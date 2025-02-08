const mongoose = require('mongoose');
const url = process.env.MONGO_URI || "mongodb://localhost:27017/bookstore";
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
