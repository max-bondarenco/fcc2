const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  assigned_to: {
    type: String,
  },
  status_text: {
    type: String,
  },
  open: {
    type: Boolean,
    default: true,
  },
  issue_title: {
    type: String,
    required: true,
  },
  issue_text: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
  updated_on: {
    type: Date,
  },
  project: {
    type: String,
    select: false,
  },
});

issueSchema.pre("save", function () {
  this.updated_on = Date.now();
});

issueSchema.pre("find", function () {
  this.select("-__v");
});

module.exports = mongoose.model("Issue", issueSchema);
