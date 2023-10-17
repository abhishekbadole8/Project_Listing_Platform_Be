const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register a new user
// @route POST api/user/register
// @access public
const createUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All field's are mandatory !!!" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(500).json({ message: "User registration failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Login a user
// @route POST api/user/login
// @access public route
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are mandatory!!!" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email/password is invalid" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email/password is invalid" });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createUser, loginUser };
