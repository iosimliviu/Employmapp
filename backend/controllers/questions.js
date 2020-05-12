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

const getAllAnswersForQuestion = async (req, res) => {
  try {
    let question_id = req.params.question_id;
    const question = await Question.findOne({ where: { id: question_id } });
    const answers = await Answer.findAll({
      where: {
        questionId: question_id
      }
    })
    if (answers.length > 0) {
      res.status(200).send({ question, answers });
    } else
      res.status(404).json({ message: "question has 0 answers" });

  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "server error" });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    let test_id = req.params.test_id;
    const questions = await Question.findAll({raw:true, where:{
      testId:test_id
    }}).then(async (questionsFound) => {
      for (let i = 0; i < questionsFound.length; i++) {
        questionsFound[i].answers = await getAllAnswersQuestion(questionsFound[i].id)
      }
      return questionsFound;
    });

    res.status(200).send(questions);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "server error" });
  }
}

const getAllAnswersQuestion = async (id) => {    
    const answers = await Answer.findAll({
      where: {
        questionId: id
      },
      raw: true
    })

    return answers
};


module.exports = {
  createQuestion,
  deleteQuestion,
  getAllAnswersForQuestion,
  getAllQuestions
}
