const winston = require('winston');

// Create logger if this is a game
const logger = (req, res, next) => {
  if (req.body.game) {
    const log = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({
          filename: './logs/gameID:' + req.body.game._id + '.log',
          level: 'info'
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        })
      ]
    });
    req.log = log;
  }

  next();
};

module.exports = logger;
