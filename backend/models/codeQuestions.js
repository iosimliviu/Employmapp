module.exports = (sequelize, DataTypes) => {
    return sequelize.define("codeQuestions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questionText: DataTypes.STRING,
        answer: DataTypes.STRING,
        test: DataTypes.STRING,
        scorePerTest : DataTypes.INTEGER
    });
};
  