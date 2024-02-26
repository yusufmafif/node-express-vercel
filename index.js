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
const loginController = require("./product/login.controller");
const transactionController = require("./product/transaction.controller");

app.use("/login", loginController)
app.use("/register", userController)
app.use("/products", productController)
app.use("/transaction", transactionController)


// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
