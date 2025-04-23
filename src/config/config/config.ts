import dotenv from 'dotenv';
dotenv.config();

export = {
  development: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE,
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE,
  }
};
