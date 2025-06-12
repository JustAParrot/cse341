const mockingoose = require("mockingoose")
const Pokemon = require("../models/pokemonModel")
const { createPokemon } = require("../controllers/pokemonController")

describe("createPokemon controller", () => {
  it("should save a Pokémon and return 201", async () => {
    const req = {
      body: {
        name: "Squirtle",
        type: ["Water"],
        level: 5,
        trainer: "Misty"
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mockingoose(Pokemon).toReturn(req.body, "save")

    await createPokemon(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      name: "Squirtle",
      trainer: "Misty"
    }))
  })

  it("should return 400 if save fails", async () => {
    const req = {
      body: {
        name: "",
        type: [],
        level: 0,
        trainer: ""
      }
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    mockingoose(Pokemon).toReturn(new Error("Validation failed"), "save")

    await createPokemon(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid Pokémon data." })
  })
})
