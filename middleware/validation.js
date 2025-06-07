const { body, validationResult } = require("express-validator")

// Validation rules for Pokémon creation/update
const pokemonRules = () => [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required."),
  body("type")
    .isArray({ min: 1 }).withMessage("Type must be an array with at least one type."),
  body("level")
    .isInt({ min: 1 }).withMessage("Level must be a number >= 1."),
  body("trainer")
    .trim()
    .notEmpty().withMessage("Trainer name is required.")
]

// Validation rules for Item creation/update
const itemRules = () => [
  body("name")
    .trim()
    .notEmpty().withMessage("Item name is required."),
  body("effect")
    .trim()
    .notEmpty().withMessage("Effect is required."),
  body("quantity")
    .isInt({ min: 1 }).withMessage("Quantity must be a positive integer."),
  body("trainer")
    .trim()
    .notEmpty().withMessage("Trainer name is required.")
]

// Middleware to check validation results
const checkPokemonData = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}


module.exports = {
  pokemonRules,
  checkPokemonData,
  itemRules,
  checkItemData: checkPokemonData 
}

