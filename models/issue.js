const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    issue_title: {
      type: String,
      required: true,
    },
    issue_text: {
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
    created_by: {
      type: String,
      required: true,
    },
    assigned_to: {
      type: String,
    },
    open: {
      type: Boolean,
      default: true,
    },
    status_text: {
      type: String,
    },
  },
  { timestamps: true }
);

issueSchema.pre("save", function () {
  this.updated_on = Date.now();
});

module.exports = mongoose.model("Issue", issueSchema);
