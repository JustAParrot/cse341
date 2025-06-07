const Pokemon = require("../models/pokemonModel")

// GET all Pokémon
const getAllPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.find()
    res.status(200).json(pokemon)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Pokémon." })
  }
}

// GET one Pokémon by ID
const getPokemonById = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.pokemonId)
    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found." })
    }
    res.status(200).json(pokemon)
  } catch (err) {
    res.status(500).json({ error: "Error retrieving Pokémon." })
  }
}

// POST create new Pokémon
const createPokemon = async (req, res) => {
  try {
    const newPokemon = new Pokemon(req.body)
    const saved = await newPokemon.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: "Invalid Pokémon data." })
  }
}

// PUT update Pokémon
const updatePokemon = async (req, res) => {
  try {
    const updated = await Pokemon.findByIdAndUpdate(
      req.params.pokemonId,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updated) {
      return res.status(404).json({ error: "Pokémon not found." })
    }
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ error: "Update failed." })
  }
}

// DELETE Pokémon
const deletePokemon = async (req, res) => {
  try {
    const deleted = await Pokemon.findByIdAndDelete(req.params.pokemonId)
    if (!deleted) {
      return res.status(404).json({ error: "Pokémon not found." })
    }
    res.status(200).json({ message: "Pokémon deleted." })
  } catch (err) {
    res.status(500).json({ error: "Deletion failed." })
  }
}

module.exports = {
  getAllPokemon,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon
}
