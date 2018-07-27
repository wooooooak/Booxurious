import * as Sequelize from 'sequelize';
import { sequelize } from '..';

export interface SocialAccountAddModel {
  email: string;
  user_id: number;
  social_id: string;
  access_token: string;
  provider: string;
}

export interface SocialAccountModel
  extends Sequelize.Model<SocialAccountModel, SocialAccountAddModel> {
  id: number;
  user_id: number;
  social_id: string;
  access_token: string;
  provider: string;
}

export interface UserViewModel {
  id: number;
  user_id: number;
  provider: string;
}

const SocialAccount: Sequelize.Model<
  SocialAccountModel,
  SocialAccountAddModel
> = sequelize.define<SocialAccountModel, SocialAccountAddModel>(
  'social_accounts',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // user_id: Sequelize.UUID, (foreignkey)
    social_id: {
      type: Sequelize.STRING,
      unique: true
    },
    access_token: Sequelize.STRING,
    provider: Sequelize.STRING
  },
  {
    timestamps: false,
    charset: 'utf8'
  }
);

export default SocialAccount;
