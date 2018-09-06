import Sequelize from 'sequelize';
import { sequelize } from '..';

import { Post, Work } from './';

const Category = sequelize.define(
  'category',
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

Category.associate = function associate () {
  // Post도 belongsToMay Category이기 때문에
  // 자동으로 posts_categories 라는 테이블이 생긴다.
  // Category.belongsToMany(Post, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'restrict',
  //   through: {
  //     model: 'posts_categories'
  //   },
  //   foreignKey: 'fk_category_id'
  // });
  // Category.belongsToMany(Work, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'restrict',
  //   through: {
  //     model: 'works_categories'
  //   },
  //   foreignKey: 'fk_category_id'
  // });
};

export default Category;
