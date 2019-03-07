const router = require('express').Router();
const models = require('../Models');

const addData = async ({ tempCelsius, tempFahrenheit, humidity }) => {
    const newData = new models.DataModel({
        tempCelsius,
        tempFahrenheit,
        humidity
    });
    const errors = {};

    const dataErrors = newData.validateSync();
    if (dataErrors) {
        Object.keys(dataErrors.errors).forEach(
            k => (errors[k] = dataErrors.errors[k].message)
        );
    }

    if (Object.keys(errors).length > 0) {
        throw { code: 400, errors: errors };
    }

    await newData.save();
};

router.post('/', (req, res) => {
    addData(req.body)
        .then(() => res.status(204).end())
        .catch(err => res.status(err.code).json(err.errors));
});

router.get('/', (req, res) => {
    models.DataModel.find().then(datas => res.json(datas));
});

module.exports = router;
