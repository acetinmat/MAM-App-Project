const winston = require('winston');
require('winston-daily-rotate-file');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.DailyRotateFile({
            filename: '%DATE%-combined.log',
            datePattern: 'YYYY-MM-DD',
            dirname: 'logFiles',
            utc: true,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            maxFiles: '7d'
        }),
        new winston.transports.File({
            filename: 'error.log',
            dirname: 'logFiles',
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ],
    exitOnError: true
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine( 
            winston.format.simple(),
            winston.format.colorize()
        ),
        level: 'debug'
    }));
}

module.exports = logger;