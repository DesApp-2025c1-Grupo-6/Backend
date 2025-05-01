require("dotenv").config();
const express = require("express");
const db = require("../src/models");
//Agregado:
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./docs/swaggerConfig');

const tarifasRouter = require('./routes/tarifas');
//fin de agregado

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //Agregado
app.use(tarifasRouter); //Agregado

app.get("/", (req, res) => {
  res.send("Servidor funcionando...");
});

// Verifica conexión a la base de datos
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    console.log('Swagger en http://localhost:3000/api-docs'); //Agregado
  });
}).catch(err => console.error("Error al conectar la DB:", err));

module.exports = app;
