'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _ = require('..');

var _2 = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = _.sequelize.define('tag', {
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

Tag.associate = function associate() {
  Tag.belongsToMany(Posr, {
    onDelete: 'CASCADE',
    through: {
      model: 'posts_tags'
    },
    foreignKey: 'fk_post_id'
  });
};

exports.default = Tag;