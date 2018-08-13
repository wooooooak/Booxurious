import Sequelize from 'sequelize';
import { sequelize } from '..';

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  title: Sequelize.STRING,
  subTitle: Sequelize.TEXT,
  content: Sequelize.TEXT,
  book_cover: Sequelize.STRING
});
