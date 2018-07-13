import * as Sequelize from 'sequelize';
import { sequelize } from '../index';

export interface UserProfileAddModel {
  user_id: number;
  display_name: string;
  short_bio?: string;
}

export interface UserProfileModel
  extends Sequelize.Model<UserProfileModel, UserProfileAddModel> {
  id: number;
  email: string;
  password: string;
  created_at: Sequelize.DataTypeDateOnly;
}

export interface UserViewModel {
  id: number;
  email: string;
}

const UserProfile: Sequelize.Model<
  UserProfileModel,
  UserProfileAddModel
> = sequelize.define<UserProfileModel, UserProfileAddModel>(
  'user_profiles',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // user_id: Sequelize.UUID,(foreignkey)
    display_name: {
      type: Sequelize.STRING,
      unique: true
    },
    short_bio: Sequelize.TEXT,
    thumnail: Sequelize.STRING
  },
  {
    timestamps: true
  }
);

export default UserProfile;
