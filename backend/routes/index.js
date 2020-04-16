const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const dbReset = require("../services/databasereset.js");

router.use("/auth", authRouter);
router.use("/reset", dbReset.databaseReset);

module.exports = router;
