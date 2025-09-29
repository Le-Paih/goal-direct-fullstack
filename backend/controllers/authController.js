const User = require('../models/userModel2');
const AppError = require('../utils/appError');
const { createSecretToken } = require('../utils/SecretToken');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: true,
    });

    res
      .status(201)
      .json({ message: 'User signed up successfully', success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).res.json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .res.json({ message: 'Incorrect password or email' });
    }
    const isPAsswordValid = await bcrypt.compare(password, user.password);
    if (!isPAsswordValid) {
      return res
        .status(401)
        .res.json({ message: 'Incorrect password or email' });
    }
    const token = createSecretToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });

    res
      .status(201)
      .json({ message: 'User logged in successfully', success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Logout
module.exports.logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });

  res
    .status(200)
    .json({ status: 'success', message: 'Logged out successfully' });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Check if token exists
  const token = req.cookies.jwt; // Assuming the JWT is in cookies
  if (!token) {
    return next(
      new AppError(
        'You are not logged in! Please log in to access this route.',
        401,
      ),
    );
  }

  // 2. Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401),
    );
  }

  // 4. Attach user to request
  req.user = currentUser;

  next();
});
