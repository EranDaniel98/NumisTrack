const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file'); 
require('winston-mongodb');


const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
);

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxSize: '10m',
            maxFiles: '30d',
        }),

        new DailyRotateFile({
            filename: 'logs/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '10m',
            maxFiles: '30d',
        }),
    ]
});

if (process.env.MONGO_URI) {
    logger.add(new winston.transports.MongoDB({
        db: process.env.MONGO_URI,
        collection: 'logs',
        level: 'error',
        expireAfterSeconds: 60 * 60 * 24 * 30, // 30 days
    }));
}

module.exports = logger;
