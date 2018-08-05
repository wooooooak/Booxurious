'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _config$db_config_aws = _config.config.db_config_aws,
    database_name = _config$db_config_aws.database_name,
    username = _config$db_config_aws.username,
    password = _config$db_config_aws.password,
    dialect = _config$db_config_aws.dialect,
    host = _config$db_config_aws.host,
    port = _config$db_config_aws.port;

console.log(host);

var sequelize = exports.sequelize = new _sequelize2.default(database_name, username, password, {
  host: host,
  dialect: dialect,
  port: port
});