const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    sparse: true 
  },
  password: {
    type: String
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  }
})

// Hash password 
trainerSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

module.exports = mongoose.model("Trainer", trainerSchema)
