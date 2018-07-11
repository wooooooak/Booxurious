import * as Sequelize from 'sequelize';

const db = 'elebooks';
const username = 'postgres';
const password = 'getover1';

export const sequelize: Sequelize.Sequelize = new Sequelize(
  db,
  username,
  password,
  {
    host: 'localhost',
    dialect: 'postgresql',
    port: 5432
  }
);
