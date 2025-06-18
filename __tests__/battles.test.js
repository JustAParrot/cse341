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

describe("GET /battles", () => {
  it("should return a list of battles", async () => {
    const res = await request(server).get("/battles")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  }, 10000)
})
