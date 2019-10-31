import {
  FETCH_DATAFRAMES,
  FETCH_DATAFRAMES_FAILURE,
  FETCH_DATAFRAMES_SUCCESS
} from '../actions/analyticsActions';

const initialState = {
  dataframesFetch: {dataframes: [], error:null, loading: false}
};

export default function (state = initialState, action) {
  let error;

  console.log("reducer state", state)
  console.log("reducer  action", action)
  switch (action.type) {
    //get list  method
    case FETCH_DATAFRAMES:// start fetching sensors and set loading = true
      return { ...state, dataframesFetch: { dataframes: [], error: null, loading: true } };
    case FETCH_DATAFRAMES_SUCCESS :// return list of sensors and make loading = false
      return { ...state, dataframesFetch: { dataframes: action.payload, error: null, loading: false } };
    case FETCH_DATAFRAMES_FAILURE:// return error and make loading = false
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return { ...state, dataframesFetch: { dataframes: [], error: error, loading: false } };
    default:
      return state;
  }
}