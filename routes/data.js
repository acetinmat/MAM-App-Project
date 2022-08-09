const express = require('express');
const router = express.Router();
const dataControler = require('../controlers/dataControler');

router.get('/', dataControler);

module.exports = router;