// Import packages
const express = require("express");
const home = require("./routes/home");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(
    cors({
    credentials: true, origin:
        'https://cashier-pos.netlify.app'
}))
app.use(express.json());
app.use(cookieParser());

const productController = require("./product/product.controller");
const productsController = require("./product/products.controller");
const userController = require("./product/user.controller");
const registerController = require("./product/register.controller");
const loginController = require("./product/login.controller");
const transactionController = require("./product/transaction.controller");
const authController = require("./product/auth.controller");
const logoutController = require("./product/logout.controller");

app.use("/", home);
app.use("/login", loginController);
app.use("/me", authController);
app.use("/register", registerController);
app.use("/users", userController);
app.use("/products", productsController);
app.use("/product", productController);
app.use("/transaction", transactionController);
// app.use("/logout", logoutController);


const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
