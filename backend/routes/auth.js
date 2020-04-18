const router = require("express").Router();
const authController = require("../controllers/auth.js");
const authService = require("../services/auth.js")

router.post("/login", authController.userLogin);
router.get("/logout", authService.checkLogin, async (req, res) => {
    req.session.reset();
    res.status(200).send({ message: "Successful logout" });
});

module.exports = router;
