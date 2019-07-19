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
router.get('/get_imagen_analysis/:experimentURI', ctrl.getImagenAnalysisByExperiment)
router.get('/get_germplasm/:experimentURI', ctrl.getGermByExperiment)
router.get('/get_germplasm/:experimentURI', ctrl.getGermByExperiment)
//router.get('/get_plots/:experimentURI', ctrl.getGermByExperiment)
router.get('/get_plants/:experimentURI', ctrl.getGermByExperiment)
// al parecer en el servicio plants se encuentra toda la informacion correspondiente a las plantas
module.exports = router;