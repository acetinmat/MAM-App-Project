const cron = require('node-cron');
const Data = require('../models/data.model');

module.exports = function () {
    cron.schedule('30 0 * * *', async () => {
        // Delete records older than a week
        await Data.deleteMany({ createdAt: { $lte: Date.now() - 7 * 60 * 60 * 24 * 1000 }});
        console.log('*****Old records are deleted.*****');
    });
    console.log('A task scheduled: Everyday at 00.30');
}