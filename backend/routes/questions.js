const router = require("express").Router();
const questionController = require("../controllers/questions.js");

router.post("/:testId", questionController.createQuestion);
router.delete("/:id", questionController.deleteQuestion);
router.get("/answers/:question_id", questionController.getAllAnswersForQuestion);
router.get("/:test_id", questionController.getAllQuestions);

module.exports = router;