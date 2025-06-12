const Trainer = require("../models/trainerModel")
const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const { name, email, password } = req.body
    const exists = await Trainer.findOne({ email })
    if (exists) return res.status(400).json({ error: "Email already registered." })

    const trainer = new Trainer({ name, email, password })
    await trainer.save()

    res.status(201).json({ message: "Trainer created." })
  } catch (err) {
    res.status(500).json({ error: "Signup failed." })
  }
}

exports.login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const { email, password } = req.body
    const trainer = await Trainer.findOne({ email })
    if (!trainer) return res.status(401).json({ error: "Invalid credentials." })

    const match = await bcrypt.compare(password, trainer.password)
    if (!match) return res.status(401).json({ error: "Invalid credentials." })

    const token = jwt.sign({ id: trainer._id, email: trainer.email }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.status(200).json({ message: "Login successful", token })
  } catch (err) {
    res.status(500).json({ error: "Login failed." })
  }
}
