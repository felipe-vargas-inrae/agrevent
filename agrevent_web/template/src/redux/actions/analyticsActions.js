
import axios from 'axios';
const URL_API="https://jsonplaceholder.typicode.com"


//Post list
export const FETCH_DATAFRAMES = 'FETCH_DATAFRAMES';
export const FETCH_DATAFRAMES_SUCCESS = 'FETCH_DATAFRAMES_SUCCESS';
export const FETCH_DATAFRAMES_FAILURE = 'FETCH_DATAFRAMES_FAILURE';
export const RESET_DATAFRAMES = 'RESET_DATAFRAMES';

export const UPDATE_DATAFRAME_LIST='UPDATE_DATAFRAME_LIST'

export const UPDATE_PIPELINES_LIST='UPDATE_PIPELINES_LIST'

export const PUSH_ITEM_PIPELINES_LIST='PUSH_ITEM_PIPELINES_LIST'
export const DELETE_ITEM_PIPELINES_LIST = 'DELETE_ITEM_PIPELINES_LIST'

export const DELETE_TRANSFORMATION = "DELETE_TRANSFORMATION" 
export const PUSH_TRANSFORMATION = "PUSH_TRANSFORMATION"

export const UPDATE_TRANSFORMATIONS_TYPES = "UPDATE_TRANSFORMATIONS_TYPES"

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


export function updateDataframesList(dataframesList){
  console.log("action update df")
  return {
    type: UPDATE_DATAFRAME_LIST,
    payload: dataframesList
  };
}


export function updatePipelinesList(pipelinesList){
  console.log("action update pipe")
  return {
    type: UPDATE_PIPELINES_LIST,
    payload: pipelinesList
  };
}

export function pushItemPipelinesList(pipeline){
  return {
    type: PUSH_ITEM_PIPELINES_LIST,
    payload: pipeline
  };
}

export function deleteItemPipelinesList(pipelineName){
  return {
    type: DELETE_ITEM_PIPELINES_LIST,
    payload: pipelineName
  };
}


export function deleteTransformation(pipelineName, index){
  return {
    type: DELETE_TRANSFORMATION,
    payload: pipelineName,
    index: index
  };
}

export function pushTransformation(pipelineName, method){
  return {
    type: PUSH_TRANSFORMATION,
    payload: pipelineName,
    method: method
  };
}


export function updateTransformationTypes(transformationsTypesList){
  return {
    type: UPDATE_TRANSFORMATIONS_TYPES,
    payload: transformationsTypesList,
  };
}