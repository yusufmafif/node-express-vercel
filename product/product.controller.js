const express = require("express");
const prisma = require("../db");
const { getAllProducts, getProductbyId, deleteProductbyId, createData, updateData, replaceData } = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await getAllProducts();
    res.send(products);
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getProductbyId(parseInt(id));
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const deleteProduct = await deleteProductbyId(parseInt(productId));
        res.send("Product deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }

})

router.post("/", async (req, res) => {
    const newProductData = req.body;
    const createProduct = await createData(newProductData);
    res.status(201).send("Product created successfully");
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newProductData = req.body;
    const product = await updateData(id, newProductData);
    res.send("Product updated successfully");
})

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const newProductData = req.body;
    const replaceDataProduct = await replaceData(id, newProductData);
    res.send("Product updated successfully");
})

module.exports = router