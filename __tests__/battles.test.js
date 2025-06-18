require("dotenv").config()
const request = require("supertest")
const app = require("../server")
const connectDB = require("../data/database")

beforeAll(async () => {
  await connectDB()
}, 10000) 

describe("GET /battles", () => {
  it("should return a list of battles", async () => {
    const res = await request(app).get("/battles")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  }, 10000) 
})

afterAll(async () => {
  const mongoose = require("mongoose")
  await mongoose.connection.close()
})
