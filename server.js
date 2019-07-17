require('rootpath')();
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/swagger.yml');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
//app.use(jwt());

const URI= "mongodb://localhost:27017/iot_db"
const OPTIONS={ useNewUrlParser: true }

//mongoose.connect(URI, OPTIONS);

// api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// api routes
app.use('/icasa_doc', require('./src/routes/icasa_doc'));
app.use('/icasa_api', require('./src/routes/icasa_api'));
app.use('/phis_etl', require('./src/routes/phis_etl'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port); 
});
