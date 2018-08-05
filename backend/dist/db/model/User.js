'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _.sequelize.define('user', {
  id: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV1,
    primaryKey: true
  },
  username: _sequelize2.default.STRING,
  email: {
    type: _sequelize2.default.STRING,
    unique: true
  },
  // password: Sequelize.STRING,
  socialProvider: _sequelize2.default.STRING
}, {
  timestamps: true,
  charset: 'utf8'
});

exports.default = User;