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

  try {
    await Issue.findByIdAndDelete(req.body._id);

    return res.status(200).json({
      result: "successfully deleted",
      _id: req.body._id,
    });
  } catch (err) {
    res.status(400).json({
      error: "could not delete",
      _id: req.body._id,
    });
  }
});

exports.update = catchAsync(async (req, res, next) => {
  if (!req.body._id) return next(new AppError(400, "missing _id"));

  if (Object.keys(req.body).length === 1)
    return res.status(400).json({
      error: "no update field(s) sent",
      _id: req.body._id,
    });

  try {
    const issue = await Issue.findById(req.body._id);
    await issue.updateOne(req.body, { runValidators: true });
    await issue.save();

    return res.status(200).json({
      result: "successfully updated",
      _id: req.body._id,
    });
  } catch (err) {
    res.status(400).json({
      error: "could not update",
      _id: req.body._id,
    });
  }
});
