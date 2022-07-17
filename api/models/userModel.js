const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "Your first name is missing!"] },
  secondName: { type: String, required: [true, "Your second name is missing!"] },
  gender: {
    type: String,
    enum: ["male", "female", "else"],
    required: [true, "Your gender is missing!"],
  },
  email: {
    type: String,
    required: [true, "Your email is missing!"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Your password is missing!"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    // required: [true, "Your confirmPassword is missing!"],
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  birthYear: {
    type: Number,
    required: [true, "Your birth year is missing!"],
  },
  movements: [{ type: mongoose.Schema.ObjectId, ref: "Movement" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
    next();
  } else {
    return next();
  }
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
