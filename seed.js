import { User, Role, Product, Category } from './models/index.js';

const seedData = async () => {
    try {
        // Create roles
        const adminRole = await Role.create({ name: 'admin' });
        const userRole = await Role.create({ name: 'user' });

        // Create users
        const user1 = await User.create({ name: 'John Doe', email: 'john@example.com', password: '123456' });
        const user2 = await User.create({ name: 'Jane Doe', email: 'jane@example.com', password: '123456' });

        // Assign roles
        await user1.addRole(adminRole);  // User1 is admin
        await user2.addRole(userRole);   // User2 is a regular user
        await user1.addRole(userRole);   // User1 has both roles

        // Create categories
        const phoneCategory = await Category.create({ name: 'Phone Accessories' });
        const laptopCategory = await Category.create({ name: 'Laptop Accessories' });

        // Create products
        const product1 = await Product.create({
            name: 'iPhone 12 Case',
            description: 'Durable case for iPhone 12.',
            price: 19.99,
            stock: 100,
        });

        const product2 = await Product.create({
            name: 'Laptop Stand',
            description: 'Ergonomic stand for laptops.',
            price: 29.99,
            stock: 50,
        });

        // Assign categories to products
        await product1.addCategory(phoneCategory); // iPhone 12 Case in Phone Accessories
        await product2.addCategory(laptopCategory); // Laptop Stand in Laptop Accessories

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
};

seedData();
