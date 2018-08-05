'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = undefined;

var _ = require('.');

var _User = require('./model/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sync = exports.sync = function sync() {
  // User.hasMany(SocialAccount, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
  // User.hasOne(UserProfile, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
  _.sequelize.sync();
};