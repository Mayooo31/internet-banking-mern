const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/userModel");
const createError = require("../utils/error");
const catchAsync = require("./../utils/catchAsync");

const createToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const expiresIn = process.env.JWT_EXPIRES_IN.replace(/\D/g, "") * 3600;

  return { token, expiresIn };
};

const register = catchAsync(async (req, res, next) => {
  const { firstName, secondName, email, password, confirmPassword, birthYear, gender } =
    req.body;

  const user = await User.findOne({ email });

  if (user) return next(createError(401, "This email is already registered!"));

  const createdUser = new User({
    firstName,
    secondName,
    email,
    password,
    confirmPassword,
    birthYear,
    gender,
  });

  await createdUser.save();

  const { token, expiresIn } = createToken(createdUser._id, email);

  res.status(200).json({ token, expiresIn, createdUser });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, "Please provide email and password"));
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(createError(401, "Incorrect email or password"));
  }

  const { token, expiresIn } = createToken(user._id, email);

  res.status(200).json({ token, expiresIn, user });
});

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (req.body.alternativeToken) token = req.body.alternativeToken;

  if (!token) {
    return next(createError(401, "You are not logged in! Please log in to get access."));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      createError(401, "The user belonging to this token does no longer exist.")
    );
  }

  req.user = currentUser;
  next();
});

const isLoggedIn = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") &&
    req.headers.authorization.length > 20
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(createError(401, "No token"));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).populate("movements");

  currentUser.movements.reverse();

  if (!currentUser) {
    return next(
      createError(401, "The user belonging to this token does no longer exist.")
    );
  }

  req.user = currentUser;
  res.status(200).json({ user: currentUser });
});

const changePassword = catchAsync(async (req, res, next) => {
  const { newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    return next(createError(401, "Passwords are not same!"));
  }

  if (req.user.email === "aoxpeep@gmail.com")
    return next(createError(401, "You can't change password on this account!"));

  const user = await User.findById(req.user._id);

  user.password = newPassword;
  await user.save();

  const { token, expiresIn } = createToken(user._id, user.email);

  res.status(200).json({ token, expiresIn, user });
});

exports.register = register;
exports.login = login;
exports.protect = protect;
exports.isLoggedIn = isLoggedIn;
exports.changePassword = changePassword;
