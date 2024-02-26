const express = require("express");
const prisma = require("../db");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { createUser, getAllUser } = require("./user.service");

const router = express.Router();

const accessValidation = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({
            message: "Unauthorized",
        });
    }
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    try {
        const jwtDecode = jwt.verify(token, secret)
        req.userData = jwtDecode
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized",
        });
    }
    next(); 
}

router.post("/", async (req, res) => {
    const newUserData = req.body;
    try {
        const user = await createUser(newUserData);
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/", async (req, res) => {
    const user = await getAllUser();
    res.send(user);
})

module.exports = router