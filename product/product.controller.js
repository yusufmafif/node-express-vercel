const express = require("express");
const prisma = require("../db");
const { getProductbyId, getAllProducts, getProductbyName, deleteProductbyId, createData, updateData, replaceData } = require("./product.service");

const router = express.Router();


router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getProductbyId(id);
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

router.post("/", async (req, res) => {
    const newProductData = req.body;
    const createProduct = await createData(newProductData);
    res.status(201).send("Product created successfully");
})

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const newProductData = req.body;
    const product = await updateData(id, newProductData);
    res.send("Product updated successfully");
})

module.exports = router