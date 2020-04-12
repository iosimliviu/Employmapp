module.exports = (sequelize, DataTypes) => {
    return sequelize.define("answers", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        answerText: DataTypes.STRING,
        isCorrect: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        score: DataTypes.INTEGER

    });
};
  