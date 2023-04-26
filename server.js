require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const runner = require("./test-runner");

mongoose.connect(process.env.MONGO_URI);

app.listen(process.env.PORT || 3000, function () {
  console.log(`App is listening on port ${process.env.PORT}...`);
  if (process.env.NODE_ENV === "test") {
    console.log("Running Tests...");
    setTimeout(function () {
      try {
        runner.run();
      } catch (e) {
        console.log("Tests are not valid:");
        console.error(e);
      }
    }, 3500);
  }
});
