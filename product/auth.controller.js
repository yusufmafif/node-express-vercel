const express = require("express");
const jwt = require("jsonwebtoken");


const router = express.Router();

const accessValidation = (req, res, next) => {
    const cookieHeader = (req.cookies)
    console.log('cookieHeader:', cookieHeader);
    console.log(cookieHeader)
    console.log(cookieHeader.token)
    
    const parseCookies = (cookieHeader) => {
        return cookieHeader.split(';').reduce((cookies, cookie) => {
          const [name, value] = cookie.trim().split('=');
          cookies[name] = value;
          return cookies;
        }, {});
      };
      const cookies = parseCookies(cookieHeader);

    if (!cookies) {
        console.log("No cookie header present");
        return res.status(401).send({
            message: "Unauthorized 1",
        });
    }

    try {
        const jwtDecode = jwt.verify(cookies, process.env.JWT_SECRET);
        req.userData = jwtDecode;
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        return res.status(401).send({
            message: "Unauthorized 3",
        });
    }
}

router.get("/", accessValidation, async (req, res) => {
    const userData = req.userData;
    console.log('Token validation successful for user:', userData);
    res.status(200).json({
        message: "Authorized",
        userData: userData
    });
});

module.exports = router;
