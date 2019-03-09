const router = require('express').Router();
const models = require('../Models');

// Fonction prenant en paramètres la temperature et l'humidité et ajoutant en BDD les valeurs 

const addData = async ({ tempCelsius, tempFahrenheit, humidity }) => {

    // Création d'un nouvelle objet de type DataModel

    const newData = new models.DataModel({
        tempCelsius,
        tempFahrenheit,
        humidity
    });

    // Création d'un objet errors qui contiendra les erreurs en cas d'erreurs
    const errors = {};

    // Test de validation des données contenue dans l'objet newData
    const dataErrors = newData.validateSync();

    // Si il existe des erreurs dans dataErrors
    if (dataErrors) {
        // Pour chaque erreurs ajouter à l'objet errors le message d'erreurs renvoyée par Mongoose
        Object.keys(dataErrors.errors).forEach(
            k => (errors[k] = dataErrors.errors[k].message)
        );
    }

    // Si il existe des erreurs dans l'objets errors
    if (Object.keys(errors).length > 0) {
        // Renvoyer un code d'erreur 400 avec l'objets errors
        throw { code: 400, errors: errors };
    }

    // Sinon on sauvegarde en BDD l'objet newData
    await newData.save();
};

// Route qui permet d'inserer dans la BDD une nouvelle donnée (route appelée par l'ESP32)

router.post('/', (req, res) => {
    addData(req.body)
        .then(() => res.status(204).end())
        .catch(err => res.status(err.code).json(err.errors));
});

// Retourne sous forme de tableau d'objets l'ensemble des données stockées dans la BDD

router.get('/', (req, res) => {
    models.DataModel.find().then(datas => res.json(datas));
});

module.exports = router;
