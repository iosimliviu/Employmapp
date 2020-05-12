const router = require("express").Router();
const testController = require("../controllers/tests.js");
const authService = require("../services/auth.js");

router.get("/", testController.getAllTest);
router.get("/:id", testController.getTest);
router.post("/", testController.createTest);
router.delete("/:id", testController.deleteTest);
router.get("/questions/:test_id", testController.getAllQuestionsForTest);
router.get("/codeQuestions/:test_id", testController.getAllCodeQuestionsForTest);
router.get("/data/:test_id", testController.getDataForTest);
router.post("/testCode", testController.testCode)



module.exports = router;