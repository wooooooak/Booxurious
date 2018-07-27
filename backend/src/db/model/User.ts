import * as Sequelize from 'sequelize';
import { sequelize } from '..';
import * as bcrypt from 'bcryptjs';

export interface UserAddModel {
  email: string;
  username: string;
  password?: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id: string;
  email: string;
  username: string;
  password?: string;
}

export interface UserViewModel {
  id: string;
  email: string;
}

const User: Sequelize.Model<UserModel, UserAddModel> = sequelize.define<
  UserModel,
  UserAddModel
>(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    username: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: Sequelize.STRING
  },
  {
    timestamps: true,
    charset: 'utf8'
  }
);

export const hash = (password: string): string => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export default User;
