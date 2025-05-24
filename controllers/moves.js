const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

const getAllMoves = async (req, res) => {
  try {
    const db = getDb();
    const moves = await db.collection('moves').find().toArray();
    res.status(200).json(moves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleMove = async (req, res) => {
  try {
    const db = getDb();
    const move = await db.collection('moves').findOne({ _id: new ObjectId(req.params.id) });
    if (!move) return res.status(404).json({ error: 'Move not found' });
    res.status(200).json(move);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createMove = async (req, res) => {
  try {
    const { name, type, power } = req.body;
    const db = getDb();
    const result = await db.collection('moves').insertOne({ name, type, power });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMove = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('moves').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMove = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('moves').deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMoves,
  getSingleMove,
  createMove,
  updateMove,
  deleteMove
};
