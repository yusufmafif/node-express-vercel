const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.send("Hello World");
});

module.exports = router;
