import * as Sequelize from 'sequelize';
import { sequelize } from '..';
import UserProfile from './UserProfile';

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

const User: Sequelize.Model<UserModel, UserAddModel> = sequelize.define<
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

User.associate = function () {
  User.hasOne(UserProfile, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
};

export default User;
