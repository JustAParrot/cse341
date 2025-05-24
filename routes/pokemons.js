const express = require('express');
const router = express.Router();
const pokemonsController = require('../controllers/pokemons');

router.get('/', pokemonsController.getAllPokemons);
router.post('/', pokemonsController.createPokemon);

module.exports = router;
