const CodeQuestion = require("../models/index.js").CodeQuestion;

const createCodeQuestion = async (req, res) => {
  try {
      const { testId, questionText, scorePerTest, test  } = req.body;

      await CodeQuestion.create({
          testId,
          questionText, 
          scorePerTest, 
          test          
      });
      res.status(200).send({ message: "CodeQuestion inserted" });
  } catch (e) {
      console.error(e);
      res.status(500).send({ message: "server error" });
  }
};

const getCodeQuestion = async (req, res) => {
  try {
      const { id } = req.params;
      const foundCodeQuestion = await CodeQuestion.findOne({ where: { id } });
      if (!foundCodeQuestion) {
          res.status(400).send({ message: "CodeQuestion does not exist" });
      } else {
          res.status(200).send(foundCodeQuestion);
      }
  } catch (e) {
      console.error(e);
      res.status(500).send({ message: "server error" });
  }
};

module.exports = {
  createCodeQuestion,
  getCodeQuestion
}