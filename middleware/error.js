const ErrorResponse = require('../utils/errorResponse');

// Class to handle all errors rather than individually in try-catch blocks
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.stack);

  // Mongoose bad ObjectID
  if (err.name === 'CastError') {
    error = new ErrorResponse('ObjectID not found', 404);
  }

  // Mongoose validation error
  // if (err.name === 'ValidationError') {
  //   const message = Object.values
  // }

  // Mongoose duplicate key/value
  if (err.code === 11000) {
    error = new ErrorResponse('Email or Avatar already used', 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
