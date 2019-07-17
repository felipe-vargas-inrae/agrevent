const express = require('express');
const router = express.Router();
//const userService = require('./user.service');
const ctrl= require('../apis/phis_etl.controller')

// routes
router.get('/get_experiments', ctrl.getExperiments);
router.get('/create_experiment_schemas', ctrl.createExperimentsSchemas)
router.get('/load_experiments_db', ctrl.loadExperimentsDB);

// routes
router.get('/create_enviroments_schemas', ctrl.createEnvironmentsSchemas)
router.get('/get_environments/:experimentURI', ctrl.getEnvironmentsByExperiment)


module.exports = router;