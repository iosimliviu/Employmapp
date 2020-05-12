// const CodeQuestionTest = require("../models/index.js").CodeQuestionTest;
const CodeQuestion = require("../models/index.js").CodeQuestion;
const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const CODE_FOLDER = "../code";

//tests.result += NoPassedTests * codeQuestions.scorePerTest
async function createCodeQuestionTest(req, res) {
  let sessionId = req.session.id;
  let importInputCode = `from input_code${sessionId} import solution\n`;
  let answer = req.body.answer;

  let codeQuestion = await CodeQuestion.findOne({
    where: {
      id: req.body.codeQuestionId
    }
  });

  let test = importInputCode + codeQuestion.test;

  try {
    fs.writeFileSync(path.join(__dirname, CODE_FOLDER, `input_code${sessionId}.py`), answer);
    fs.writeFileSync(path.join(__dirname, CODE_FOLDER, `test${req.body.codeQuestionId}.py`), test);
    const proc = exec(`python code/test${req.body.codeQuestionId}.py`);//path.join(CODE_FOLDER, "test.py"));//
    const results = await proc.toString();

    let regexPassedTests = /Passed (\d+) out/g;
    var match = await regexPassedTests.exec(results);
    let noPassedTests = match[1];

    return res.send({
      results: results,
      noPassedTests: noPassedTests
    });
  } catch (error) {
    console.log("An error occurred");
    console.log(error);

    return res.send("An error occurred.");
  }
}

module.exports = {
  createCodeQuestionTest
}