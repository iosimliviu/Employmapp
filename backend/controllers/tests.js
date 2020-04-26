const Test = require("../models/index").Test;

const getAllTest = async (req, res) => {
    try {
        const tests = await Test.findAll({
            where: { userId: req.session.id },
            raw: true
        });
        res.status(200).send(tests);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "server error" });
    }
};

const createTest = async (req, res) => {
    try {
        const { duration, name, description, startedAt, finishedAt, result } = req.body;

        await Test.create({
            duration,
            name,
            description,
            startedAt,
            finishedAt,
            result,
            userId: req.session.id
        });
        res.status(200).send({ message: "test inserted" });
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

const updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        let { duration, name, description, startedAt, finishedAt, result } = req.body;

        const foundTest = await Test.findOne({
            where: {
                id,
                userId: req.session.id //id : id
            }
        });
        if (!foundTest) {
            res.status(400).send({ message: "test does not exist" });
        } else {
            const updatedTest = await foundTest.update({
                ...foundTest,
                duration,
                name,
                description,
                startedAt,
                finishedAt,
                result
            }); 
            res.status(200).send({ updatedTest, message: "test has been updated" });
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
                userId: req.session.id
            }
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
    updateTest,
    deleteTest
}