import Sequelize from 'sequelize';
import { config } from '../config';

const getDbConfig = (process, config) => {
	if (process.env.NODE_ENV === 'development') {
		return config.db_config_local;
	} else if (process.env.NODE_ENV === 'production') {
		return config.db_config_aws;
	}
};

const { database_name, username, password, dialect, host, port } = getDbConfig(
	process,
	config
);

export const sequelize = new Sequelize(database_name, username, password, {
	host: host,
	dialect: dialect,
	port: port,
	timezone: '+09:00'
});
