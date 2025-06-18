const request = require("supertest")
const app = require("../server")
const mongoose = require("mongoose")
const Item = require("../models/itemModel")
const Trainer = require("../models/trainerModel")

beforeAll(async () => {
  // Connect to DB if not already connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI)
  }

  // Create a trainer first
  const trainer = await Trainer.create({
    name: "Test Trainer",
    email: "test@example.com",
    password: "123456" 
  })

  // Create a valid item
  await Item.create({
    name: "Potion",
    description: "Restores health",
    price: 100,
    quantity: 5,
    effect: "Heals 20HP",
    trainer: trainer._id
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe("GET /items", () => {
  it("should return a list of items", async () => {
    const res = await request(app).get("/items")
    console.log("Response body:", res.body)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  }, 15000)
})
