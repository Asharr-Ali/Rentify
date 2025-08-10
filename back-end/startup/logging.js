const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    // Handle Uncaught Exceptions (file only, not console)
    winston.exceptions.handle(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

    // Handle Unhandled Promise Rejections
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    // Log to file
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));

    // Console
    winston.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format(info => info.level === 'info' ? info : false)(),
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
};
