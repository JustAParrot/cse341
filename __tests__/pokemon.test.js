const request = require("supertest")
const mongoose = require("mongoose")
const { app, startServer } = require("../server")

let server

beforeAll(async () => {
  server = await startServer()
})

afterAll(async () => {
  await mongoose.connection.close()
  await server.close()
})

describe("GET /pokemon", () => {
  it("should return a list of Pokémon", async () => {
    const res = await request(server).get("/pokemon")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  }, 10000)
})
