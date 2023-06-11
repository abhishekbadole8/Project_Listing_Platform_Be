const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv").config();
const BASE_URL = process.env.BASE_URL || 5000;
const bodyParser = require("body-parser");

const connectDb = require("./src/config/dbConnection");
const authRoute = require("./src/routes/authRoute");
const productRoute = require("./src/routes/productRoute");
connectDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
//-----------------

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);

app.listen(port, () => {
  console.log(`Server Listening To Port: ${port}`);
});
