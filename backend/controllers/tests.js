const Test = require("../models/index").Test;
const Question = require("../models/index").Question;
const CodeQuestion = require("../models/index").CodeQuestion;
const Answer = require("../models/index").Answer;
const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const CODE_FOLDER = "../code";

async function testCode(req, res) {
    try {
        let sessionId = req.body.id;
        let importInputCode = `from input_code${sessionId} import solution\n`;
        let answer = req.body.answer;

        let codeQuestion = await CodeQuestion.findOne({
            where: {
                id: req.body.codeQuestionId
            }
        });

        let test = importInputCode + codeQuestion.test;

        fs.writeFileSync(path.join(__dirname, CODE_FOLDER, `input_code${sessionId}.py`), answer);
        fs.writeFileSync(path.join(__dirname, CODE_FOLDER, `test${req.body.codeQuestionId}.py`), test);
        const proc = exec(`python ../backend/code/test${req.body.codeQuestionId}.py`);//path.join(CODE_FOLDER, "test.py"));//
        const results = await proc.toString();

        let regexPassedTests = /Passed (\d+) out of (\d+) test cases/g;
        var match = await regexPassedTests.exec(results);
        let noPassedTests = match[1];
        let noTotalTests = match[2];

        return res.send({
            results: results,
            noPassedTests: noPassedTests,
            noTotalTests
        });
    } catch (error) {
        console.log("Syntax error");
        console.log(error);
        return res.send("Syntax error");
    }
}

const getAllTest = async (req, res) => {
    try {
        const tests = await Test.findAll();
        res.status(200).send(tests);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
};

const getAllQuestionsForTest = async (req, res) => {
    try {
        let test_id = req.params.test_id;
        const questions = await Question.findAll({
            where: {
                testId: test_id
            }
        })
        if (questions.length > 0) {
            res.status(200).send(questions);
        } else
            res.status(404).json({ message: "test has 0 questions" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
};

const getAllCodeQuestionsForTest = async (req, res) => {
    try {
        let test_id = req.params.test_id;
        const codeQuestions = await CodeQuestion.findAll({
            where: {
                testId: test_id
            }
        })
        if (codeQuestions.length > 0) {
            res.status(200).send(codeQuestions);
        } else
            res.status(404).json({ message: "test has 0 codeQuestions" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
};

const getDataForTest = async (req, res) => {
    try {
        var maxScore = 0;
        const test_id = req.params.test_id;
        const test = await Test.findOne({ where: { id: test_id } });
        if (!test) {
            res.status(400).send({ message: "test does not exist" });
        } else {
            const codeQuestions = await CodeQuestion.findAll({
                where: {
                    testId: test_id
                }
            }).then(async (codeQuestionsFound) => {
                for (let i = 0; i < codeQuestionsFound.length; i++) {
                    maxScore += await codeQuestionsFound[i].scorePerTest * codeQuestionsFound[i].noTests;
                }
                return codeQuestionsFound;
            });
            const questions = await Question.findAll({
                raw: true, where: {
                    testId: test_id
                }
            }).then(async (questionsFound) => {
                for (let i = 0; i < questionsFound.length; i++) {
                    questionsFound[i].answers = await getAllAnswersQuestion(questionsFound[i].id)
                    maxScore += await questionsFound[i].score
                }
                return questionsFound;
            });
            res.status(200).send({ test, codeQuestions, questions, maxScore });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
}

const getMaxScore = async (req, res) => {
    try {
        const test_id = req.params.test_id;
        const test = await Test.findOne({ where: { id: test_id } });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
}


const createTest = async (req, res) => {
    if (
        req.body.duration &&
        req.body.name &&
        req.body.description &&
        req.body.type &&
        req.body.codeQuestions &&
        req.body.questions
    ) {
        const duration = req.body.duration;
        const name = req.body.name;
        const description = req.body.description;
        const type = req.body.type;
        const test = new Test();
        test.duration = duration;
        test.name = name;
        test.description = description;
        test.type = type;
        await test.save();

        const codeQuestions = req.body.codeQuestions;
        for (let i = 0; i < codeQuestions.length; i++) {
            let codeQuestion = new CodeQuestion();
            codeQuestion.questionText = codeQuestions[i].questionText;
            codeQuestion.input = codeQuestions[i].input;
            codeQuestion.scorePerTest = codeQuestions[i].scorePerTest;
            codeQuestion.noTests = codeQuestions[i].noTests;
            codeQuestion.test = codeQuestions[i].test;
            codeQuestion.testId = test.id;
            await codeQuestion.save();
        }

        const questions = req.body.questions;
        for (let i = 0; i < questions.length; i++) {
            let question = new Question();
            question.questionText = questions[i].questionText;
            question.score = questions[i].score;
            question.testId = test.id;
            await question.save();

            const answers = req.body.questions[i].answers;
            for (let i = 0; i < answers.length; i++) {
                let answer = new Answer();
                answer.answerText = answers[i].answerText;
                answer.isCorrect = answers[i].isCorrect;
                answer.questionId = question.id;
                await answer.save();
            }
        }
        res.status(201).json({ message: "Test with options added" });
    } else {
        res.status(400).json({ message: "Invalid test option payload" });
    }
};

const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        const foundTest = await Test.findOne({
            where: {
                id,
            },
        });
        if (!foundTest) {
            res.status(400).send({ message: "test does not exist" });
        } else {
            await foundTest.destroy();
            res.status(200).send({ message: "test has been deleted" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
};

const getTest = async (req, res) => {
    try {
        const { id } = req.params;
        const foundTest = await Test.findOne({ where: { id } });
        if (!foundTest) {
            res.status(400).send({ message: "test does not exist" });
        } else {
            res.status(200).send(foundTest);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
};

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
    testCode,
    getAllTest,
    createTest,
    getTest,
    deleteTest,
    getAllQuestionsForTest,
    getAllCodeQuestionsForTest,
    getDataForTest
};
