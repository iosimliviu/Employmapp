const Test = require("../models/index").Test;
const Question = require("../models/index").Question;
const CodeQuestion = require("../models/index").CodeQuestion;
const Answer = require("../models/index").Answer;

const getAllTest = async (req, res) => {
    try {
        const tests = await Test.findAll();
        res.status(200).send(tests);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
};

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
            codeQuestion.scorePerTest = codeQuestions[i].scorePerTest;
            codeQuestion.test = codeQuestions[i].test;
            codeQuestion.testId = test.id;
            await codeQuestion.save();
        }

        const questions = req.body.questions;
        for (let i = 0; i < questions.length; i++) {
            let question = new Question();
            question.questionText = questions[i].questionText;
            question.testId = test.id;
            await question.save();

            const answers = req.body.questions[i].answers;
            for (let i = 0; i < answers.length; i++) {
                let answer = new Answer();
                answer.answerText = answers[i].answerText;
                answer.isCorrect = answers[i].isCorrect;
                answer.score = answers[i].score;
                answer.questionId = question.id;
                await answer.save();
            }
        }
        res.status(201).json({ message: "Test with options added" });
    } else {
        res.status(400).json({ message: "Invalid test option payload" });
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

module.exports = {
    getAllTest,
    createTest,
    getTest,
    deleteTest,
};
