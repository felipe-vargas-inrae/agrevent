const express = require('express');
const router = express.Router();
const ctrlCrop = require('../apis/icasa_api_crop.controller')
const ctrlMeasures = require('../apis/icasa_api_measures.controller')

// routes

router.route('/cropcodes').get(ctrlCrop.index);

router.route('/measures').get(ctrlMeasures.index);

router.post('/measures/validator_names', ctrlMeasures.validatorNames);
//router.get('/cropcodes/{id}', getCropById);

module.exports = router;