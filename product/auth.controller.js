const express = require("express");
const prisma = require("../db");
const { getAllProducts, getProductbyId, deleteProductbyId, updateData, replaceData } = require("./product.service");
const { createUser } = require("./user.service");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const router = express.Router();
const accessValidation = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({
            message: "Unauthorized1",
        });
    }
    const token = authorization.split(" ")[1];
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
    // Jika kode mencapai sini, berarti token valid
    // Anda dapat menangani permintaan dengan data pengguna yang didekodekan
    const userData = req.userData;
    console.log('success');
    res.status(200).json({
        message: "Authorized",
        userData: userData
    });
});



module.exports = router