import User from './User.js';
import Role from './Role.js';
import Product from './Product.js';
import Category from './Category.js';
import Order from './Order.js';
import Cart from './Cart.js';

// User-Role Many-to-Many Relationship
User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });

// Product-Category Many-to-Many Relationship
Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });

export { User, Role, Product, Category, Order, Cart };
