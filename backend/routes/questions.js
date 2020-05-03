const router = require("express").Router();
const questionController = require("../controllers/questions.js");

router.post("/:testId", questionController.createQuestion);
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;