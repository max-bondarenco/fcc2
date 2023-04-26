const express = require("express");
const router = express.Router();

const issuesController = require("../controllers/issues");

router
  .route("/")
  .get(issuesController.get)
  .post(issuesController.create)
  .put(issuesController.update)
  .delete(issuesController.delete);

module.exports = router;
