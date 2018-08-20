import { sequelize } from '.';

import { Post, User, Category, Tag, Work, Folder } from './model';
export const sync = () => {
  Post.associate();
  Category.associate();
  Work.associate();
  Folder.associate();

  sequelize.sync();
};
