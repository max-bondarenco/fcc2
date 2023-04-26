module.exports = (err, req, res, next) => {
  res.status(200).json({
    error: err.message,
  });
};
