const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const movesController = require('../controllers/moves');

// Same validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.get('/', movesController.getAllMoves);

router.get('/:id',
  param('id').isMongoId(),
  validate,
  movesController.getSingleMove
);

router.post('/',
  body('name').notEmpty(),
  body('type').notEmpty(),
  body('power').isNumeric(),
  validate,
  movesController.createMove
);

router.put('/:id',
  param('id').isMongoId(),
  body('name').notEmpty(),
  body('type').notEmpty(),
  body('power').isNumeric(),
  validate,
  movesController.updateMove
);

router.delete('/:id',
  param('id').isMongoId(),
  validate,
  movesController.deleteMove
);

module.exports = router;
