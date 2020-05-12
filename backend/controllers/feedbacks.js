const Feedback = require("../models/index.js").Feedback;

const createFeedback = async (req, res) => {
    try {
        const { userId, cvRating, cvFeedback, interviewRating, interviewFeedback, mention } = req.body;

        await Feedback.create({
            userId,
            cvRating,
            cvFeedback,
            interviewRating,
            interviewFeedback,
            mention
        });
        res.status(200).send({ message: "Feedback inserted" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
};

const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        let cvRating = req.body.cvRating;
        let cvFeedback = req.body.cvFeedback
        let interviewRating = req.body.interviewRating
        let interviewFeedback = req.body.interviewFeedback
        let mention = req.body.mention

        const feedback = await Feedback.findOne({
            where: {
                id
            }
        });
        if (!feedback) {
            res.status(400).send({ message: "feedback does not exist" });
        }
        else {
            const updatedFeedback = await feedback.update({
                ...feedback,
                cvRating,
                cvFeedback,
                interviewRating,
                interviewFeedback,
                mention
            });
            res.status(200).send({ updatedFeedback, message: "feedback has been updated" });

        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" })
    }
}

const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll();
        res.status(200).send(feedbacks);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Server error" })
    }
};

module.exports = {
    createFeedback,
    updateFeedback,
    getAllFeedbacks
};
