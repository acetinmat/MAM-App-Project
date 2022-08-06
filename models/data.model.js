const mongoose = require('mongoose');
const moment = require('moment-timezone');



const dataSchema = mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    hum: {
        type: Number,
        required: true
    },
    pres: {
        type: Number,
        required: true
    },
    vol: {
        type: Number,
        required: true
    },
    createdAt: { 
        type: Date,
        default: moment(Date.now()).tz("Europe/Istanbul").format()
    }
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;