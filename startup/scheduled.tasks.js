const cron = require('node-cron');
const logger = require('../controlers/logger');
const Data = require('../models/data.model');

module.exports = function () {

    const days_before = process.env.DAYS_BEFORE || 7;    // Default: 7 days
    const timezone_string = process.env.TIMEZONE || "Europe/Istanbul";

    cron.schedule(
        '30 0 * * *',
        async () => {
            try {
                await Data.deleteMany({ createdAt: { $lte: Date.now() - days_before * 24 * 60 * 60 * 1000 } });
                logger.info('*****Old records are deleted from database.*****');
            } catch (error) {
                logger.error(error.message, error);
            }
        },
        {
            scheduled: true,
            timezone: timezone_string
        });
    
    logger.info('A task that removing old records scheduled: Everyday at 00.30');
}