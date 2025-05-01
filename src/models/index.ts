import { Sequelize } from 'sequelize';
import configFile from '../config/config';
import { Carga } from './carga';
import { TipoCarga } from './tipocarga';
import { Zona } from './zona';
import { Transportista } from './transportista';
import { TipoVehiculo } from './tipovehiculo';


const env = (process.env.NODE_ENV || 'development') as keyof typeof configFile;

const config = configFile[env]; 

const sequelize = new Sequelize({
  dialect: config.dialect,
  storage: config.storage
});

const db = {
  sequelize,
  Sequelize,
  Carga: Carga.initModel(sequelize),
  TipoCarga: TipoCarga.initModel(sequelize),
  Zona: Zona.initModel(sequelize),
  Transportista: Transportista.initModel(sequelize),
  TipoVehiculo: TipoVehiculo.initModel(sequelize)
};


db.Carga.associate?.(db);
db.TipoCarga.associate?.(db);

export default db;