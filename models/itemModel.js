const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  effect: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  trainer: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Item", itemSchema)
