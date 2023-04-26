require("dotenv").config();
const app = require("./app");
const runner = require("./test-runner");

app.listen(process.env.PORT || 3000, function () {
  console.log(`App is listening on port ${procces.env.PORT}...`);
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
