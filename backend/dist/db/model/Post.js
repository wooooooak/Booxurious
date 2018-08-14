'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _ = require('..');

var _2 = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = _.sequelize.define('post', {
  id: {
    type: _sequelize2.default.UUID,
    defaultValue: _sequelize2.default.UUIDV1,
    primaryKey: true
  },
  title: _sequelize2.default.STRING,
  fk_user_id: _sequelize2.default.UUID,
  subTitle: _sequelize2.default.TEXT,
  content: _sequelize2.default.TEXT,
  book_cover: _sequelize2.default.STRING
}, {
  timestamps: true,
  charset: 'utf8'
});

Post.associate = function associate() {
  Post.belongsTo(_2.User, {
    foreignKey: 'fk_user_id',
    onDelete: 'CASCADE',
    onUpdate: 'restrict'
  });
  Post.belongsToMany(_2.Category, {
    onDelete: 'CASCADE',
    onUpdate: 'restrict',
    through: {
      model: 'posts_categories'
    },
    foreignKey: 'fk_post_id'
  });
  Post.belongsToMany(_2.Tag, {
    onDelete: 'CASCADE',
    onUpdate: 'restrict',
    through: {
      model: 'posts_tags'
    },
    foreignKey: 'fk_tag_id'
  });
};

exports.default = Post;