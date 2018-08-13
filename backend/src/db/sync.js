import { sequelize } from '.';

import { Post, User, Category, Tag } from './model';
export const sync = () => {
  Post.associate();
  // PostsCategories.associate();
  // User.associate();
  Category.associate();
  // Tag.associate();

  sequelize.sync();
};
