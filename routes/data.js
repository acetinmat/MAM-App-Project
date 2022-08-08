const express = require('express');
const router = express.Router();
const Data = require('../models/data.model');

router.get('/', async (req, res) => {
    const data = await Data.find().sort('createdAt');
    res.send(data);
});


module.exports = router;