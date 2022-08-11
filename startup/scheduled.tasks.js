const cron = require('node-cron');
const logger = require('../controlers/logger');
const Data = require('../models/data.model');

module.exports = function () {
    cron.schedule('30 0 * * *', async () => {
        // Delete records older than a week
        try {
            await Data.deleteMany({ createdAt: { $lte: Date.now() - 7 * 60 * 60 * 24 * 1000 }});
            logger.info('*****Old records are deleted from database.*****');            
        } catch (error) {
            logger.error(error.message, error);
        }
    });
    logger.info('A task that removing old records scheduled: Everyday at 00.30');
}