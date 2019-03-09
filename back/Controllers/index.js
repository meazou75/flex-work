const router = require('express').Router();
const DataController = require('./DataController');

// Utilisation de /data pour le controller dataController
router.use('/data', DataController);

module.exports = router;
