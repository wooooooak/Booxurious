import * as Sequelize from 'sequelize';
import { sequelize } from '..';

export interface PostAddModel {
  author: string;
  content: string;
}

export interface PostModel extends Sequelize.Model<PostModel, PostAddModel> {
  id: number;
  author: string;
  content: string;
}

export interface PostViewModel {
  id: number;
  content: string;
}

export const Post: Sequelize.Model<PostModel, PostAddModel> = sequelize.define<
  PostModel,
  PostAddModel
>(
  'post',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    author: Sequelize.STRING,
    content: Sequelize.TEXT
  },
  {
    timestamps: true
  }
);
