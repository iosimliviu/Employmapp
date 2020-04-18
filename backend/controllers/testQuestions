const TestQuestion = require("../models/index").TestQuestion;

const createTestQuestion = async (req, res) => {
    let testId = req.params.testId;
  try {
    let newTestQuestion = new TestQuestion(req.body);
    newTestQuestion.testId = testId;
    await newTestQuestion.save();
    res.status(201).json({ message: "TestQuestion added", activity: newTestQuestion });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

// const getAllTestQuestion = async (req, res) => {
//     try {
//         const getAllTestQuestions = await TestQuestion.findAll({
//             where: { testId: req.params.id },
//             raw: true
//         });
//         res.status(200).send(tests);
//     } catch (e) {
//         console.error(e);
//         res.status(500).send({ message: "server error" });
//     }
// };

// const getTestQuestion = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const foundTest = await Test.findOne({ where: { id } });
//         if (!foundTest) {
//             res.status(400).send({ message: "test does not exist" });
//         } else {
//             res.status(200).send(foundTest);
//         }
//     } catch (e) {
//         console.error(e);
//         res.status(500).send({ message: "server error" });
//     }
// };

// const deleteTestQuestion = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const foundTest = await Test.findOne({
//             where: {
//                 id,
//                 userId: req.session.id
//             }
//         });
//         if (!foundTest) {
//             res.status(400).send({ message: "test does not exist" });
//         } else {
//             await foundTest.destroy();
//             res.status(200).send({ message: "test has been deleted" });
//         }
//     } catch (e) {
//         console.error(e);
//         res.status(500).send({ message: "server error" });
//     }
// };

// module.exports = {
//     getAllTestQuestions,
//     createTestQuestion,
//     getTestQuestion,
//     deleteTestQuestion
// }