const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const pokemonsController = require('../controllers/pokemons');

// Validation middleware error
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// CRUD Stuff or Pokedex
router.get('/', pokemonsController.getAllPokemons);

router.get('/:id',
  param('id').isMongoId().withMessage('Invalid ID format'),
  validate,
  pokemonsController.getSinglePokemon
);

router.post('/',
  body('name').notEmpty().withMessage('Name is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('releaseDate').isDate().withMessage('Valid release date required'),
  validate,
  pokemonsController.createPokemon
);

router.put('/:id',
  param('id').isMongoId(),
  body('name').notEmpty(),
  body('type').notEmpty(),
  body('releaseDate').isDate(),
  validate,
  pokemonsController.updatePokemon
);

router.delete('/:id',
  param('id').isMongoId(),
  validate,
  pokemonsController.deletePokemon
);

module.exports = router;
