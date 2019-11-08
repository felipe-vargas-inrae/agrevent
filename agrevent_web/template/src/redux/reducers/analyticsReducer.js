import {
  FETCH_DATAFRAMES,
  FETCH_DATAFRAMES_FAILURE,
  FETCH_DATAFRAMES_SUCCESS,
  UPDATE_DATAFRAME_LIST,
  UPDATE_PIPELINES_LIST,
  PUSH_ITEM_PIPELINES_LIST,
  DELETE_ITEM_PIPELINES_LIST,
  PUSH_TRANSFORMATION,
  DELETE_TRANSFORMATION
} from '../actions/analyticsActions';


const initialState = {
  //dataframesFetch: {dataframes: [], error:null, loading: false}
  dataframesList:[],
  pipelinesList:[]
};

export default function (state = initialState, action) {
  let error;

  switch (action.type) {
    //get list  method
    // case FETCH_DATAFRAMES:// start fetching sensors and set loading = true
    //   return { ...state, dataframesFetch: { dataframes: [], error: null, loading: true } };
    // case FETCH_DATAFRAMES_SUCCESS :// return list of sensors and make loading = false
    //   return { ...state, dataframesFetch: { dataframes: action.payload, error: null, loading: false } };
    // case FETCH_DATAFRAMES_FAILURE:// return error and make loading = false
    //   error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
    //   return { ...state, dataframesFetch: { dataframes: [], error: error, loading: false } };

    
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
          item.methods.splice(index, 1);
        }
      });
      return {...state, pipelinesList:newList }
    }

    case PUSH_TRANSFORMATION: 
    {
      
      const newList = state.pipelinesList.filter(item => item.name  !== action.payload );
      return {...state, pipelinesList:newList }
    }

    default:
      return state;
  }
}