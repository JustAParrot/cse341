const request = require("supertest")
const mongoose = require("mongoose")

let server

beforeAll(async () => {
  process.env.NODE_ENV = "test"
  server = require("../server") 
  await new Promise(resolve => setTimeout(resolve, 1000)) 
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("GET /items", () => {
  it("should return a list of items", async () => {
    const res = await request(server).get("/items")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  }, 15000)
})
