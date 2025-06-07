const express = require("express")
const dotenv = require("dotenv") 
dotenv.config() 
const cors = require("cors")
const connectDB = require("./data/database")
const setupSwagger = require("./swagger")


dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
const pokemonRoutes = require("./routes/pokemonRoutes")
app.use("/pokemon", pokemonRoutes)

const itemRoutes = require("./routes/itemRoutes")
app.use("/items", itemRoutes)


// Swagger
setupSwagger(app)

// Connect to DB and Start Server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
})
