const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model utilisé par MongoDB 

const DataSchema = new Schema({
    tempCelsius : { type: Number, required: true },
    humidity : { type: Number, required: true },
    distance: {type: Number, required: true},
    date : { type: Date, default: Date.now}
});

module.exports = mongoose.model('Data', DataSchema);
