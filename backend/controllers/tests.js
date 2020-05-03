const Test = require("../models/index").Test;

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
    try {
        const { duration, name, description, type} = req.body;

        await Test.create({
            duration,
            name,
            description,
            type
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


const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        const foundTest = await Test.findOne({
            where: {
                id
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
    deleteTest
}