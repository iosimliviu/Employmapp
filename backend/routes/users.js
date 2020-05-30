const router = require("express").Router();
const userController = require("../controllers/users.js");

router.get("/:id", userController.getUser);
router.post("/email/", userController.getUserByEmail);
router.get("/", userController.getAllUsers);
router.post("/register", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.post("/upload", userController.cvUpload);
router.get("/feedback/:user_id", userController.getFeedbackForUser);
router.post("/registerObserver", userController.createObeserver);

module.exports = router;