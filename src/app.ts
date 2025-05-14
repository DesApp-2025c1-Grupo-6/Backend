import express from "express";
import initDatabase from "./config/db";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Servidor funcionando con TypeScript y SQLite XD!");
});
// implementar swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(router);

initDatabase();

export default app;
