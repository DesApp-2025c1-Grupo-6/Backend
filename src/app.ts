import express from 'express';
import initDatabase from './config/db';
import router from './routes';

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Servidor funcionando con TypeScript y SQLite XD!');
});

app.use(router);

initDatabase();

export default app;