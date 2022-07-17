const mongoose = require("mongoose");

const movementSchema = new mongoose.Schema({
  movement: { type: Number, required: [true, "Movement is missing!"] },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Movement must belong to a user"],
  },
  from: { type: String, default: "Unknown" },
  to: { type: String, default: "Unknown" },
  message: { type: String, default: "No message..." },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

movementSchema.index({ user: 1 });

const Movement = mongoose.model("Movement", movementSchema);

module.exports = Movement;
