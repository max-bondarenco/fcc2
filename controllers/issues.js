const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError.js");
const Issue = require("../models/issue");

exports.get = catchAsync(async (req, res, next) => {
  const query = Issue.find({ project: req.params.project });
  if (req.query) query.find(req.query);

  const issues = await query;

  res.status(200).json(issues);
});

exports.create = catchAsync(async (req, res, next) => {
  const issue = await Issue.create({
    project: req.params.project,
    ...req.body,
  });

  res.status(201).json(issue);
});

exports.delete = catchAsync(async (req, res, next) => {
  if (!req.body._id) return next(new AppError(400, "missing _id"));

  const issue = await Issue.findByIdAndDelete(req.body._id);

  if (!issue)
    return res.status(200).json({
      error: "could not delete",
      _id: req.body._id,
    });

  res.status(200).json({
    result: "successfully deleted",
    _id: req.body._id,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  if (!req.body._id) return next(new AppError(400, "missing _id"));
  let updated = false;

  const issue = await Issue.findById(req.body._id);

  console.log(req.body);

  if (!issue)
    return res.status(200).json({
      error: "could not update",
      _id: req.body._id,
    });

  Object.keys(req.body).forEach((field) => {
    if (field !== "_id" && req.body[field] !== "") {
      issue[field] = req.body[field];
      updated = true;
    }
  });

  if (!updated)
    return res.status(200).json({
      error: "no update field(s) sent",
      _id: req.body._id,
    });

  await issue.save();

  res.status(200).json({
    result: "successfully updated",
    _id: req.body._id,
  });
});
