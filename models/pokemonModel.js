const mongoose = require("mongoose")

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: [String],
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 1
  },
  trainer: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Pokemon", pokemonSchema)
