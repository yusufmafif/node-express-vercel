const express = require("express");
const prisma = require("../db");
const { getAllProducts, getProductbyId, deleteProductbyId, updateData, replaceData } = require("./product.service");
const { createUser } = require("./user.service");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            message: "Email and password are required"
        })
    }
    const user = await prisma.user.findUnique({
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
            email: user.email,
            role: user.role
        }
        const secret = process.env.JWT_SECRET;
        const expiresIn = 60 * 60 * 1;
        const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
        const name = payload.username
        // return res.json({
        //     data: {
        //         id: payload.id,
        //         username: payload.username,
        //         email: payload.email,
        //     },
        //     token: token,
        //     auth: true,
        //     name: name,
        //     id : payload.id
        // })

        return res.cookie("token", token, { httpOnly: false, sameSite : "none", secure: false }).json({
            data: {
                id: payload.id,
                username: payload.username,
                email: payload.email,
            },
            token: token,
            auth: true,
            name: name,
            id: payload.id
        })
    } else {
        return res.status(400).send({
            message: "Invalid password"
        })
    }
})


module.exports = router