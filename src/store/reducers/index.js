// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import EmployeeReducer from './EmployeeReducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, EmployeeReducer });

export default reducers;
