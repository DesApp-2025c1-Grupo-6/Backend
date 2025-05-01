import express from 'express';
import dotenv from 'dotenv';
import db from './models';

import routerZonas from './routes/routesZonas';
import routesCargas from './routes/routesCarga';
import routesTipoCargas from './routes/routesTipoCarga';
import routesTransportista from './routes/routesTransportista';
import routesTipoVehiculo from './routes/routesTipoVehiculo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


const initDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
    
    
    await db.sequelize.sync({ force: process.env.NODE_ENV === 'development' });
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};


initDatabase();

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Servidor funcionando con TypeScript y SQLite XD!');
});

app.use('/zonas', routerZonas); 
app.use('/cargas', routesCargas);
app.use('/tipocargas', routesTipoCargas);
app.use('/transportistas', routesTransportista);
app.use('/tipovehiculos', routesTipoVehiculo);



app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
