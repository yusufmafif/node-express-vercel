// Import packages
const express = require("express");
const home = require("./routes/home");
const app = express();
const cors = require('cors')

const corsOptions = {
    origin: 'https://cashier-pos.netlify.app',
    credentials: true,

}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", process.env.DEV_ADDRESS);
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
// next();
// });

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
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
// app.use("/logout", logoutController);

// Connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
