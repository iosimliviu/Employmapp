const router = require("express").Router();
const codeQuestionsController = require("../controllers/codeQuestions.js");

router.post("/", codeQuestionsController.testCode);

module.exports = router;

