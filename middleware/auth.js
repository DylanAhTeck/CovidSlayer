const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.avatar = decoded.avatar;
    next();
  } catch (err) {
    throw next(new ErrorResponse('Not authorized to access this route', 401));
  }
});
