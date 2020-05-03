const router = require("express").Router();
const codeQuestionsTestsController = require("../controllers/codeQuestionsTests.js");

router.post("/", codeQuestionsTestsController.createCodeQuestionTest);

module.exports = router;