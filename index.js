// Import packages
const express = require("express");
const home = require("./routes/home");
const cors = require("cors");

const app = express();

// Use cors middleware to allow requests from any origin
app.use(cors({
    origin: process.env.DEV_ADDRESS,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

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
app.use("/product", productController);
app.use("/transaction", transactionController);
app.use("/me", authController);
// app.use("/logout", logoutController)

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
