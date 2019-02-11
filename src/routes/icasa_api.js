const express = require('express');
const router = express.Router();
const ctrlCrop = require('../apis/icasaCropCode.controller')
const ctrlMeasures = require('../apis/icasaMeasures.controller')

// routes

router.route('/cropcodes').get(ctrlCrop.index);

router.route('/measures').get(ctrlMeasures.index);

router.post('/measures/validator_names', ctrlMeasures.validatorNames);
//router.get('/cropcodes/{id}', getCropById);



module.exports = router;