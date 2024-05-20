const express = require("express");
const prisma = require("../db");
const { getAllProducts, deleteProductbyId, updateData, replaceData } = require("./product.service");
const {createData, getAllTransaction, getDetailTransactionById} = require("./transaction.service");
const router = express.Router();
const jwt = require("jsonwebtoken");
const accessValidation = (req, res, next) => {
    const cookieHeader = req.headers.cookie; // Mendapatkan header Cookie
    if (!cookieHeader) {
        return res.status(401).send({
            message: "Unauthorized1",
        });
    }
    const cookies = cookieHeader.split(';').reduce((cookiesObject, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookiesObject[name] = value;
        return cookiesObject;
    }, {});

    const token = cookies.token; // Mendapatkan nilai token dari cookies
    if (!token) {
        return res.status(401).send({
            message: "Unauthorized1",
        });
    }

    const secret = process.env.JWT_SECRET;
    try {
        const jwtDecode = jwt.verify(token, secret)
        req.userData = jwtDecode
        next(); // Lanjutkan ke penanganan permintaan jika token valid
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized2",
        });
    }
}

router.get("/", accessValidation, async (req, res) => {
    const transactions = await getAllTransaction();
    res.send(transactions);
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const transaction = await getDetailTransactionById(parseInt(id));
        if (transaction) {
            res.send(transaction);
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
    const transaction = req.body;
    const createTransaction = await createData(transaction);
    res.status(201).send("Transaction created successfully");
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