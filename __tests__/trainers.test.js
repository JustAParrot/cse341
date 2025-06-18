const request = require("supertest")
const app = require("../server")

const token = "" 

describe("GET /trainers", () => {
  it("should return a list of trainers", async () => {
    const res = await request(app)
      .get("/trainers")
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})

afterAll(async () => {
  const mongoose = require("mongoose")
  await mongoose.connection.close()
})
