const mongoose = require('mongoose');
const DataModel = require('./DataModel');

// Connexion au serveur MongoDB

mongoose
    .connect(
        'mongodb://185.216.25.195/flex-work',
        { useNewUrlParser: true }
    )
    .catch(() => console.error('Cannot connect to mongodb'));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    DataModel
};
