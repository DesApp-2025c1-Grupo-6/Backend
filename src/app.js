require("dotenv").config();
const express = require("express");
const db = require("../src/models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando...");
});

// Verifica conexión a la base de datos
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}).catch(err => console.error("Error al conectar la DB:", err));

module.exports = app;
