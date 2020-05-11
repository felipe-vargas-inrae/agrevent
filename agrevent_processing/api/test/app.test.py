
# Path hack.
import sys, os
import pathlib
parent_path = str(pathlib.Path(__file__).parent.parent.absolute())
sys.path.insert(0, parent_path)

import json
import unittest
from web_app import app,  PREPROCESSING_URL, JOINER_CORR_URL, ML_URL
from  helpers.messages import Messages
from data import  pipeline_data_summary, pipeline_data_timeseries, pipeline_data_joiner, ml_run_data

from helpers.singleton_spark_session import SingletonSparkSession
from models.schema_validator import SchemaValidator

class BasicTestCase(unittest.TestCase):

    # executed prior to each test
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()
    # def tearDown(self):
    #     spark_session=SingletonSparkSession.getInstance()
    #     spark_session.stop_spark_session()

    def test_home(self):
        response = self.app.get('/', content_type='html/text')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, Messages.HOME.encode('UTF-8'))

    def test_preprocessing_pipelines_summary(self):
        response = self.app.post(PREPROCESSING_URL, data=json.dumps(pipeline_data_summary()),
                       content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response_dict = json.loads(response.data)
        self.assertTrue(SchemaValidator.validate_summary_response(response_dict))

    def test_preprocessing_pipelines_timeseries(self):
        response = self.app.post(PREPROCESSING_URL, data=json.dumps(pipeline_data_timeseries()),
                       content_type='application/json')

        self.assertEqual(response.status_code, 200)
        response_dict = json.loads(response.data)
        self.assertTrue(SchemaValidator.validate_summary_response(response_dict))

    def test_preprocessing_pipelines_join(self):
        response = self.app.post(PREPROCESSING_URL, data=json.dumps(pipeline_data_joiner()),
                       content_type='application/json')

        self.assertEqual(response.status_code, 200)
        response_dict = json.loads(response.data)
        self.assertTrue(SchemaValidator.validate_summary_response(response_dict))
     
    def test_joiner_correlations(self):
        response_pipelines = self.app.post(PREPROCESSING_URL, data=json.dumps(pipeline_data_joiner()),
                       content_type='application/json') # change the app state
        response = self.app.get(JOINER_CORR_URL,content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.data) # json data different of null 

    def test_ml_run(self):
        response_pipelines = self.app.post(PREPROCESSING_URL, data=json.dumps(pipeline_data_joiner()),
                       content_type='application/json') # change the app state
        response_ml = self.app.post(ML_URL, data=json.dumps(ml_run_data()),
                       content_type='application/json') 
        self.assertEqual(response_ml.status_code, 200)
        self.assertIsNotNone(response_ml.data) # json data different of null 

       
        
    
if __name__ == "__main__":
    unittest.main()


