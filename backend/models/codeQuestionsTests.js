module.exports = (sequelize, DataTypes) => {
    return sequelize.define("codeQuestionsTests", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        answer: DataTypes.STRING
    });
};
  