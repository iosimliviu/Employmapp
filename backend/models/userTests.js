module.exports = (sequelize, DataTypes) => {
    return sequelize.define("usertests", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      startedAt: "DATETIME",
      finishedAt: "DATETIME",
      noCorrect: DataTypes.INTEGER,
      noIncorrect: DataTypes.INTEGER,
      noPassedTests: DataTypes.INTEGER,
      noTotalTests: DataTypes.INTEGER
    });
};
