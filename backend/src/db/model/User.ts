import * as Sequelize from 'sequelize';
import { sequelize } from '..';

export interface UserAddModel {
  email: string;
  password_hash: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id: number;
  email: string;
  password_hash: string;
}

export interface UserViewModel {
  id: number;
  email: string;
}

export const User: Sequelize.Model<UserModel, UserAddModel> = sequelize.define<
  UserModel,
  UserAddModel
>(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password_hash: Sequelize.STRING
  },
  {
    timestamps: true
  }
);
