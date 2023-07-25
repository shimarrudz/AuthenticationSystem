const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Autenticação API',
      version: '1.0.0',
      description: 'API para gerenciamento de autenticação de usuários',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  },
  apis: ['./src/**/*.controller.ts'], 
};

const specs = swaggerJsDoc(options);

function SwaggerModule(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = SwaggerModule;
