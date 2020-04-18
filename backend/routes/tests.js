const router = require("express").Router();
const testController = require("../controllers/tests.js");
const authService = require("../services/auth.js");

router.get("/", authService.checkLogin, testController.getAllTest);
router.get("/:id", authService.checkLogin, testController.getTest);
router.post("/", authService.checkLogin, testController.createTest);
router.delete("/:id", authService.checkLogin, testController.deleteTest);
router.put("/:id", authService.checkLogin, testController.updateTest);

module.exports = router;