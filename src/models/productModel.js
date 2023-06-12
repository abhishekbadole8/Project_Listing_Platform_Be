const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      default: [],
      required: true,
    },
    logo_url: {
      type: String,
      required: true,
    },
    product_link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vote: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
