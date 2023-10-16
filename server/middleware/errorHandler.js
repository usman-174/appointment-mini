const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFound");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    // Validation error
    res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
      type: "Validation Error",
      name: err.name,
    });
  } else if (err instanceof NotFoundError) {
    res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
      type: "NotFound error",
      name: err.name,
    });
  } else {
    res.status(500).json({
      error: err.message,
      details: err.details,
      type: "Internal Error",
      
    });
  }
};

module.exports = errorHandlerMiddleware;
