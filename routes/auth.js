const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');

// Validate middleware errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  validate,
  authController.register
);

router.post('/login',
  body('email').isEmail(),
  body('password').exists(),
  validate,
  authController.login
);

module.exports = router;
