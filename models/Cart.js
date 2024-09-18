import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js'; // Import User
import Product from './Product.js'; // Import Product

const Cart = sequelize.define('Cart', 
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        timestamps: true,   
    }
);

// Association: A cart item belongs to a user and a product
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Cart, { foreignKey: 'userId' });
Product.hasMany(Cart, { foreignKey: 'productId' });

export default Cart;
