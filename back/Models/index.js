const mongoose = require('mongoose');
const DataModel = require('./DataModel');

// Connexion au serveur MongoDB

mongoose
    .connect(
        'mongodb://149.91.89.41/flex-work',
        { useNewUrlParser: true }
    )
    .catch(() => console.error('Cannot connect to mongodb'));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    DataModel
};
