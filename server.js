const app = require("./app")
const connectDB = require("./data/database")

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
}
