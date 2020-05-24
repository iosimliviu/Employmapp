const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const dbReset = require("../services/databasereset.js");
const userRouter = require("./users");
const testRouter = require("./tests");
const codeQuestionsRouter = require("./codeQuestions.js")
const questionRouter = require("./questions.js")
const feedbackRouter = require("./feedbacks.js")
const userTests = require("./userTests.js")

router.use("/auth", authRouter);
router.get("/reset", dbReset.databaseReset);
router.use("/users", userRouter);
router.use("/tests", testRouter);
router.use("/codeQuestions", codeQuestionsRouter);
router.use("/questions", questionRouter);
router.use("/feedbacks", feedbackRouter);
router.use("/userTests", userTests)

module.exports = router;
