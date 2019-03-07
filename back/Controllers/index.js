const router = require('express').Router();
const DataController = require('./DataController');

router.use('/data', DataController);

module.exports = router;
