module.exports = (sequelize, DataTypes) => {
    return sequelize.define("codeQuestions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questionText: DataTypes.TEXT,
        input: DataTypes.TEXT,
        scorePerTest: DataTypes.INTEGER,
        noTests: DataTypes.INTEGER,
        test: DataTypes.TEXT
    });
};
