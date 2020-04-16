const connection = require("../models/database.js");

const databaseReset = async (req, res) => {
    try {
      await connection.sync({
        force: true
      });
      res.status(200).send({ message: "bd reseted succes" });
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "server error" });
    }
}

module.exports = { databaseReset }