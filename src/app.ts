import express from 'express';
import initDatabase from './config/db';
import router from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Servidor funcionando con TypeScript y SQLite XD!');
});

app.use(router);

initDatabase();

export default app;