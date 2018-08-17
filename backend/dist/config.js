'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = exports.config = {
  db_config: {
    database_name: 'elebooks',
    username: 'root',
    password: 'getover1',
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
  },
  db_config_aws: {
    database_name: 'elebooks',
    username: 'wooooooak',
    password: 'getover1',
    dialect: 'mysql',
    host: 'elebooks-database.cpxyhbvmam5v.ap-northeast-2.rds.amazonaws.com',
    port: 3306
  }
};

var aws_config = exports.aws_config = {
  aws_access_key_id: 'AKIAJERTTKWHGKGWBIOQ',
  aws_secret_access_key: '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',
  aws_region: 'ap-northeast-2'
};