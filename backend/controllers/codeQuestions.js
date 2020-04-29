const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const CODE_FOLDER = "../code";
//MAKE POST WITH ANSWER,TEST WHEN U COM BACC

//NOTE: extract the  number of passed tests from the results string, put it in a variable, tests.result += NoPassedTests * codeQuestions.scorePerTest
function testCode(req, res) {
  let sessionId = req.session.id;
  let importInputCode = `from input_code${sessionId} import solution\n`;
  let code = req.body.answer;
  let test = importInputCode + req.body.test;  

  try {
    fs.writeFileSync(path.join(__dirname, CODE_FOLDER, `input_code${sessionId}.py`), code);
    fs.writeFileSync(path.join(__dirname, CODE_FOLDER, `test${sessionId}.py`), test);
    const proc = exec(`python code/test${sessionId}.py`);//path.join(CODE_FOLDER, "test.py"));//
    const results = proc.toString();

    return res.send(results);
  } catch (error) {
    console.log("An error occurred");
    console.log(error);

    return res.send("An error occurred.");
  }
}

module.exports = {
  testCode
}