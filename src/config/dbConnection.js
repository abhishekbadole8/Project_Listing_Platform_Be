const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = connectDb;
