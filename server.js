//main import
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


//custom import
import {internalServerError, pageNotFound} from './middlewares/errorHandler.js'
import staticFiles from "./config/staticFiles.js"
import hbs from "./config/settings.js"
import removeTrailingSlash  from './middlewares/normalizer.js';
import sequelize from './config/database.js';
import './sync.js'; // Sync database

//route import
import rootRouter from './routers/rootRouter.js';

dotenv.config()

// Derive the equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(removeTrailingSlash );

//settings
app.engine('html', hbs.engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON bodies
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//staticfiles
app.use(staticFiles);


app.use('/', rootRouter);


//middlewares\
app.use(pageNotFound);
app.use(internalServerError);



// Start the server
const startServer = async () => {
  try {
    // Sync database
    await sequelize.sync({ alter: true });

    // Optionally seed the database
      // await seedDatabase(); // Uncomment if seeding is needed on every start

      // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
      console.error('Error starting server:', error);
  }
};

startServer();