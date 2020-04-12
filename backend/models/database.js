const Sequelize = require("sequelize");
const databaseconfig = require("../config/databaseconfig.json");

const sequelize = new Sequelize(
  "TestTheBest",
  databaseconfig.DB_USERNAME,
  databaseconfig.DB_PASSWORD,
  {
    dialect: "mysql",
    logging: false,
    host: "localhost",
    charset: "utf8",
    collate: "utf8_general_ci",
    define: {
      timestamps: false,
    },
    timezone: "+02:00",
  }
);

module.exports = sequelize;
