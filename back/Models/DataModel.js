const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Model utilisé par MongoDB 

const DataSchema = new Schema({
    tempCelsius : { type: Number, required: true },
    tempFahrenheit : { type: Number, required: true },
    humidity : { type: Number, required: true },
    date : { type: Date, default: new Date()}
});

module.exports = mongoose.model('Data', DataSchema);
