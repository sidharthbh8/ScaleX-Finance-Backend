const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    priceNative: {
        type: Number,
    },
    priceUsd: {
        type: Number,
    },
    volume: {
        h24: {
            type: Number,
        },
        h6: {
            type: Number,
        },
        h1: {
            type: Number,
        },
        m5: {
            type: Number,
        }
    }
});

const Data = mongoose.model('Data', DataSchema);
module.exports = Data;