const express = require("express");
const router = express.Router();
const authTokenHandler = require("../middlewares/authHandler");
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  filterProduct,
} = require("../controllers/productController");

router.post("/add", authTokenHandler, createProduct);
router.get("/all", getProducts);
router.get("all", filterProduct);
router.get("/:id", authTokenHandler, getProduct);

router.patch("/:id", updateProduct);
router.delete("/:id", authTokenHandler, deleteProduct);

module.exports = router;
