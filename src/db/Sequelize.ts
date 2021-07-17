import path from 'path';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: path.join(__dirname, './database.sqlite')
});

export default sequelize;