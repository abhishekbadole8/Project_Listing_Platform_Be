const Product = require("../models/productModel");

// Create Product
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
    // All Fields Check
    if (!title || !category || !logo_url || !product_link || !description) {
      res.status(400);
      throw new Error("All Fields are Mandantory");
    }
    // Create Product Here
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

    res.status(200).send("Product added Successfully");
  } catch (error) {
    res.send({ message: error.message });
  }
};

// Get Product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (error) {
    res.send({ message: error.message });
  }
};

//filter Query
const filterProduct= async (req, res) => {
  try {
    let query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    console.log("Error Getting products", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.send({ message: error.message });
  }
};

//Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedproduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedproduct);
  } catch (error) {
    res.send({ message: error.message });
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedproduct = await Product.findByIdAndDelete(id);
    res.status(200).send("Product Deleted Successfully !!!");
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  filterProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
