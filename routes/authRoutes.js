const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { body } = require("express-validator")

// Signup
router.post("/signup", [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 })
], authController.signup)

// Login
router.post("/login", [
  body("email").isEmail(),
  body("password").notEmpty()
], authController.login)

module.exports = router
