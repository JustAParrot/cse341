const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const session = require("express-session")
const passport = require("passport")
require("./middleware/passport")
const setupSwagger = require("./swagger")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  }
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/pokemon", require("./routes/pokemonRoutes"))
app.use("/items", require("./routes/itemRoutes"))
app.use("/auth", require("./routes/authRoutes"))
app.use("/battles", require("./routes/battleRoutes"))
app.use("/trainers", require("./routes/trainerRoutes"))

// Swagger
setupSwagger(app)

module.exports = app
