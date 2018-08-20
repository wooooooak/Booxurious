import Sequelize from 'sequelize';
import { sequelize } from '..';

import { Category, Folder } from './';
import User from './User';

const Work = sequelize.define('work', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  workTitle: Sequelize.TEXT,
  editorState: Sequelize.TEXT
});

// work has one folder
// folder has many work

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
  // Work.belongsToMany(Category, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'restrict',
  //   through: {
  //     model: 'works_categories'
  //   },
  //   foreignKey: 'fk_work_id'
  // });
};
export default Work;
