const Product = require("../models/productModel");

// @desc Create a new product
// @route POST api/products
// @access Private

const createProduct = async (req, res) => {
  try {
    const {
      title,
      category,
      logo_url,
      product_link,
      description,
      vote,
      comments,
    } = req.body;

    // Check if all required fields are provided
    if (!title || !category || !logo_url || !product_link || !description) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // Create the product
    const product = await Product.create({
      user_id: req.id,
      title,
      category,
      logo_url,
      product_link,
      description,
      vote,
      comments,
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a product by ID.
// @route GET /api/products/:id
// @access Public

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products, optionally filtered by category.
// @route GET /api/products
// @access Public

const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = { $in: category.split(",") };
    }
    const products = await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a product by ID.
// @route PUT /api/products/:id
// @access Public

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a product by ID.
// @route DELETE /api/products/:id
// @access Public

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
