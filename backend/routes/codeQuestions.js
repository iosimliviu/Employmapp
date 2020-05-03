const router = require("express").Router();
const codeQuestionsController = require("../controllers/codeQuestions.js");

router.post("/", codeQuestionsController.createCodeQuestion);
router.get("/:id", codeQuestionsController.getCodeQuestion);
module.exports = router;

