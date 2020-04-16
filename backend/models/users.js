module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      lastName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      isObserver: DataTypes.BOOLEAN,
      registeredAt: "DATETIME",
      lastLogin: "DATETIME"
    });
};
  