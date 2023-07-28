const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

const connectDb = require("./src/config/dbConnection");
const authRoute = require("./src/routes/authRoute");
const productRoute = require("./src/routes/productRoute");
connectDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); // CORS middleware

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);

app.listen(port, () => {
  console.log(`Server Listening To Port: ${port}`);
});
