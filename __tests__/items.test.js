const request = require("supertest")
const app = require("../app") 
const mongoose = require("mongoose")

beforeAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("GET /items", () => {
  it("should return a list of items", async () => {
    const res = await request(app).get("/items")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  }, 15000)
})
