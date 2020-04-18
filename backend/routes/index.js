const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const dbReset = require("../services/databasereset.js");
const userRouter = require("./users");
const testRouter = require("./tests");

router.use("/auth", authRouter);
router.use("/reset", dbReset.databaseReset);
router.use("/users", userRouter);
router.use("/tests", testRouter);

module.exports = router;
