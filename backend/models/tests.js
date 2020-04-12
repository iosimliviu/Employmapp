module.exports = (sequelize, DataTypes) => {
    return sequelize.define("tests", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      duration: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      startedAt: "DATETIME",
      finishedAt: "DATETIME",
      result: DataTypes.STRING
    });
};
  