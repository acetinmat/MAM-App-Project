const mongoose = require('mongoose');

module.exports = function() {
    const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost/mam-app';
    mongoose.connect(connectionString)
        .then(() => console.log('Connected to MongoDB...'))
        .catch((err) => console.log('Could not connected to the MongoDB: ', err));
}