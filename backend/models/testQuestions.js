module.exports = (sequelize, DataTypes) => {
    return sequelize.define("testQuestions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        isCodeQuestion:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
};
  