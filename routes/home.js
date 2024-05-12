const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
    timeZone : new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
  }); 
});
router.get("/l", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
    timeZone : new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
  }); 
});

module.exports = router;
