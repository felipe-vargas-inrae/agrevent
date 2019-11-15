import {
  FETCH_DATAFRAMES,
  FETCH_DATAFRAMES_FAILURE,
  FETCH_DATAFRAMES_SUCCESS,
  UPDATE_DATAFRAME_LIST,
  UPDATE_PIPELINES_LIST,
  PUSH_ITEM_PIPELINES_LIST,
  DELETE_ITEM_PIPELINES_LIST,
  PUSH_TRANSFORMATION,
  DELETE_TRANSFORMATION,
  UPDATE_TRANSFORMATIONS_TYPES
} from '../actions/analyticsActions';


const initialState = {
  //dataframesFetch: {dataframes: [], error:null, loading: false}
  dataframesList:[],
  pipelinesList:[],
  transformationsTypesList:[],

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
          const methods=[
            ...item.methods.slice(0, action.index),
            ...item.methods.slice(action.index + 1)
          ]
          item.methods=methods; 
        }
        return {...item}
      });
      return {...state, pipelinesList:newList }
    }

    case PUSH_TRANSFORMATION: 
    {
      debugger
      const newList = state.pipelinesList.map(item => {
        if(item.name==action.payload){
          const methods=[
            ...item.methods,
            action.method
          ]
          item.methods=methods; 
        }
        return {...item}
      });
      return {...state, pipelinesList:newList }
    }

    case UPDATE_TRANSFORMATIONS_TYPES:{
      return {...state, transformationsTypesList:action.payload }
    }

    default:
      return state;
  }
}