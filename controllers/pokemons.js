const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

const getSinglePokemon = async (req, res) => {
  try {
    const db = getDb();
    const pokemon = await db.collection('pokemons').findOne({ _id: new ObjectId(req.params.id) });
    if (!pokemon) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(pokemon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePokemon = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('pokemons').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePokemon = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('pokemons').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPokemons,
  getSinglePokemon,
  createPokemon,
  updatePokemon,
  deletePokemon
};
