// Import packages
const express = require("express");
const home = require("./routes/home");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/home", home);
app.get("/", (req, res) => {
    res.send("Express Testing");
});

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();
    res.send(products);
})

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
