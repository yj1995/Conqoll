
import { combineReducers } from 'redux';
import { overallDataReducer } from './dataReducer'

const rootReducer = combineReducers({
    overallData: overallDataReducer
});

export default rootReducer;