const Data = require('../models/data.model');
const q2m = require('query-to-mongo');
const logger = require('./logger');

module.exports = async function (req, res, next) {
    logger.debug(`Http request: GET ${req.baseUrl}${req.path}`);
    const queryObj = q2m(req.query);
    let dataCount = {};
    let data = {};
    try {
        dataCount = await Data.count(queryObj.criteria);
        data = await Data
            .find(queryObj.criteria, null, queryObj.options)
            .select(queryObj.options.fields)
            .sort(queryObj.options.sort);

        const urlString = `${req.protocol}://${req.header('host')}${req.baseUrl}${req.path}`;

        const links = queryObj.links(urlString, dataCount);

        const responseObj = {
            dataCount: dataCount,
            data: data,
            links: links
        }

        res.send(responseObj);

    } catch (error) {
        next(error);    // Sends error to the errorMiddleware
    }
}