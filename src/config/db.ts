import dotenv from 'dotenv';

// Cargar el archivo correcto según el entorno
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

import db from '../models';


const initDatabase = async () => {
  try {    await db.sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ force: false }); 
      console.log('Modelos sincronizados con la base de datos.');
    }
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

export default initDatabase;