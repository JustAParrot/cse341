const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE341 User API',
      version: '1.0.0',
      description: 'API for users',
    },
    servers: [
      {
        url: 'https://cse341-evvf.onrender.com', 
      },
    ],
  },

  //JS Docs to read
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
