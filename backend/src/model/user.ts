import * as Sequelize from 'sequelize';
import { sequelize } from '../instances/sequelize';

export interface UserAddModel {
  email: string;
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id: number;
  email: string;
  password: string;
  created_at: Sequelize.DataTypeDateOnly;
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
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    create_at: Sequelize.DATEONLY
  },
  {
    timestamps: false
  }
);
