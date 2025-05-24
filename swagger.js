const swaggerUi = require('swagger-ui-express');
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Pokémon API",
    version: "1.0.0",
    description: "Simple API for Pokémon data"
  },
  paths: {
    "/pokemons": {
      get: {
        summary: "Get all Pokémon",
        responses: {
          200: {
            description: "A list of Pokémon"
          }
        }
      },
      post: {
        summary: "Create a new Pokémon",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  type: { type: "string" },
                  releaseDate: { type: "string", format: "date" }
                },
                required: ["name", "type", "releaseDate"]
              }
            }
          }
        },
        responses: {
          201: { description: "Created" }
        }
      }
    }
  }
};

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
