const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = "mongodb://127.0.0.1:27017/webServer";
    return mongoose.connect(uri, {});
  } catch (error) {
    console.log("Database not connected Error:", error);
  }
};

module.exports = { connectDB };
