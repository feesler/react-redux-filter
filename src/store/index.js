import { createStore, combineReducers } from 'redux';
import serviceListReducer from '../reducers/ServiceList.js';
import serviceFormReducer from '../reducers/ServiceForm.js';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceForm: serviceFormReducer,
});

const store = createStore(reducer);

export default store;
