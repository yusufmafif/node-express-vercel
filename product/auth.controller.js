const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const accessValidation = (req, res, next) => {
    // const token = req.body.token;
    const token = req.headers['authorization'];
    console.log(token)
    if (!token) {
        console.log("No cookie header present");
        return res.status(401).send({
            message: "Unauthorized 1",
        });
    }

    // jwt.verify(token, process.env.JWT_SECRET, (err) => {
    //     if(err) {
    //         return res.status(403).json('Invalid token');
    //     }
    //     next()
    // })


    const jwtDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(jwtDecode)
    req.userData = jwtDecode;
    next();
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
