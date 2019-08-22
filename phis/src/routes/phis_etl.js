const express = require('express');
const router = express.Router();
//const userService = require('./user.service');
const ctrl= require('../apis/phis_etl.controller')

// routes
router.get('/get_experiments', ctrl.getExperiments);
router.get('/create_experiment_schemas', ctrl.createExperimentsSchemas)
//router.get('/load_experiments_db', ctrl.loadExperimentsDB);

// routes
router.get('/create_enviroments_schemas', ctrl.createEnvironmentsSchemas)
router.get('/get_environments/:experimentURI', ctrl.getEnvironmentsByExperiment)


//img 
router.get('/create_imagen_analysis_schemas', ctrl.createImagenAnalysisSchemas)
router.get('/get_imagen_analysis/:experimentURI', ctrl.getImagenAnalysisByExperiment)


// weigthing
router.get('/create_weighing_schemas', ctrl.createWeighingSchemas)
router.get('/get_weighing/:experimentURI', ctrl.getWeighingByExperiment)

// plants
router.get('/create_plants_schemas', ctrl.createPlantsSchemas)
router.get('/get_plants/:experimentURI', ctrl.getPlantsByExperiment)

// watering
router.get('/create_watering_schemas', ctrl.createWateringSchemas)
router.get('/get_watering/:experimentURI', ctrl.getWateringByExperiment)

// watering
router.get('/create_watering_schemas', ctrl.createWateringSchemas)
router.get('/get_watering/:experimentURI', ctrl.getWateringByExperiment)

// watering
router.get('/create_germplasms_schemas', ctrl.createGermplasmsSchemas)
router.get('/get_germplasms/:experimentURI', ctrl.getGermplasmsByExperiment)
// al parecer en el servicio plants se encuentra toda la informacion correspondiente a phenotiping

router.get('/get_all_environments/', ctrl.getAllEnvironments)
router.get('/get_all_images_anaysis/', ctrl.getAllImagesAnalysis)
router.get('/get_all_weighing/', ctrl.getAllWeighing)
router.get('/get_all_plants/', ctrl.getAllPlants)
router.get('/get_all_watering/', ctrl.getAllWatering)
router.get('/get_all_germplasms/', ctrl.getAllGermplasms)

module.exports = router;