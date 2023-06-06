const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    email: {
      type: String,
      unique: true,
      Required: true,
    },
    mobile: {
      type: Number,
      Required: true,
    },
    password: {
      type: String,
      Required: true,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
