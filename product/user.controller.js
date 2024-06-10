const express = require("express");
const prisma = require("../db");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { createUser, getAllUser, getUserById, editUserById} = require("./user.service");

const router = express.Router();

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
router.post("/",  async (req, res) => {
    const newUserData = req.body;
    try {
        const user = await createUser(newUserData);
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/",  async (req, res) => {
    const user = await getAllUser();
    res.send(user);
})

router.get("/:id", accessValidation, async (req, res) => {
    const id = req.params.id;
    const user = await getUserById(id);
    res.send(user);
})

router.put("/:id", accessValidation, async (req, res) => {
    const id = req.params.id;
    const newUserData = req.body;
    const user = await editUserById(id, newUserData);
    res.send("Success");
})


module.exports = router