const AppError = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class ClientError extends AppError {
  constructor(error) {
    super(
      errorName,
      "Not able to validate the data sent in the request",
      explanation,
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = ClientError;
