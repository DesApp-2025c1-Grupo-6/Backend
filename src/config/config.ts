import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

interface DBConfig {
  dialect: Dialect;
  storage: string;
}

interface Config {
  development: DBConfig;
  test: DBConfig;
  production: DBConfig;
}

const config: Config = {
  development: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || 'dev.sqlite',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || 'prod.sqlite',
  }
};

export default config;