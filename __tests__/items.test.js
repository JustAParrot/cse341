const request = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const Item = require("../models/itemModel")
const Trainer = require("../models/trainerModel")

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI)

  await Trainer.deleteMany({ email: "test@example.com" })

  const trainer = await Trainer.create({
    name: "Test Trainer",
    email: "test@example.com",
    password: "123456"
  })

  await Item.create({
    name: "Potion",
    description: "Heals HP",
    price: 100,
    quantity: 5,
    effect: "Restore 20 HP",
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
