import app from './src/app.js';
import sequelize from './src/database/database.js';

const start = async () => {
		await sequelize.authenticate();
		await sequelize.sync({ alter: true });
		
		await app.listen({ port: 3000, host: '0.0.0.0' });
		app.log.info(`Server running on port ${app.server.address().port}`);
};

start();
