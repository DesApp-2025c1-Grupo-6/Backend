import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

interface DBConfig {
  dialect: Dialect;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface SQLiteConfig {
  dialect: Dialect;
  storage: string;
}

interface Config {
  development: DBConfig;
  test: SQLiteConfig;
  production: DBConfig;
}

const config: Config = {
  development: {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'backend_user',
    password: process.env.DB_PASSWORD || 'backend_password',
    database: process.env.DB_NAME || 'db_tarifas',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'backend_user',
    password: process.env.DB_PASSWORD || 'backend_password',
    database: process.env.DB_NAME || 'db_tarifas',
  }
};

export default config;