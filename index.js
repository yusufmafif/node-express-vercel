// Import packages
const express = require("express");
const home = require("./routes/home");

const app = express();

// Use cors middleware to allow requests from any origin
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://belajarexpress.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", " Content-Type, Authorization");
    next();
});

// Routes
// Middlewares
app.use(express.json());
app.use("/", home);

const productController = require("./product/product.controller");
const productsController = require("./product/products.controller");
const userController = require("./product/user.controller");
const registerController = require("./product/register.controller");
const loginController = require("./product/login.controller");
const transactionController = require("./product/transaction.controller");
const authController = require("./product/auth.controller");
const logoutController = require("./product/logout.controller");

app.use("/login", loginController);
app.use("/register", registerController);
app.use("/users", userController);
app.use("/products", productsController);
app.use("/item", productController);
app.use("/transaction", transactionController);
app.use("/me", authController);
// app.use("/logout", logoutController)

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
