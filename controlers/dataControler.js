const Data = require('../models/data.model');
const q2m = require('query-to-mongo');

module.exports = async function(req, res) {
    const queryObj = q2m(req.query);

    console.log(queryObj);
    console.log(`full: ${req.protocol}://${req.header('host')}${req.baseUrl}${req.path}`);

    const dataCount = await Data.count(queryObj.criteria);
    const data = await Data
        .find(queryObj.criteria, null, queryObj.options)
        .select(queryObj.options.fields)
        .sort(queryObj.options.sort);
    
    const urlString = `${req.protocol}://${req.header('host')}${req.baseUrl}${req.path}`;
    console.log(`urlString: ${req.protocol}://${req.header('host')}${req.baseUrl}${req.path}`);

    const links = queryObj.links(urlString, dataCount);

    res.send(`${dataCount}, ${data}, ${ JSON.stringify(links) }`);
}