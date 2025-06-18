const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const session = require("express-session")
const passport = require("passport")
require("./middleware/passport")
const connectDB = require("./data/database")
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
const pokemonRoutes = require("./routes/pokemonRoutes")
app.use("/pokemon", pokemonRoutes)

const itemRoutes = require("./routes/itemRoutes")
app.use("/items", itemRoutes)

const authRoutes = require("./routes/authRoutes")
app.use("/auth", authRoutes)

const battleRoutes = require("./routes/battleRoutes")
app.use("/battles", battleRoutes)

const trainerRoutes = require("./routes/trainerRoutes")
app.use("/trainers", trainerRoutes)

// Swagger
setupSwagger(app)

// Connect to DB and Start Server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
