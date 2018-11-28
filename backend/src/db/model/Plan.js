import Sequelize from 'sequelize';
import { sequelize } from '..';

import User from './User';

const Plan = sequelize.define(
	'plan',
	{
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true
		},
		// type: {
		// 	type: Sequelize.INTEGER,
		// 	defaultValue: 0
		// },
		bookTitle: {
			type: Sequelize.STRING,
			allowNull: false
		},
		author: {
			type: Sequelize.STRING
		},
		rating: {
			type: Sequelize.INTEGER
		}
		// 읽은 날짜?
	},
	{
		timestamps: true,
		charset: 'utf8'
	}
);

Plan.associate = function associate() {
	Plan.belongsTo(User, {
		foreignKey: 'fk_user_id',
		onDelete: 'CASCADE',
		onUpdate: 'restrict'
	});
};

export default Plan;
