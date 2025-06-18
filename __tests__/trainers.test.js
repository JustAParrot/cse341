const request = require("supertest")
const mongoose = require("mongoose")
const { app, startServer } = require("../server")

let server
const token = "" 

beforeAll(async () => {
  server = await startServer()
})

afterAll(async () => {
  await mongoose.connection.close()
  await server.close()
})

describe("GET /trainers", () => {
  it("should return a list of trainers", async () => {
    const res = await request(server)
      .get("/trainers")
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  }, 10000)
})
