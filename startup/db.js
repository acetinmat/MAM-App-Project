const mongoose = require('mongoose');
const logger = require('../controlers/logger');

module.exports = function() {
    const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost/mam-app';
    mongoose.connect(connectionString)
        .then(() => logger.info('Connected to MongoDB...'));
}