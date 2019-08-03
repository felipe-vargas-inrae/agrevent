const express = require('express');
const router = express.Router();
//const userService = require('./user.service');
const ctrl= require('../apis/icasa_etl.controller')

// routes
router.get('/download_doc', ctrl.downloadDoc);

router.get('/create_schemas', ctrl.createSchemas);

router.get('/clean_files', ctrl.cleanFiles);

router.get('/create_tables', ctrl.createTables);


module.exports = router;