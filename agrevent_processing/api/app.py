import flask
import json
import logging
import time

from flask import Flask
from flask import request
from flask import jsonify

from pyspark_helper import PysparkHelper
from flask_cors import CORS

# amazing tutorial https://j2logo.com/tutorial-flask-leccion-10-anadiendo-seguridad-vistas-decoradores/?fbclid=IwAR1ojn18aVJamvKVthR7Vd8AmHRdEZjPevpUTUmJ8b0EZz-QWlsUplegTwI
# flask app and logger
#logging.basicConfig(level=logging.INFO)
#logger = logging.getLogger(__name__)
app = flask.Flask(__name__)
cors = CORS(app)
#app.config["DEBUG"] = True


ERRORS={"parameter_missing":"No %s field provided. Please specify a %s.",
 "404":"<h1>404</h1><p>The resource could not be found.</p>"
}


print("begin the code state one")

my_spark_helper=PysparkHelper()

def init():
    my_spark_helper.init_spark_session()

init()

@app.route('/', methods=['GET'])
def home():
    return "<h1>AgrevenT Processin API</h1><p>This API allows to interact with Spark Methods.</p>"



@app.route('/api/v1/resources/ml/run_ml', methods=['POST'])
def run_ml():

    PARAM1="ModelML"
    PARAM2="target"
    PARAM3="listVariables"

    print(request.json)

    model_name = request.json[PARAM1]
    y = request.json[PARAM2]
    xi = request.json[PARAM3]

    df_final_json=my_spark_helper.run_ml(model_name,y,xi)
    return jsonify(df_final_json)

# /api/v1/resources/dataframes?name=<df_name>
@app.route('/api/v1/resources/dataframes')
def get_dataframe():
    PARAM='name'
    if PARAM in request.args:
        df_name = request.args[PARAM]
        rows= get_first_n_rows(df_name,10)
        return jsonify(rows)
    else:
        return ERRORS["parameter_missing"]%(PARAM,PARAM)

'''
json= {name:"", methods:[{method:"", params:{"param_name":"param_value"}}]}
'''
@app.route('/api/v1/resources/dataframes/sql_pipeline')
def apply_sql_pipeline():
    if not request.json:
        abort(400)

@app.route('/api/v1/resources/dataframes/preprocessing_pipelines',  methods=['POST'])
def preprocessing_pipelines():
    if not request.json:
        abort(400)
    
    #validate structure
    print(request.json)
    rows,columns=my_spark_helper.preprocessing_pipelines(request.json)


    response= {'rows':rows,'columns':columns}
    return jsonify(response)



@app.route('/api/v1/resources/joiner/correlations')
def joiner_corrrelations():
    
    return my_spark_helper.joiner_corrrelations()




@app.errorhandler(404)
def page_not_found(e):
    return ERRORS["404"], 404

if __name__ == '__main__':
    app.run()


#hello Felipe is not working as I want be carefoul 