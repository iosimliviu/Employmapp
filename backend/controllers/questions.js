const Question = require("../models/index").Question;
const Answer = require("../models/index").Answer;

const createQuestion = async (req, res) => {
    if (req.body.questionText && req.body.answers) {
        const questionText = req.body.questionText;
        const question = new Question();
        question.questionText = questionText;
        question.testQuestionId = req.params.testId;
        await question.save();
        
        const answers = req.body.answers;
        for (let i = 0; i < answers.length; i++) {
            let answer = new Answer();
            answer.answerText = answers[i].answerText;
            answer.isCorrect = answers[i].isCorrect;
            answer.score = answers[i].score;
            answer.questionId = question.id;
            await answer.save();
        }
        res.status(201).json({ message: "Question with options added" });
    } else {
        res.status(400).json({ message: "Invalid question option payload" });
    }
};

const deleteQuestion = async (req, res) => {
    let questionId = req.params.id;
    try {
        Question.findOne({
        where: {
          id: questionId,
        },
      }).then((result) => {
        if (result) {
          result.destroy();
          res.status(202).json({ message: "Question deleted" });
        } else {
          res.status(404).json({
            message: "The question you're trying to delete doesnt' exist",
          });
        }
      });
    } catch (e) {
      res.status(500).json({ message: "Server error" });
    }
  };
  

module.exports = {
    createQuestion,
    deleteQuestion
}
