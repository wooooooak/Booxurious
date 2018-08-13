import Sequelize from 'sequelize';
import { sequelize } from '..';

import { Post } from './';

const Tag = sequelize.define(
  'tag',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    }
  },
  {
    timestamps: true,
    charset: 'utf8'
  }
);

Tag.associate = function associate () {
  Tag.belongsToMany(Posr, {
    onDelete: 'CASCADE',
    through: {
      model: 'posts_tags'
    },
    foreignKey: 'fk_post_id'
  });
};

export default Tag;
