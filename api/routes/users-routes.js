const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.get("/", authController.protect, userController.getUsers);

router.delete("/", authController.protect, userController.deleteUser);

module.exports = router;
