import flask
import json
import logging
import time

from flask import Flask, abort
from flask import request
from flask import jsonify
from helpers.singleton_spark_session import SingletonSparkSession

from pyspark_integrator import PysparkIntegrator
from models.schema_validator import SchemaValidator
from flask_cors import CORS
from helpers.error import Erros
from helpers.messages import Messages



app = flask.Flask(__name__)
cors = CORS(app)

#app.config["DEBUG"] = True
API_BASE_URL_V1= '/api/v1'
PREPROCESSING_URL = API_BASE_URL_V1+'/pipelines/preprocessing_pipelines'
ML_URL = API_BASE_URL_V1+'/ml/run_ml'
JOINER_CORR_URL = API_BASE_URL_V1+'/joiner/correlations'


py_spark_integrator=PysparkIntegrator() ## keeps the application state
SingletonSparkSession.getInstance()# init spark session

@app.route('/', methods=['GET'])
def home():
    return Messages.HOME



@app.route(ML_URL, methods=['POST'])
def run_ml():

    if not request.json:
        abort(400)
    validation = SchemaValidator.validate_ml_request_info_schema(request.json)
    if not validation:
        abort(400)

    df_final_json=py_spark_integrator.run_ml(request.json)
    return jsonify(df_final_json)


@app.route(PREPROCESSING_URL,  methods=['POST'])
def preprocessing_pipelines():
    if not request.json:
        abort(400)
    
    validation= SchemaValidator.validate_request_pipeline_joiner(request.json)
    if not validation:
        abort(400)

    rows,columns=py_spark_integrator.preprocessing_pipelines(request.json)

    response= dict(rows=rows,columns=columns)
    return jsonify(response)

@app.route(JOINER_CORR_URL, methods=['GET'])
def joiner_corrrelations():
    return py_spark_integrator.joiner_corrrelations()

# /api/v1/resources/dataframes?name=<df_name>
# @app.route('/api/v1/resources/dataframes')
# def get_dataframe():
#     PARAM='name'
#     if PARAM in request.args:
#         df_name = request.args[PARAM]
#         rows= get_first_n_rows(df_name,10)
#         return jsonify(rows)
#     else:
#         return Erros.ERROR_PARAMETER%(PARAM,PARAM)


@app.errorhandler(404)
def page_not_found(e):
    return Erros.ERROR_404, 404

if __name__ == '__main__':
    app.run()

