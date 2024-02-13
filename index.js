// Import packages
const express = require("express");
const home = require("./routes/home");


// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/", home);

const productController = require("./product/product.controller");
const userController = require("./product/user.controller");

app.use("/register", userController)
app.use("/products", productController)


// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
