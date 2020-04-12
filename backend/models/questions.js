module.exports = (sequelize, DataTypes) => {
    return sequelize.define("questions", {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        type: DataTypes.STRING,
        questionText: DataTypes.STRING
    });
};
