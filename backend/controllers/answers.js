const Answer = require("../models/index").Answer;

const createAnswer = async (req, res) => {
    try {
      const { answerText, isCorrect, score } = req.body;

      await Answer.create({
        answerText,
        isCorrect,
        score,
        userId: req.session.id
      });
      res.status(200).send({ message: "answer inserted" });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "server error" });
    }
};

const getAnswer =  async (req, res) => {
    try {
      const { id } = req.params;
      const foundAnswer = await Answer.findOne({
        where: {
          id //id : id
        }
      });
      if (!foundAnswer) {
        res.status(400).send({ message: "answer does not exist" });
      } else {
        res.status(200).send(foundAnswer);
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "server error" });
    }
};

const getAllAnswers = async (req, res) => {
    try {
      const answers = await Answer.findAll({
        where: { userId: req.session.id },
        raw: true
      });
      res.status(200).send(notes);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "server error" });
    }
};

