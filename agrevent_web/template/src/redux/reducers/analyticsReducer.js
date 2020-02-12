import {
  UPDATE_DATAFRAME_LIST,
  UPDATE_PIPELINES_LIST,
  PUSH_ITEM_PIPELINES_LIST,
  DELETE_ITEM_PIPELINES_LIST,
  PUSH_TRANSFORMATION,
  DELETE_TRANSFORMATION,
  UPDATE_TRANSFORMATIONS_TYPES,
  UPDATE_JOINER_DATASET,
  PUSH_TRANSFORMATION_ML,
  DELETE_TRANSFORMATION_ML,
  UPDATE_MACHINE_LEARNING_RESPONSE
} from '../actions/analyticsActions';

//import DataResponseML from '../../containers/analytics/pipeline_ml/components/db/MachineLearningResponseData'

function deleteTransformationPipeline(pipeline,index){
  const pipe= pipeline
  const methods=[
    ...pipe.methods.slice(0, index),
    ...pipe.methods.slice(index + 1)
  ]
  pipe.methods=methods
  return {...pipe}
}
function pushTransformationPipeline(pipeline,method){
  const pipe=pipeline
  const methods=[
    ...pipe.methods,
    method
  ]
  pipe.methods=methods;
  return {...pipe} 
}

const initialState = {
  //dataframesFetch: {dataframes: [], error:null, loading: false}
  dataframesList:[],
  pipelinesList:[],
  transformationsTypesList:[],
  pipelineML:{name:"PipelineML", methods:[]},
  joinerDataset:[],
  responseMachineLearning:null//DataResponseML

};

export default function (state = initialState, action) {
  let error;

  switch (action.type) {
  
    case UPDATE_DATAFRAME_LIST: 
      {
        
        return {...state, dataframesList:action.payload }
      }

    case UPDATE_PIPELINES_LIST: 
    {
      return {...state, pipelinesList:action.payload }
    }
    case PUSH_ITEM_PIPELINES_LIST: 
    {
      
      return {...state, pipelinesList:[...state.pipelinesList, action.payload] }
    }
    case DELETE_ITEM_PIPELINES_LIST: 
    {
      
      const newList = state.pipelinesList.filter(item => item.name  !== action.payload );
      return {...state, pipelinesList:newList }
    }
    case DELETE_TRANSFORMATION: 
    {
      const newList = state.pipelinesList.map(item => {
        if(item.name==action.payload){
          return deleteTransformationPipeline(item,action.index)
        }
        return {...item}
      });
      return {...state, pipelinesList:newList }
    }

    case PUSH_TRANSFORMATION: 
    {
      
      const newList = state.pipelinesList.map(item => {
        if(item.name===action.payload){
         return pushTransformationPipeline(item,action.method)
        }
        return {...item}
      });
      return {...state, pipelinesList:newList }
    }

    case UPDATE_TRANSFORMATIONS_TYPES:{
      return {...state, transformationsTypesList:action.payload }
    }

    case UPDATE_JOINER_DATASET:{
      return {...state, joinerDataset:action.payload }
    }

    case UPDATE_MACHINE_LEARNING_RESPONSE:{
      return {...state, responseMachineLearning:action.payload }
    }

    case DELETE_TRANSFORMATION_ML:{
      const newPipeline=deleteTransformationPipeline(state.pipelineML,action.index)
      return {...state, pipelineML:newPipeline}
    }

    case PUSH_TRANSFORMATION_ML:{
      debugger
      const newPipeline=pushTransformationPipeline(state.pipelineML,action.method)
      return {...state, pipelineML:newPipeline}
    }

    default:
      return state;
  }
}