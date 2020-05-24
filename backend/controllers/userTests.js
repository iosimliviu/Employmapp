const Test = require("../models/index").Test;
const UserTest = require("../models/index").UserTest;

const createUserTest = async (req, res) => {
    try {
        const { userId, testId, startedAt, finishedAt, noCorrect, noIncorrect, noTotalTests, noPassedTests, done, result } = req.body;


        if (await UserTest.findOne({ where: { userId, testId }, raw: true })) {
            res.status(200).send({ message: "there is already a user test with this userId and testId" });
        }
        else {
            await UserTest.create({
                userId,
                testId,
                startedAt,
                finishedAt,
                noCorrect,
                noIncorrect,
                noTotalTests,
                noPassedTests,
                done,
                result
            });
            res.status(200).send({ message: "UserTest test inserted" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
};

const updateUserTest = async (req, res) => {
    try {
        const { userId, testId, finishedAt, noIncorrect, noPassedTests, done, result } = req.body;

        const userTest = await UserTest.findOne({
            where: {
                userId,
                testId
            }
        })
        if (!userTest) {
            res.status(400).send({ message: "UserTest does not exist" });
        }
        else {
            await UserTest.update({
                ...userTest,
                finishedAt,
                noIncorrect,
                noPassedTests,
                done,
                result
            }, {
                where: {
                    userId,
                    testId
                }
            })
            res.status(200).send({ message: "UserTest has been updated" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
}

const getUserTestsForUser = async (req, res) => {
    let user_id = req.params.user_id;
    let userTest = await UserTest.findAll({
        where: {
            userId: user_id
        }
    });
    if (!userTest) {
        res.status(400).send({ message: "UserTest does not exist" });
    } else
        res.status(404).json(userTest);
}

const getAllUserTests = async (req, res) => {
    try {
        const userTests = await UserTest.findAll();
        res.status(200).send(userTests);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
}


module.exports = {
    getUserTestsForUser,
    createUserTest,
    updateUserTest,
    getAllUserTests
};
