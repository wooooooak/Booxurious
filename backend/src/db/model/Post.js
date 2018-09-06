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
    postTitle: Sequelize.STRING,
    subTitle: Sequelize.TEXT,
    editorState: Sequelize.TEXT,
    bookCoverImg: Sequelize.STRING,
    like: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    rate: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
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
  Post.belongsTo(Category, {
    foreignKey: 'fk_category_id',
    onDelete: 'CASCADE',
    onUpdate: 'restrict'
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
