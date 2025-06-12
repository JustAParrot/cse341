const Battle = require("../models/battleModel")

// GET all battles
const getAllBattles = async (req, res) => {
  try {
    const battles = await Battle.find()
    res.status(200).json(battles)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch battles." })
  }
}

// GET one battle by ID
const getBattleById = async (req, res) => {
  try {
    const battle = await Battle.findById(req.params.battleId)
    if (!battle) return res.status(404).json({ error: "Battle not found." })
    res.status(200).json(battle)
  } catch (err) {
    res.status(500).json({ error: "Error retrieving battle." })
  }
}

// POST new battle
const createBattle = async (req, res) => {
  try {
    const newBattle = new Battle(req.body)
    const saved = await newBattle.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: "Invalid battle data." })
  }
}

// PUT update battle
const updateBattle = async (req, res) => {
  try {
    const updated = await Battle.findByIdAndUpdate(req.params.battleId, req.body, {
      new: true,
      runValidators: true
    })
    if (!updated) return res.status(404).json({ error: "Battle not found." })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ error: "Update failed." })
  }
}

// DELETE battle
const deleteBattle = async (req, res) => {
  try {
    const deleted = await Battle.findByIdAndDelete(req.params.battleId)
    if (!deleted) return res.status(404).json({ error: "Battle not found." })
    res.status(200).json({ message: "Battle deleted." })
  } catch (err) {
    res.status(500).json({ error: "Deletion failed." })
  }
}

module.exports = {
  getAllBattles,
  getBattleById,
  createBattle,
  updateBattle,
  deleteBattle
}
