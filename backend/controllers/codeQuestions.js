const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const CODE_FOLDER = "../code";
//MAKE POST WITH ANSWER,TEST WHEN U COM BACC

//NOTE: extract the  number of passed tests from the results string, put it in a variable, tests.result += NoPassedTests * codeQuestions.scorePerTest
function testCode(req, res) {
    let code = req.body.answer;
    let test = req.body.test;
  
    try {
      fs.writeFileSync(path.join(__dirname, CODE_FOLDER, "input_code.py"), code);
      fs.writeFileSync(path.join(__dirname, CODE_FOLDER, "test.py"), test);
      const proc = exec("python code/test.py");//path.join(CODE_FOLDER, "test.py"));//
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