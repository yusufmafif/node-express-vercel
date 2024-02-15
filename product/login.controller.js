const express = require("express");
const prisma = require("../db");
const { getAllProducts, getProductbyId, deleteProductbyId, updateData, replaceData } = require("./product.service");
const { createUser } = require("./user.service");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    const user = await prisma.user.findUnique(
        {
            where: {
                email: email
            }
        }
    );
    if (!user) {
        return res.status(404).send({
            message: "User not found"
        })
    }
    if (!user.password) {
        return res.status(404).send({
            message: "Password not set"
        })
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (isPasswordValid) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        const secret = process.env.JWT_SECRET;
        const expiresIn = 60 * 60 * 1;

        const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
        return res.json({
            data: {
                id: user.id,
                email: user.email,
                password: user.password,
            },
            token: token
        })
    } else {
        return res.status(400).send({
            message: "Invalid password"
        })
    }
})

module.exports = router