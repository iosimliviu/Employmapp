const router = require("express").Router();
const userTestController = require("../controllers/userTests.js");

router.get("/:user_id", userTestController.getUserTestsForUser);
router.post("/", userTestController.createUserTest);
router.put("/", userTestController.updateUserTest);

module.exports = router;