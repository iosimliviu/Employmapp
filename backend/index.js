const express = require("express");
const bodyParser = require("body-parser");
const model = require("./models/index");
const indexRouter = require("./routes/index");
const session = require("client-sessions");
const cors = require("cors");


const app = express();
let port = 8081;

const configure = app => {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(
        session({
            cookieName: "session",
            secret: "notguessablecookiekey",
            duration: 7200000,
            activeDuration: 300000,
            httpOnly: true,
            ephemeral: true
        })
    );

    app.use("/api", indexRouter);
    model.sequelize.sync();
};

module.exports = configure;

configure(app);

app.listen(port, () => {
    console.log("Server listens on " + port);
});