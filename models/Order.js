import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js'; // Import User model for the association

const Order = sequelize.define('Order', 
    {
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending',  // 'completed', 'canceled', etc.
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, 
    {
        timestamps: true,
    });

// Association: An order belongs to a user
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

export default Order;
