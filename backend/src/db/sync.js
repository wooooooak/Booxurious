import { sequelize } from '.';

import User from './model/User';

export const sync = () => {
  // User.hasMany(SocialAccount, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
  // User.hasOne(UserProfile, { foreignKey: 'fk_user_id', onDelete: 'CASCADE' });
  sequelize.sync();
};
