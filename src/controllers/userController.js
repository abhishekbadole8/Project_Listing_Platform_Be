const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register a user
// @route POST api/user/register
// @access public route
const createUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    //All fields Mandatory
    if (!name || !email || !mobile || !password) {
      throw new Error("All Field's are mandatory !!!");
    }

    //Check User Already Present Or Not
    const isUserValid = await User.findOne({ email });

    //If user already exists
    if (isUserValid) {
      throw new Error("Email already exists");
    }

    // Converting Password to Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

// @desc Login a user
// @route POST api/user/login
// @access public route
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //All fields Mandatory
    if (!email || !password) {
      throw new Error("All Field's are mandatory !!!");
      // res.status(403).send({ message: "All Field's are mandatory !!!" });
    }

    //Check User Already Present Or Not
    const user = await User.findOne({ email });

    // Compare Password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate Token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).send(token);
    } else {
      res.status(400).send({ message: "Email/password Is Invalid" });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

module.exports = { createUser, loginUser };
