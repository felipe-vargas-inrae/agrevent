
import axios from 'axios';
const URL_API="https://jsonplaceholder.typicode.com"


//Post list
export const FETCH_DATAFRAMES = 'FETCH_DATAFRAMES';
export const FETCH_DATAFRAMES_SUCCESS = 'FETCH_DATAFRAMES_SUCCESS';
export const FETCH_DATAFRAMES_FAILURE = 'FETCH_DATAFRAMES_FAILURE';
export const RESET_DATAFRAMES = 'RESET_DATAFRAMES';

export function fetchDataframes() {
  console.log("entra al la action");
  const request = axios({
    method: 'get',
    url: URL_API+"/posts",
    headers: []
  });
  return {
    type: FETCH_DATAFRAMES,
    payload: request
  };
}
export function fetchDataframesSuccess(dataframes) {
  return {
  type: FETCH_DATAFRAMES_SUCCESS,
  payload: dataframes
  };
 }
export function fetchDataframesFailure(error) {
  return {
    type: FETCH_DATAFRAMES_FAILURE,
    payload: error
  };
}