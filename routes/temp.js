const moment = require('moment');
const express = require('express');
const router = express.Router();
const Data = require('../models/data.model');

router.get('/', async (req, res) => {
    const data = await Data.find()
        .sort('createdAt')
        .select(['temp', 'createdAt']);
    res.send(data);
});

router.get('/lastweek', async (req, res) => {
    const data = await Data.find({ createdAt: { $lte: Date.now(), $gte: Date.now() - 7 * 60 * 60 * 24 * 1000 } })
        .sort('createdAt')
        .select(['temp', 'createdAt']);
    res.send(data);
});

router.get('/today', async (req, res) => {
    // start today
    const start = moment().startOf('day');
    // end today
    const end = moment().endOf('day');
    const data = await Data.find({ createdAt: { $lte: end, $gte: start } })
        .sort('createdAt')
        .select(['temp', 'createdAt']);
    res.send(data);
});

module.exports = router;