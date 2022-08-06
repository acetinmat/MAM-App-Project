const express = require('express');
const router = express.Router();
const Data = require('../models/data.model');

router.get('/', async (req, res) => {
    const data = await Data.find().sort('createdAt');
    res.send(data);
});

router.delete('/', async (req, res) => {

    let count = 0;

    try {
        await Data.deleteMany({ time: "0:21:14", temp: 31.66 }, function(error, numberRemoved) {
            // if (numberRemoved === 0) res.status(404).send('Error: ', error);
            count = numberRemoved;
        });      
    } catch (error) {
        res.status(500).send('Something failed.');
        return;
    }

    console.log(`${ count } document(s) deleted.`);
    res.send(`${ count } document(s) deleted.`);
});

module.exports = router;