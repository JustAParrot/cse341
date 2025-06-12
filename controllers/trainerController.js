const Trainer = require("../models/trainerModel")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

exports.registerTrainer = async (req, res) => {
  try {
    const trainer = new Trainer(req.body)
    const saved = await trainer.save()
    res.status(201).json({ message: "Trainer registered", trainer: saved })
  } catch (err) {
    res.status(400).json({ error: "Trainer registration failed" })
  }
}

exports.loginTrainer = async (req, res) => {
  try {
    const { email, password } = req.body
    const trainer = await Trainer.findOne({ email })
    if (!trainer || !(await trainer.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" })
    }
    const token = jwt.sign({ id: trainer._id, email: trainer.email }, JWT_SECRET, { expiresIn: "1d" })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: "Login failed" })
  }
}

exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find()
    res.json(trainers)
  } catch (err) {
    res.status(500).json({ error: "Could not fetch trainers" })
  }
}

exports.getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id)
    if (!trainer) return res.status(404).json({ error: "Trainer not found" })
    res.json(trainer)
  } catch (err) {
    res.status(500).json({ error: "Error fetching trainer" })
  }
}

exports.updateTrainer = async (req, res) => {
  try {
    const updated = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ error: "Trainer not found" })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: "Update failed" })
  }
}

exports.deleteTrainer = async (req, res) => {
  try {
    const deleted = await Trainer.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Trainer not found" })
    res.json({ message: "Trainer deleted" })
  } catch (err) {
    res.status(500).json({ error: "Deletion failed" })
  }
}
