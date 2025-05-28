import { Sequelize } from 'sequelize';
import configFile from '../config/config';
import { Carga } from './carga';
import { TipoCarga } from './tipocarga';
import { Zona } from './zona';
import { Transportista } from './transportista';
import { Vehiculo } from './vehiculo';
import { Adicional } from './adicional';
import { Tarifa } from './tarifa';
import { TarifaAdicional } from './tarifaAdicional';


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
  Vehiculo: Vehiculo.initModel(sequelize),
  Adicional: Adicional.initModel(sequelize),
  Tarifa: Tarifa.initModel(sequelize),
  TarifaAdicional: TarifaAdicional.initModel(sequelize)
};


db.TipoCarga.associate?.(db);
db.Carga.associate?.(db);
db.Zona.associate?.(db);
db.Transportista.associate?.(db);
db.Vehiculo.associate?.(db);
db.Adicional.associate?.(db);
db.Tarifa.associate?.(db);
db.TarifaAdicional.associate?.(db);


export default db;