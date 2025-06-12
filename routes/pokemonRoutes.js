const express = require("express")
const router = express.Router()
const pokemonController = require("../controllers/pokemonController")
const { pokemonRules, checkPokemonData } = require("../middleware/validation")
const authenticate = require("../middleware/auth") 

// Routes for CRUD operations
router.get("/", pokemonController.getAllPokemon)
router.get("/:pokemonId", pokemonController.getPokemonById)

// Require authentication to create
router.post("/", authenticate, pokemonRules(), checkPokemonData, pokemonController.createPokemon)

// Public PUT and DELETE 
router.put("/:pokemonId", pokemonRules(), checkPokemonData, pokemonController.updatePokemon)
router.delete("/:pokemonId", pokemonController.deletePokemon)

module.exports = router
