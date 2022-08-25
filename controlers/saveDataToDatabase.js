const Data = require('../models/data.model');
const logger = require('./logger');
let chunkHolder = require('../models/chunk.holder');

module.exports = async function () {
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
            data.createdAt = Date.now();
            await data.save();
            // logger.info(`Data saved to the database: ${data}`);
            logger.debug('Data saved to database.');
            chunkHolder.chunk = chunkHolder.chunk.substring(d_index + 1); // Cuts off the processed chunk
            d_index = chunkHolder.chunk.indexOf(';'); // Find the new delimiter
            chunkHolder.errorCount = 0;
        } catch (ex) {
            logger.error(ex.message, ex);
            logger.error(`Chunk: ${chunkHolder.chunk}`);
            chunkHolder.errorCount++;
            if (chunkHolder.errorCount > (process.env.ERROR_TOLERANCE || 5 )) {
                logger.error(`${chunkHolder.errorCount} times error occured. Something went wrong.`);
                logger.error('App is terminated.');
                process.exit(1);
            }
            break;
        }
    }
}