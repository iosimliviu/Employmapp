module.exports = (sequelize, DataTypes) => {
    return sequelize.define("codeQuestions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questionText: DataTypes.STRING,
        scorePerTest: DataTypes.INTEGER,
        test: DataTypes.TEXT
    });
};
