import {
  CONNECT_SENSOR,
  FETCH_SENSORS,
  FETCH_SENSORS_FAILURE,
  FETCH_SENSORS_SUCCESS,
  RESET_SENSORS,

  FETCH_SENSOR,
  FETCH_SENSOR_FAILURE,
  FETCH_SENSOR_SUCCESS,
  RESET_ACTIVE_SENSOR,

  SHOW_CREATE_SENSOR,
  HIDE_CREATE_SENSOR,

  SHOW_EDIT_SENSOR,
  HIDE_EDIT_SENSOR
} from '../actions/sensorActions';

const initialState = {
  sensorsList: {sensors: [], error:null, loading: false},
  activeSensor:{sensor:null, error:null, loading: false},
  panelsSensor:{create:false,edit:false, sensor:null}
};

export default function (state = initialState, action) {
  let error;

  switch (action.type) {
    case CONNECT_SENSOR:
      return { ...state, formSensorInfo: {} };
    
    //get list  method
    case FETCH_SENSORS:// start fetching sensors and set loading = true
      return { ...state, sensorsList: { sensors: [], error: null, loading: true } };
    case FETCH_SENSORS_SUCCESS :// return list of sensors and make loading = false
      return { ...state, sensorsList: { sensors: action.payload, error: null, loading: false } };
    case FETCH_SENSORS_FAILURE:// return error and make loading = false
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return { ...state, sensorsList: { sensors: [], error: error, loading: false } };
    case RESET_SENSORS:// reset postList to initial state
      return { ...state, sensorsList: { sensors: [], error: null, loading: false } };

    //active sensor
    case FETCH_SENSOR:
      return { ...state, activeSensor:{...state.activeSensor, loading: true}};
    case FETCH_SENSOR_SUCCESS:
      return { ...state, activeSensor: {sensor: action.payload, error:null, loading: false}};
    case FETCH_SENSOR_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, activeSensor: {sensor: null, error:error, loading:false}};
    case RESET_ACTIVE_SENSOR:
      return { ...state, activeSensor: {sensor: null, error:null, loading: false}};


      //panels visibility
    case SHOW_CREATE_SENSOR :
      return {...state , panelsSensor:{create:true,edit:false, sensor:null}}
    case HIDE_CREATE_SENSOR :
      return {...state , panelsSensor:{create:false, edit:false, sensor:null}}

    // EDIT 
    case SHOW_EDIT_SENSOR :
      return {...state , panelsSensor:{create:false,edit:true, sensor:action.sensor}}
    case HIDE_EDIT_SENSOR :
      return {...state , panelsSensor:{create:false, edit:false, sensor:null}}
    default:
      return state;
  }
}