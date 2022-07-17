const User = require("../models/userModel");
const Movement = require("../models/movementModel");
const catchAsync = require("./../utils/catchAsync");
const createError = require("../utils/error");

const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({}).populate("movements");

  res.status(201).json({ users });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const id = req.user._id;

  if (req.user.email === "aoxpeep@gmail.com") {
    return next(createError(401, "You are not allowed to delete this account!"));
  }

  await User.findByIdAndDelete(id);

  await Movement.deleteMany({ user: id });

  res.status(204).json({});
});

exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
