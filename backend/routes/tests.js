const router = require("express").Router();
const testController = require("../controllers/tests.js");
const authService = require("../services/auth.js");

router.get("/", authService.checkLogin, testController.getAllTest);
router.get("/:id", authService.checkLogin, testController.getTest);
router.post("/", testController.createTest);
router.delete("/:id", authService.checkLogin, testController.deleteTest);

module.exports = router;