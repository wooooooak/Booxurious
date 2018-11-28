import Sequelize from 'sequelize';
import { sequelize } from '..';

import { User } from './';

const Planer = sequelize.define(
	'planer',
	{
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true
		},
		term: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},
	{
		timestamps: true,
		charset: 'utf8'
	}
);

Planer.associate = function associate() {
	Planer.belongsTo(User, {
		foreignKey: 'fk_user_id',
		onDelete: 'CASCADE',
		onUpdate: 'restrict'
	});
};

export default Planer;
