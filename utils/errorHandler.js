const AppError = require("./AppError");

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    error: err.message,
  });
};

module.exports = (err, req, res, next) => {
  if (err.custom) return sendError(err, res);

  const missingFields = [];

  Object.keys(err.errors).forEach((field) => {
    if (err.errors[field].kind === "required") missingFields.push(field);
  });

  if (missingFields.length > 0)
    return sendError(new AppError(400, "required field(s) missing"), res);
};
