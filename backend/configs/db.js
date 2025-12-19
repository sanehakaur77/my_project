const mongoose = require("mongoose");

const URL = process.env.URL;

const connectDB = async () => {
  console.log(URL);
  try {
    await mongoose.connect(
      "mongodb+srv://saneha:saneha9988@cluster0.0ru6d5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Error connecting to database:", err);
  }
};
module.exports = connectDB;
