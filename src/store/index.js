import { createStore, combineReducers } from 'redux';
import serviceListReducer from '../reducers/ServiceList';
import serviceFormReducer from '../reducers/ServiceForm';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceForm: serviceFormReducer,
});

const store = createStore(reducer);

export default store;
