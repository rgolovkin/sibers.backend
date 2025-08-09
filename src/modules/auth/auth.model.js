import { DataTypes } from 'sequelize';
import sequelize from '../../database/database.js';

const User = sequelize.define('User', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	username: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	gender: {
		type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
		allowNull: false,
	},
	birthdate: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	role: {
		type: DataTypes.ENUM('USER', 'ADMIN'),
		allowNull: false,
		defaultValue: 'USER',
	},
}, {
	timestamps: true,
	createdAt: 'createdAt',
	updatedAt: false,
});

export default User;
