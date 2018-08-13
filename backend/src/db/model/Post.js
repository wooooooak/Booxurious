import Sequelize from 'sequelize';
import { sequelize } from '..';

import { User, Category, Tag } from './';

const Post = sequelize.define(
  'post',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    title: Sequelize.STRING,
    fk_user_id: Sequelize.UUID,
    subTitle: Sequelize.TEXT,
    content: Sequelize.TEXT,
    book_cover: Sequelize.STRING
  },
  {
    timestamps: true,
    charset: 'utf8'
  }
);

Post.associate = function associate () {
  Post.belongsTo(User, {
    foreignKey: 'fk_user_id',
    onDelete: 'CASCADE',
    onUpdate: 'restrict'
  });
  Post.belongsToMany(Category, {
    onDelete: 'CASCADE',
    onUpdate: 'restrict',
    through: {
      model: 'posts_categories'
    },
    foreignKey: 'fk_post_id'
  });
  Post.belongsToMany(Tag, {
    onDelete: 'CASCADE',
    onUpdate: 'restrict',
    through: {
      model: 'posts_tags'
    },
    foreignKey: 'fk_tag_id'
  });
};

export default Post;
