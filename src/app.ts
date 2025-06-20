import express from 'express';
import initDatabase from './config/db';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import cors from 'cors';
import bodyParser from 'body-parser';
import { generarReporteAdicionales } from './routes/pdf';
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.send('Servidor funcionando con TypeScript y SQLite XD!');
});
// implementar swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta para generar el reporte de adicionales
app.post('/reporte-adicionales', generarReporteAdicionales);

app.use(router);

initDatabase();

export default app;
