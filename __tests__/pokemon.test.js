const request = require("supertest")
const express = require("express")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

const pokemonRoutes = require("../routes/pokemonRoutes")
const Pokemon = require("../models/pokemonModel")

let app
let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()

  await mongoose.connect(uri)
  
  app = express()
  app.use(express.json())
  app.use("/pokemon", pokemonRoutes)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

afterEach(async () => {
  await Pokemon.deleteMany({})
})

describe("POST /pokemon", () => {
  it("should create a new Pokémon with valid data", async () => {
    const res = await request(app)
      .post("/pokemon")
      .send({
        name: "Pikachu",
        type: ["Electric"],
        level: 10,
        trainer: "Ash"
      })

    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe("Pikachu")
    expect(res.body.level).toBe(10)
  })

  it("should return 400 for invalid data", async () => {
    const res = await request(app)
      .post("/pokemon")
      .send({
        name: "",
        type: [],
        level: 0,
        trainer: ""
      })

    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe("Invalid Pokémon data.")
  })
})
