const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const dbReset = require("../services/databasereset.js");
const userRouter = require("./users");
const testRouter = require("./tests");
const codeQuestionsRouter = require("./codeQuestions.js")
const codeQuestionsTestsRouter = require("./codeQuestionsTests.js")
const questionRouter = require("./questions.js")

router.use("/auth", authRouter);
router.get("/reset", dbReset.databaseReset);
router.use("/users", userRouter);
router.use("/tests", testRouter);
router.use("/codeQuestions", codeQuestionsRouter);
router.use("/codeQuestionsTests", codeQuestionsTestsRouter);
router.use("/questions", questionRouter);

module.exports = router;
