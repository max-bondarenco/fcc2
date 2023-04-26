const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/api.js");
const fccTestingRoutes = require("./routes/fcctesting.js");

let app = express();

app.use("/public", express.static(`${__dirname}/public`));
app.use(cors({ origin: "*" })); //For FCC testing purposes only
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/:project/").get(function (req, res) {
  res.sendFile(`${__dirname}/views/issue.html`);
});

app.route("/").get(function (req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.use("/api/issues/", apiRoutes);
fccTestingRoutes(app);

app.use(function (req, res, next) {
  res.status(404).type("text").send("Not Found");
});

module.exports = app;
