
import axios from 'axios';


export const CONNECT_SENSOR="CONNECT_SENSOR"

//Post list
export const FETCH_SENSORS = 'FETCH_SENSORS';
export const FETCH_SENSORS_SUCCESS = 'FETCH_SENSORS_SUCCESS';
export const FETCH_SENSORS_FAILURE = 'FETCH_SENSORS_FAILURE';
export const RESET_SENSORS = 'RESET_SENSORS';

//Create new post
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const RESET_NEW_POST = 'RESET_NEW_POST';

//Validate post fields like Title, Categries on the server
export const VALIDATE_POST_FIELDS = 'VALIDATE_POST_FIELDS';
export const VALIDATE_POST_FIELDS_SUCCESS = 'VALIDATE_POST_FIELDS_SUCCESS';
export const VALIDATE_POST_FIELDS_FAILURE = 'VALIDATE_POST_FIELDS_FAILURE';
export const RESET_POST_FIELDS = 'RESET_POST_FIELDS';

//Fetch one sensor
export const FETCH_SENSOR = 'FETCH_SENSOR';
export const FETCH_SENSOR_SUCCESS = 'FETCH_SENSOR_SUCCESS';
export const FETCH_SENSOR_FAILURE = 'FETCH_SENSOR_FAILURE';
export const RESET_ACTIVE_SENSOR = 'RESET_ACTIVE_SENSOR';

//Delete post
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
export const RESET_DELETED_POST = 'RESET_DELETED_POST';
const URL_API="https://jsonplaceholder.typicode.com"

//Show panels 

export const SHOW_CREATE_SENSOR="SHOW_CREATE_SENSOR" 
export const HIDE_CREATE_SENSOR="HIDE_CREATE_SENSOR"

export const SHOW_EDIT_SENSOR="SHOW_EDIT_SENSOR" 
export const HIDE_EDIT_SENSOR="HIDE_EDIT_SENSOR"

export function connectSensor(formSensorInfo) {
  console.log('inside the actions',formSensorInfo);
  return {
    type: CONNECT_SENSOR,
    formSensorInfo
  };
}

export function fetchSensors() {

  console.log("entra al la action");
  const request = axios({
    method: 'get',
    url: URL_API+"/posts",
    headers: []
  });

  return {
    type: FETCH_SENSORS,
    payload: request
  };
}

export function fetchSensorsSuccess(sensors) {
  return {
  type: FETCH_SENSORS_SUCCESS,
  payload: sensors
  };
 }

export function fetchSensorsFailure(error) {
  return {
    type: FETCH_SENSORS_FAILURE,
    payload: error
  };
}



// one sensor 
export function fetchSensor(id) {
  const request = axios.get(`${URL_API}/posts/${id}`);

  return {
    type: FETCH_SENSOR,
    payload: request
  };
}

export function fetchSensorSuccess(activePost) {
  return {
    type: FETCH_SENSOR_SUCCESS,
    payload: activePost
  };
}

export function fetchSensorFailure(error) {
  return {
    type: FETCH_SENSOR_FAILURE,
    payload: error
  };
}

export function resetActiveSensor() {
  return {
    type: RESET_ACTIVE_SENSOR
  }
}

export function showCreateSensor(){
  return {type: SHOW_CREATE_SENSOR}
}

export function hideCreateSensor(){
  return {type: HIDE_CREATE_SENSOR}
}

export function showEditSensor(obj){
  return {type: SHOW_EDIT_SENSOR, sensor: obj}
}

export function hideEditSensor(){
  return {type: HIDE_EDIT_SENSOR}
}