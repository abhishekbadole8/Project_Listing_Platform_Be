const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const connectDb = require("./src/config/dbConnection");
const userRoutes = require("./src/routes/userRoutes");
const productRoute = require("./src/routes/productRoute");
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // CORS middleware

app.use("/api/user", userRoutes);
app.use("/api/product", productRoute);

app.listen(port, () => {
  console.log(`Server Listening To Port: ${port}`);
});
