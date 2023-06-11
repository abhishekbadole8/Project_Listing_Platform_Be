const  mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error Connecting Database",error);
  }
};

module.exports = connectDb;
