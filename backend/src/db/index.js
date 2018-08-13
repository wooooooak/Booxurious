import Sequelize from 'sequelize';
import { config } from '../config';

const { database_name, username, password, dialect, host, port } = config.db_config_aws;

export const sequelize = new Sequelize(database_name, username, password, {
  host: host,
  dialect: dialect,
  port: port
});
