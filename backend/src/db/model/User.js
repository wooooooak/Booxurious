import Sequelize from 'sequelize';
import { sequelize } from '..';

const User = sequelize.define(
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
    // password: Sequelize.STRING,
    socialProvider: Sequelize.STRING
  },
  {
    timestamps: true,
    charset: 'utf8'
  }
);

export default User;
