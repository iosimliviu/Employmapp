const router = require("express").Router();
const authController = require("../controllers/auth.js");

router.post("/login", authController.userLogin);

router.post("/register", authController.userRegister);

router.get("/logout", authController.checkLogin, async (req, res) => {
    req.session.reset();
    res.status(200).send({ message: "Successful logout" });
});

module.exports = router;
