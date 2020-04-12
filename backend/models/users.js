module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        },
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      }, 
      isObserver: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      registeredAt: "DATETIME",
      lastLogin: "DATETIME"
    });
};
  