import { sequelize } from '.';

import User from './model/User';
import UserProfile from './model/UserProfile';
import SocialAccount from './model/SocialAccount';

export const sync = () => {
  User.hasMany(SocialAccount, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
  User.hasOne(UserProfile, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
  sequelize.sync();
};
