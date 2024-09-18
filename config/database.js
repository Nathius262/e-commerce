// config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

// Set up Sequelize to use SQLite in development and PostgreSQL in production
let sequelize;

if (isProduction) {
  // Use PostgreSQL for production (Vercel PostgreSQL)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,  // Use this if SSL is required but certificates aren't provided
      },
    },
    logging: false,  // Disable logging in production
  });
} else {
  // Use SQLite for development
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',  // Save data to the local SQLite file
    logging: true,  // Enable logging in development for debugging
  });
}

export default sequelize;
