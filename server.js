const app = require("./app")
const connectDB = require("./data/database")

let server

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    const PORT = process.env.PORT || 3000
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
}

// Only export the app for tests. Server will be started manually in tests if needed.
module.exports = { app, startServer: () => {
  return connectDB().then(() => {
    const PORT = process.env.TEST_PORT || 0 
    return app.listen(PORT)
  })
} }
