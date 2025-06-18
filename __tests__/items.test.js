const request = require("supertest")
const app = require("../app") 
const mongoose = require("mongoose")
const Item = require("../models/itemModel")

beforeAll(async () => {
  await Item.create({ name: "Potion", description: "Heals 20HP", price: 100 })
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
