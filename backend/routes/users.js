const router = require("express").Router();
const userController = require("../controllers/users.js");

router.get("/:id", userController.getUser);
router.get("/", userController.getAllUsers);
router.post("/register", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.get("/tests/:user_id", userController.getAllTestsForUser);

module.exports = router;