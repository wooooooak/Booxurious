'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sync = undefined;

var _ = require('.');

var _model = require('./model');

var sync = exports.sync = function sync() {
  _model.Post.associate();
  // PostsCategories.associate();
  // User.associate();
  _model.Category.associate();
  // Tag.associate();

  _.sequelize.sync();
};