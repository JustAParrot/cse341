const express = require("express")
const router = express.Router()
const pokemonController = require("../controllers/pokemonController")
const { pokemonRules, checkPokemonData } = require("../middleware/validation")

// Routes for CRUD operations
router.get("/", pokemonController.getAllPokemon)
router.get("/:pokemonId", pokemonController.getPokemonById)
router.post("/", pokemonController.createPokemon)
router.put("/:pokemonId", pokemonController.updatePokemon)
router.delete("/:pokemonId", pokemonController.deletePokemon)

// Pokemon Route Validation
router.get("/", pokemonController.getAllPokemon)
router.get("/:pokemonId", pokemonController.getPokemonById)
router.post("/", pokemonRules(), checkPokemonData, pokemonController.createPokemon)
router.put("/:pokemonId", pokemonRules(), checkPokemonData, pokemonController.updatePokemon)
router.delete("/:pokemonId", pokemonController.deletePokemon)

module.exports = router


module.exports = router
