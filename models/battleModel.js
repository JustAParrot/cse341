const mongoose = require("mongoose")

const battleSchema = new mongoose.Schema({
  trainer1: {
    type: String,
    required: true
  },
  trainer2: {
    type: String,
    required: true
  },
  winner: {
    type: String,
    required: true
  },
  pokemon1: {
    type: String,
    required: true
  },
  pokemon2: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Battle", battleSchema)
