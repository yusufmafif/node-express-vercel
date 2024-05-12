// Import packages
const express = require("express");
const home = require("./routes/home");
const cors = require("cors");

// Middlewares
const app = express();
app.use(express.json());
// app.use(cors());
// Routes
app.use("/", home);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://cashier-pos.netlify.app, http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

const productController = require("./product/product.controller");
const productsController = require("./product/products.controller");
const userController = require("./product/user.controller");
const registerController = require("./product/register.controller");
const loginController = require("./product/login.controller");
const transactionController = require("./product/transaction.controller");
const authController = require("./product/auth.controller");
const logoutController = require("./product/logout.controller");

app.use("/login", loginController)
app.use("/register",  registerController)
app.use("/users",  userController)
app.use("/products", productsController)
app.use("/item", productController)
app.use("/transaction", transactionController)
app.use("/me", authController)
// app.use("/logout", logoutController)


// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
