const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

exports.register = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Create user
    const user = await User.create({ name: name, email, password, avatar });

    // Sends cookie with token
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
  try {
    const { password, avatar } = req.body;

    // Validate avatar and email
    if (!avatar || !password) {
      return next(
        new ErrorResponse('Please provide an avatar and password', 400)
      );
    }

    // Create user
    const user = await User.findOne({ avatar }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
});

// @desc    Get user details
// @route   GET /api/v1/auth/login
// @access  Private

exports.getUser = asyncHandler(async (req, res, next) => {
  const avatar = req.avatar;

  try {
    const user = await User.findOne({ avatar }).select();
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
});

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  // Take out cookies
  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   )
  // };

  res.status(statusCode).json({
    success: true,
    token
  });
};
