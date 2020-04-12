const express = require("express");
const bodyParser = require("body-parser");
const model = require("./models/index");
const session = require("client-sessions");
const cors = require("cors");

const app = express();
let port = 8081;
app.use(bodyParser.json());
app.use(cors());
app.use(
    session({
        cookieName: "session",
        secret: "cod secret foarte secret",
        duration: 7200000,
        activeDuration: 300000,
        httpOnly: true,
        ephemeral: true
    })
);


model.sequelize.sync();

app.listen(port, () => {
    console.log("Server listens on " + port);
});