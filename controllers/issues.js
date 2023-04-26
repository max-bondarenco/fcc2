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

exports.delete = catchAsync(async (req, res, next) => {});

exports.update = catchAsync(async (req, res, next) => {});
