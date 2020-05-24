module.exports = (sequelize, DataTypes) => {
    return sequelize.define("questions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questionText: DataTypes.TEXT,
        score: DataTypes.INTEGER
    });
};
