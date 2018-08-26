import Sequelize from 'sequelize';
import { sequelize } from '..';

import { Folder } from './';
import User from './User';

const Work = sequelize.define(
  'work',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    title: Sequelize.TEXT,
    content: Sequelize.TEXT
  },
  {
    timestamps: true,
    charset: 'utf8'
  }
);

Work.associate = function associate () {
  Work.belongsTo(User, {
    foreignKey: 'fk_user_id',
    onDelete: 'CASCADE',
    onUpdate: 'restrict'
  });
  Work.belongsTo(Folder, {
    foreignKey: 'fk_folder_id',
    onDelete: 'CASCADE',
    onUpdate: 'restrict'
  });
};
export default Work;
