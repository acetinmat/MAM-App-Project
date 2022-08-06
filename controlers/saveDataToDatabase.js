const Data = require('../models/data.model');
const moment = require('moment-timezone');

module.exports = async function (chunkHolder) {
    let dataObj = {};
    let string = "";
    let d_index = null;
    console.log('Chunk: ', chunkHolder.chunk);
    d_index = chunkHolder.chunk.indexOf(';'); // Find the delimiter
    while (d_index > -1) {
        try {
            string = chunkHolder.chunk.substring(0, d_index); // Create string up until the delimiter
            dataObj = JSON.parse(string); // Parse the current string
            console.log('Parsed data from chunk: ', dataObj);
            const data = new Data(dataObj);
            await data.save();
            console.log(`Data saved to the database: ${data}`);
        } catch (ex) {
            console.log('Error: ', ex);
        }
        chunkHolder.chunk = chunkHolder.chunk.substring(d_index + 1); // Cuts off the processed chunk
        d_index = chunkHolder.chunk.indexOf(';'); // Find the new delimiter
    }
}