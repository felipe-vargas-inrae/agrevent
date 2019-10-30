import {combineReducers, createStore, applyMiddleware} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import promise from 'redux-promise';
import {
  cryptoTableReducer,
  newOrderTableReducer,
  sidebarReducer,
  themeReducer,
  customizerReducer,
  sensorReducer
} from '../redux/reducers/index';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  cryptoTable: cryptoTableReducer,
  newOrder: newOrderTableReducer,
  customizer: customizerReducer,
  sensor:sensorReducer
});



// Middleware you want to use in production:
const enhancer = applyMiddleware(promise);

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer, enhancer);

export default store;
