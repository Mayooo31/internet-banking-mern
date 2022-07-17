const express = require("express");
const router = express.Router();

const movementController = require("../controllers/movementController");
const authController = require("../controllers/authController");

router.post("/", authController.protect, movementController.createMovement);

module.exports = router;
