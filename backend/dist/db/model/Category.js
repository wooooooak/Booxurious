'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _ = require('..');

var _2 = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Category = _.sequelize.define('category', {
  id: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV1,
    primaryKey: true
  },
  name: {
    type: _sequelize2.default.STRING,
    unique: true
  }
}, {
  timestamps: true,
  charset: 'utf8'
});

Category.associate = function associate() {
  // Post도 belongsToMay Category이기 때문에
  // 자동으로 posts_categories 라는 테이블이 생긴다.
  Category.belongsToMany(_2.Post, {
    onDelete: 'CASCADE',
    onUpdate: 'restrict',
    through: {
      model: 'posts_categories'
    },
    foreignKey: 'fk_category_id'
  });
};

exports.default = Category;