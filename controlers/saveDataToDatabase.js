const Data = require('../models/data.model');
const logger = require('./logger');

module.exports = async function (chunkHolder) {
    let dataObj = {};
    let string = "";
    let d_index = null;
    // logger.info(`Chunk: ${ JSON.parse(chunkHolder.chunk) }`);
    d_index = chunkHolder.chunk.indexOf(';'); // Find the delimiter
    while (d_index > -1) {
        string = chunkHolder.chunk.substring(0, d_index); // Create string up until the delimiter
        try {
            dataObj = JSON.parse(string);
            const data = new Data(dataObj);
            await data.save();
            // logger.info(`Data saved to the database: ${data}`);
            logger.info('Data saved to database.');
        } catch (ex) {
            logger.error(ex.message, ex);
        }
        chunkHolder.chunk = chunkHolder.chunk.substring(d_index + 1); // Cuts off the processed chunk
        d_index = chunkHolder.chunk.indexOf(';'); // Find the new delimiter
    }
}