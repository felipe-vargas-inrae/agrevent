from jsonschema import validate, ValidationError

pipeline_schema = {
    "type" : "object",
    "properties" : {
        "name" : {"type" : "string"},
        "methods" : {"type" : "array"}
    },
    "required": ["name","methods"]
}

request_pipeline_joiner_schema= {
    "type":"object",
    "properties":{
        "pipelineList":{"type":"array"},
        "joiner":{"type":"object"}
    },
    "required": ["pipelineList","joiner"]
}


summary_response_schema = {
    "type":"object",
    "properties":{
        "columns" : {"type" : "array"},
        "rows" : {"type" : "array"}
    },
    "required": ["columns","rows"]
}


ml_request_info_schema={
    "type":"object",
    "properties":{
        "ModelML" : {"type" : "string"},
        "target" : {"type" : "string"},
        "listVariables" : {"type" : "array"}
    },
    "required": ["ModelML","target", "listVariables"]
}




class SchemaValidator:
    @classmethod
    def validate_pipeline(cls, pipeline_instance):
        return validate(instance=pipeline_instance, schema=pipeline_schema)

    @classmethod
    def validate_request_pipeline_joiner(cls, request_instance):
        try:
            validation = validate(instance=request_instance, schema=request_pipeline_joiner_schema)
            return True
        except ValidationError as e:
            print(e.message)
            return False

    @classmethod
    def validate_summary_response(cls, summary_instance):

        try:
            validation = validate(instance=summary_instance, schema=summary_response_schema)
            return True
        except ValidationError as e:
            print(e.message)
            return False

    @classmethod
    def validate_ml_request_info_schema(cls, ml_info_instance):

        try:
            validation = validate(instance=ml_info_instance, schema=ml_request_info_schema)
            return True
        except ValidationError as e:
            print(e.message)
            return False

   

