const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Tarifas de Costo',
      version: '1.0.0',
      description: 'Documentación de la API para Acme SRL',
    },
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerSpec };