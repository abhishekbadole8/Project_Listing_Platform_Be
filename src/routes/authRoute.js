const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/userController");
const authTokenHandler = require("../middlewares/authHandler");

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
