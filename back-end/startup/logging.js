const winston = require ('winston');
require ('winston-mongodb');

module.exports = function () {
    //For UnCaught Exceptions
    winston.exceptions.handle (new winston.transports.File ({ filename: 'uncaughtExceptions.log' }));
    //For UnHandled Rejections
    winston.rejections.handle (new winston.transports.File ({ filename: 'unhandledRejections.log' }));

    //Adding Log Files
    winston.add (new winston.transports.File ({ filename: 'logfile.log' }));
    winston.add (new winston.transports.MongoDB ({ db: 'mongodb://localhost/rentify' }));

    //Transporting message to console after adding in LogFile
    winston.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}