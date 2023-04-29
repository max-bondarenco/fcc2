module.exports = class extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.custom = true;

    Error.captureStackTrace(this, this.constructor);
  }
};
