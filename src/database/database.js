import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
		logging: false, // true to log database processes
});

export default sequelize;
