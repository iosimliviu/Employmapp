const router = require("express").Router();
const feedbackController = require("../controllers/feedbacks.js");

router.post("/", feedbackController.createFeedback);
router.put("/:id", feedbackController.updateFeedback);
router.get("/", feedbackController.getAllFeedbacks);

module.exports = router;