const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const accessValidation = (req, res, next) => {
    const cookieHeader = req.headers.cookie; // Mendapatkan header Cookie
    if (!cookieHeader) {
        console.log("No cookie header present");
        return res.status(401).send({
            message: "Unauthorized 1",
        });
    }

    const cookies = cookieHeader.split(';').reduce((cookiesObject, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookiesObject[name] = value;
        return cookiesObject;
    }, {});

    const token = cookies.token; // Mendapatkan nilai token dari cookies
    if (!token) {
        console.log("No token present in cookies");
        return res.status(401).send({
            message: "Unauthorized 2",
        });
    }

    const secret = process.env.JWT_SECRET;
    try {
        const jwtDecode = jwt.verify(token, secret);
        req.userData = jwtDecode;
        next(); // Lanjutkan ke penanganan permintaan jika token valid
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return res.status(401).send({
            message: "Unauthorized 3",
        });
    }
}

router.get("/", accessValidation, async (req, res) => {
    // Jika kode mencapai sini, berarti token valid
    // Anda dapat menangani permintaan dengan data pengguna yang didekodekan
    const userData = req.userData;
    console.log('Token validation successful for user:', userData);
    res.status(200).json({
        message: "Authorized",
        userData: userData
    });
});

module.exports = router;
