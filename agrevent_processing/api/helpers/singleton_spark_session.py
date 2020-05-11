
import findspark
findspark.init()

from pyspark.sql import SparkSession
import pyspark

MONGO_URI = "mongodb://localhost:27017/iot_db"
SPARK_APP_NAME = "agreventPrototypeV1"
SPARK_CORES = "local[*]"
MONGO_SPARK_CONNECTOR = "org.mongodb.spark:mongo-spark-connector_2.11:2.3.2"
MONGO_COLLECTION_BASE = MONGO_URI+".phis_experiments"


class SingletonSparkSession:
    __instance = None
    @staticmethod
    def getInstance():
        """ Static access method. """
        if SingletonSparkSession.__instance == None:
            SingletonSparkSession()
        return SingletonSparkSession.__instance

    def __init__(self):
        """ Virtually private constructor. """
        if SingletonSparkSession.__instance != None:
            raise Exception("This class is a singleton!")
        else:
            SingletonSparkSession.__instance = self
            self.__init_spark_session() # only run once in the life cycle of the program


    def __init_spark_session(self):
        
        self.my_spark_session = SparkSession \
        .builder \
        .appName(SPARK_APP_NAME) \
        .master(SPARK_CORES)\
        .config("spark.jars.packages", MONGO_SPARK_CONNECTOR)\
        .config("spark.mongodb.input.uri", MONGO_COLLECTION_BASE ) \
        .getOrCreate()

    def get_spark_session(self):
        return self.my_spark_session
    
    def stop_spark_session(self):
        self.my_spark_session.stop()
    
    def restart_spark_session(self):
        self.my_spark_session.stop()
        self.init_spark_session()
