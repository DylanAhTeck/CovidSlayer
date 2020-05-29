const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const logger = require('./middleware/logger');
const chalk = require('chalk');

//Use for logging - delete later if not required

const morgan = require('morgan');

const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

//app.use(morgan('dev'));

//Route files
const auth = require('./routes/auth.js');
const game = require('./routes/game.js');

const PORT = process.env.PORT || 5000;

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

app.use(logger);

//Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/game', game);

app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    chalk.yellowBright.underline(
      `Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
    )
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message}`);

  //Close server and exit process with failure
  server.close(() => process.exit(1));
});

module.exports = app;
