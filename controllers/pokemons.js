const { getDb } = require('../data/database');

const getAllPokemons = async (req, res) => {
  try {
    const db = getDb();
    const pokemons = await db.collection('pokemons').find().toArray();
    res.status(200).json(pokemons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPokemon = async (req, res) => {
  try {
    const { name, type, releaseDate } = req.body;
    const db = getDb();
    const result = await db.collection('pokemons').insertOne({ name, type, releaseDate });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPokemons,
  createPokemon
};
