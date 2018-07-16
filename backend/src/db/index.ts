import * as Sequelize from 'sequelize';
import config, { IDbConfig } from '../../config';

const {
  database_name,
  username,
  password,
  dialect,
  host,
  port
}: IDbConfig = config.db_config_aws;
console.log(host);

export const sequelize: Sequelize.Sequelize = new Sequelize(
  database_name,
  username,
  password,
  {
    host: host,
    dialect: dialect,
    port: port
  }
);
