const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const accessValidation = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        console.log("No token present");
        return res.status(401).send({
            message: "Token is missing",
        });
    }
    try {
        const jwtDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(jwtDecode);
        req.userData = jwtDecode;
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return res.status(401).send({
            message: "Please login again",
        });
    }
}

router.post("/", accessValidation, async (req, res) => {
    const userData = req.userData;
    console.log('Token validation successful for user:', userData);
    res.status(200).json({
        message: "Authorized",
        userData: userData
    });
});

module.exports = router;
