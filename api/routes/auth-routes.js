const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/is-logged-in", authController.isLoggedIn);

router.patch("/change-password", authController.protect, authController.changePassword);

module.exports = router;
