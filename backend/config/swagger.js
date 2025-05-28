const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ExpoArt API',
      version: '1.0.0',
      description: 'API para gestión de exposiciones de arte',
    },
  },
  apis: ['./routes/*.js'], // archivos que contienen las anotaciones
};

const specs = swaggerJsdoc(options);

module.exports = specs;