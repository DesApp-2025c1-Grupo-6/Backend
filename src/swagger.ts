import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación de API Gestión de tarifa de costos",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
