const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const dbReset = require("../services/databasereset.js");
const userRouter = require("./users");

router.use("/auth", authRouter);
router.use("/reset", dbReset.databaseReset);
router.use("/users", userRouter);

module.exports = router;
