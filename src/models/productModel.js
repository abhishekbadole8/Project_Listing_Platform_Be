const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
      default: [],
    },
    logo_url: {
      type: String,
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
