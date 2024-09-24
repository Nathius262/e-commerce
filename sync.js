import sequelize from './config/database.js';
//import { User, Role, Product, Category, Order, Cart } from './models/index.js';

async function syncDatabase() {
    try {
        await sequelize.sync({ alter:true }); // force: true will drop tables if they exist
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

syncDatabase();
