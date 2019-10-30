import flask
import json
import logging
import time

from flask import Flask
from flask import request
from flask import jsonify

from pyspark_helper import PysparkHelper

# flask app and logger
#logging.basicConfig(level=logging.INFO)
#logger = logging.getLogger(__name__)
app = flask.Flask(__name__)
#app.config["DEBUG"] = True


ERRORS={"parameter_missing":"No %s field provided. Please specify a %s.",
 "404":"<h1>404</h1><p>The resource could not be found.</p>"
}


print("begin the code state one")

def get_first_n_rows(dataframe_name, n_rows):
    df= get_dataframe_spark(dataframe_name)
    df_take=df.toJSON().map(lambda j: json.loads(j)).take(n_rows)
    return df_take
def init():
    PysparkHelper.init_spark_session()

@app.route('/', methods=['GET'])
def home():
    
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>%d"%(x)

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
json= {[{method:"", params:[{"param_name":"param_value"}]}]}
'''
@app.route('/api/v1/resources/dataframes/sql_pipeline')
def apply_sql_pipeline():
    if not request.json:
        abort(400)


@app.errorhandler(404)
def page_not_found(e):
    return ERRORS["404"], 404

if __name__ == '__main__':
    init()
    app.run()


