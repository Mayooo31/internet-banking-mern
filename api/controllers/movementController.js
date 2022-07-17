const mongoose = require("mongoose");

const catchAsync = require("./../utils/catchAsync");

const Movement = require("../models/movementModel");
const User = require("../models/userModel");

const createMovement = catchAsync(async (req, res, next) => {
  const { movement, message, to, from } = req.body;
  const user = req.user._id;

  const createdMovement = new Movement({ user, movement, message, to, from });

  const currUser = await User.findById(user);

  const sess = await mongoose.startSession();
  sess.startTransaction();
  await createdMovement.save({ session: sess });
  currUser.movements.push(createdMovement);
  await currUser.save({ session: sess });
  await sess.commitTransaction();

  res.status(200).json({ user: currUser });
});

exports.createMovement = createMovement;
